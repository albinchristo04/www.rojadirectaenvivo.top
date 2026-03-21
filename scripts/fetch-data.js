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
    
    const contentType = response.headers.get('content-type');
    const rawData = await response.text();
    
    // Check if we got HTML instead of JSON
    if (contentType && contentType.includes('text/html')) {
      throw new Error('Received HTML instead of JSON. GitHub may be blocking the request.');
    }
    
    // Try to parse as JSON
    let data;
    try {
      data = JSON.parse(rawData);
    } catch (parseError) {
      console.error('Raw response:', rawData.substring(0, 200));
      throw new Error('Failed to parse JSON: ' + parseError.message);
    }
    
    // Ensure data is an array or extract array from object
    let matchesArray;
    if (Array.isArray(data)) {
      matchesArray = data;
    } else if (data.data && Array.isArray(data.data)) {
      // New structure: { metadata: {...}, data: [...] }
      matchesArray = data.data;
      console.log(`✓ Detected new API structure, using data.array (${matchesArray.length} matches)`);
    } else {
      throw new Error(`Expected array but got ${typeof data}. Data keys: ${JSON.stringify(Object.keys(data))}`);
    }
    
    // Process and normalize data
    const processedData = matchesArray.map(match => ({
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
