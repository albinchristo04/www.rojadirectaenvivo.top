import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function fetchMatchData() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/albinchristo04/ptv/refs/heads/main/futbollibre.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Process and normalize data
    const processedData = data.map(match => ({
      id: match.id || generateId(match),
      name: match.name || match.title || '',
      homeTeam: extractTeam(match.name, 0),
      awayTeam: extractTeam(match.name, 1),
      league: match.league || match.competition || 'Amistoso',
      startTime: match.startTime || match.time || '',
      localTime: convertToLocalTime(match.startTime || match.time),
      channels: match.channels || [match.iframe || match.embed].filter(Boolean),
      decodedIframeUrl: match.decoded_iframe_url || match.iframe || '',
      status: match.status || 'scheduled'
    }));
    
    // Save to data directory
    const outputPath = join(__dirname, '..', 'data', 'matches.json');
    writeFileSync(outputPath, JSON.stringify(processedData, null, 2));
    
    console.log(`✓ Successfully fetched ${processedData.length} matches`);
    return processedData;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    process.exit(1);
  }
}

function generateId(match) {
  const str = match.name || match.title || Date.now().toString();
  return Buffer.from(str).toString('base64').substring(0, 12);
}

function extractTeam(name, index) {
  if (!name) return '';
  const parts = name.split(/-|vs|VS|\|/);
  return parts[index]?.trim() || name;
}

function convertToLocalTime(isoString) {
  if (!isoString) return '';
  try {
    const date = new Date(isoString);
    return date.toLocaleString('es-ES', {
      timeZone: 'America/Mexico_City',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return isoString;
  }
}

fetchMatchData();
