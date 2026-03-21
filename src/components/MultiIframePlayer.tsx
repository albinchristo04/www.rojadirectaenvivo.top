import { useState } from 'react';

interface Props {
  channels: string[];
}

export default function MultiIframePlayer({ channels }: Props) {
  const [currentChannel, setCurrentChannel] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  if (!channels || channels.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-8 text-center">
        <p className="text-gray-400">No hay señal disponible</p>
      </div>
    );
  }

  const handleChannelChange = (index: number) => {
    setIsLoading(true);
    setCurrentChannel(index);
  };

  return (
    <div className="w-full">
      {/* Channel Selector */}
      {channels.length > 1 && (
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {channels.map((_, index) => (
            <button
              key={index}
              onClick={() => handleChannelChange(index)}
              className={`px-4 py-2 rounded font-semibold transition-all duration-300 whitespace-nowrap ${
                currentChannel === index
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Canal {index + 1}
            </button>
          ))}
        </div>
      )}

      {/* Iframe Container */}
      <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden border border-purple-500/30">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 z-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          </div>
        )}
        
        <iframe
          key={currentChannel}
          src={channels[currentChannel]}
          className="w-full h-full"
          frameBorder="0"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          onLoad={() => setIsLoading(false)}
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="mt-4 text-sm text-gray-400">
        {channels.length > 1 && (
          <p>✓ {channels.length} canales disponibles - Cambia entre ellos si uno falla</p>
        )}
      </div>
    </div>
  );
}
