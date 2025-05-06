import React, { useState } from 'react';
import Carousel from './components/Carousel/Carousel';
import { carouselImages } from './data/images';
import { Settings } from 'lucide-react';

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [showIndicators, setShowIndicators] = useState(true);
  const [interval, setInterval] = useState(5000);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col items-center py-12 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Elegant Image Carousel</h1>
        <p className="text-gray-300 max-w-2xl">
          A beautiful, responsive carousel with smooth animations and multiple features
        </p>
      </header>

      <div className="w-full max-w-4xl mb-8">
        <Carousel 
          images={carouselImages} 
          autoPlay={autoPlay} 
          interval={interval} 
          showControls={showControls} 
          showIndicators={showIndicators} 
        />
      </div>

      <div className="w-full max-w-4xl">
        <button 
          onClick={() => setShowSettings(!showSettings)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors mb-4"
        >
          <Settings size={18} />
          {showSettings ? 'Hide Settings' : 'Show Settings'}
        </button>

        {showSettings && (
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Carousel Settings</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label htmlFor="autoPlay" className="font-medium">Auto Play</label>
                  <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                    <input
                      type="checkbox"
                      id="autoPlay"
                      className="absolute w-6 h-6 opacity-0 z-10 cursor-pointer"
                      checked={autoPlay}
                      onChange={() => setAutoPlay(!autoPlay)}
                    />
                    <div className={`w-full h-full rounded-full transition-colors duration-200 ease-in-out ${autoPlay ? 'bg-blue-500' : 'bg-gray-600'}`}></div>
                    <div className={`absolute w-6 h-6 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out ${autoPlay ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <label htmlFor="showControls" className="font-medium">Show Controls</label>
                  <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                    <input
                      type="checkbox"
                      id="showControls"
                      className="absolute w-6 h-6 opacity-0 z-10 cursor-pointer"
                      checked={showControls}
                      onChange={() => setShowControls(!showControls)}
                    />
                    <div className={`w-full h-full rounded-full transition-colors duration-200 ease-in-out ${showControls ? 'bg-blue-500' : 'bg-gray-600'}`}></div>
                    <div className={`absolute w-6 h-6 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out ${showControls ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label htmlFor="showIndicators" className="font-medium">Show Indicators</label>
                  <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                    <input
                      type="checkbox"
                      id="showIndicators"
                      className="absolute w-6 h-6 opacity-0 z-10 cursor-pointer"
                      checked={showIndicators}
                      onChange={() => setShowIndicators(!showIndicators)}
                    />
                    <div className={`w-full h-full rounded-full transition-colors duration-200 ease-in-out ${showIndicators ? 'bg-blue-500' : 'bg-gray-600'}`}></div>
                    <div className={`absolute w-6 h-6 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out ${showIndicators ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="interval" className="font-medium block mb-2">
                    Interval (ms): {interval}
                  </label>
                  <input
                    type="range"
                    id="interval"
                    min="1000"
                    max="10000"
                    step="500"
                    value={interval}
                    onChange={(e) => setInterval(Number(e.target.value))}
                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>1s</span>
                    <span>5s</span>
                    <span>10s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;