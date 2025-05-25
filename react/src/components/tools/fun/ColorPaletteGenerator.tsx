import { useState, useEffect } from 'react';
import { Shuffle, Copy, Heart, Download, Palette, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

interface ColorPalette {
  id: string;
  name: string;
  colors: string[];
  liked: boolean;
}

interface ColorInfo {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
}

const PALETTE_THEMES = {
  pastel: 'Pastel',
  vibrant: 'Vibrant',
  earthy: 'Earthy',
  monochrome: 'Monochrome',
  sunset: 'Sunset',
  ocean: 'Ocean',
  forest: 'Forest',
  candy: 'Candy'
};

export default function ColorPaletteGenerator() {
  const [currentPalette, setCurrentPalette] = useState<ColorPalette>({
    id: '1',
    name: 'Default Palette',
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'],
    liked: false
  });
  const [savedPalettes, setSavedPalettes] = useState<ColorPalette[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<keyof typeof PALETTE_THEMES>('vibrant');
  const [colorCount, setColorCount] = useState(5);
  const [showColorDetails, setShowColorDetails] = useState(false);

  // Color conversion functions
  const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const getColorInfo = (hex: string): ColorInfo => {
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    return { hex, rgb, hsl };
  };

  // Generate colors by theme
  const generateColorsByTheme = (theme: keyof typeof PALETTE_THEMES, count: number): string[] => {
    const colors: string[] = [];

    switch (theme) {
      case 'pastel':
        for (let i = 0; i < count; i++) {
          const hue = (360 / count) * i + Math.random() * 30;
          const saturation = 30 + Math.random() * 20;
          const lightness = 75 + Math.random() * 15;
          colors.push(hslToHex(hue, saturation, lightness));
        }
        break;
      
      case 'vibrant':
        for (let i = 0; i < count; i++) {
          const hue = (360 / count) * i + Math.random() * 30;
          const saturation = 70 + Math.random() * 30;
          const lightness = 50 + Math.random() * 20;
          colors.push(hslToHex(hue, saturation, lightness));
        }
        break;
      
      case 'earthy':
        const earthyHues = [30, 45, 20, 60, 15]; // Brown, beige, olive tones
        for (let i = 0; i < count; i++) {
          const hue = earthyHues[i % earthyHues.length] + Math.random() * 20;
          const saturation = 40 + Math.random() * 30;
          const lightness = 35 + Math.random() * 25;
          colors.push(hslToHex(hue, saturation, lightness));
        }
        break;
      
      case 'monochrome':
        const baseHue = Math.random() * 360;
        for (let i = 0; i < count; i++) {
          const saturation = 10 + Math.random() * 20;
          const lightness = 20 + (70 / count) * i + Math.random() * 10;
          colors.push(hslToHex(baseHue, saturation, lightness));
        }
        break;
      
      case 'sunset':
        const sunsetHues = [15, 30, 45, 330, 300]; // Orange, red, pink tones
        for (let i = 0; i < count; i++) {
          const hue = sunsetHues[i % sunsetHues.length] + Math.random() * 15;
          const saturation = 60 + Math.random() * 30;
          const lightness = 50 + Math.random() * 20;
          colors.push(hslToHex(hue, saturation, lightness));
        }
        break;
      
      case 'ocean':
        const oceanHues = [190, 210, 230, 180, 200]; // Blue, teal tones
        for (let i = 0; i < count; i++) {
          const hue = oceanHues[i % oceanHues.length] + Math.random() * 20;
          const saturation = 50 + Math.random() * 30;
          const lightness = 40 + Math.random() * 30;
          colors.push(hslToHex(hue, saturation, lightness));
        }
        break;
      
      case 'forest':
        const forestHues = [90, 120, 150, 75, 105]; // Green tones
        for (let i = 0; i < count; i++) {
          const hue = forestHues[i % forestHues.length] + Math.random() * 15;
          const saturation = 40 + Math.random() * 30;
          const lightness = 30 + Math.random() * 25;
          colors.push(hslToHex(hue, saturation, lightness));
        }
        break;
      
      case 'candy':
        for (let i = 0; i < count; i++) {
          const hue = Math.random() * 360;
          const saturation = 80 + Math.random() * 20;
          const lightness = 65 + Math.random() * 20;
          colors.push(hslToHex(hue, saturation, lightness));
        }
        break;
      
      default:
        for (let i = 0; i < count; i++) {
          colors.push('#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
        }
    }

    return colors;
  };

  const hslToHex = (h: number, s: number, l: number): string => {
    h = h % 360;
    s = Math.max(0, Math.min(100, s)) / 100;
    l = Math.max(0, Math.min(100, l)) / 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;

    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
    }

    const toHex = (n: number) => {
      const hex = Math.round((n + m) * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  // Generate new palette
  const generateNewPalette = () => {
    const colors = generateColorsByTheme(selectedTheme, colorCount);
    const newPalette: ColorPalette = {
      id: Date.now().toString(),
      name: `${PALETTE_THEMES[selectedTheme]} Palette`,
      colors,
      liked: false
    };
    setCurrentPalette(newPalette);
    toast.success('New palette generated!');
  };

  // Copy color
  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color).then(() => {
      toast.success(`${color} copied!`);
    });
  };

  // Save palette
  const savePalette = () => {
    const exists = savedPalettes.find(p => p.id === currentPalette.id);
    if (!exists) {
      setSavedPalettes(prev => [...prev, { ...currentPalette, liked: true }]);
      setCurrentPalette(prev => ({ ...prev, liked: true }));
      toast.success('Palette saved!');
    } else {
      toast.error('Palette already saved!');
    }
  };

  // Delete palette
  const deletePalette = (id: string) => {
    setSavedPalettes(prev => prev.filter(p => p.id !== id));
    if (currentPalette.id === id) {
      setCurrentPalette(prev => ({ ...prev, liked: false }));
    }
    toast.success('Palette deleted!');
  };

  // Export CSS
  const exportCSS = () => {
    const css = `:root {
${currentPalette.colors.map((color, index) => 
      `  --color-${index + 1}: ${color};`
    ).join('\n')}
}`;
    
    const blob = new Blob([css], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentPalette.name.replace(/\s+/g, '-')}.css`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('CSS file downloaded!');
  };

  // Export JSON
  const exportJSON = () => {
    const data = {
      name: currentPalette.name,
      colors: currentPalette.colors.map(color => getColorInfo(color))
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentPalette.name.replace(/\s+/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('JSON file downloaded!');
  };

  // Generate initial palette
  useEffect(() => {
    generateNewPalette();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-3">
            🎨 Color Palette Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create beautiful color combinations for your designs!
          </p>
        </div>

        {/* Current Palette */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {currentPalette.name}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={savePalette}
                disabled={currentPalette.liked}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  currentPalette.liked
                    ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300'
                }`}
              >
                <Heart size={16} fill={currentPalette.liked ? 'currentColor' : 'none'} />
                {currentPalette.liked ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
            {currentPalette.colors.map((color, index) => (
              <div key={index} className="group">
                <div
                  className="w-full h-24 rounded-lg shadow-md cursor-pointer transform transition-all hover:scale-105 hover:shadow-lg"
                  style={{ backgroundColor: color }}
                  onClick={() => copyColor(color)}
                />
                <div className="mt-2 text-center">
                  <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
                    {color.toUpperCase()}
                  </span>
                  <button
                    onClick={() => copyColor(color)}
                    className="ml-2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Copy size={12} />
                  </button>
                </div>
                {showColorDetails && (
                  <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    <div>RGB({getColorInfo(color).rgb.r}, {getColorInfo(color).rgb.g}, {getColorInfo(color).rgb.b})</div>
                    <div>HSL({getColorInfo(color).hsl.h}°, {getColorInfo(color).hsl.s}%, {getColorInfo(color).hsl.l}%)</div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={generateNewPalette}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all transform hover:scale-105"
            >
              <Shuffle size={20} />
              Generate New Palette
            </button>
            
            <button
              onClick={() => setShowColorDetails(!showColorDetails)}
              className="flex items-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all"
            >
              <Palette size={20} />
              {showColorDetails ? 'Simple View' : 'Detailed View'}
            </button>
            
            <button
              onClick={exportCSS}
              className="flex items-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all"
            >
              <Download size={20} />
              Download CSS
            </button>
            
            <button
              onClick={exportJSON}
              className="flex items-center gap-2 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all"
            >
              <Download size={20} />
              Download JSON
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Settings */}
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                🎯 Generation Settings
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Theme Selection
                  </label>
                  <select
                    value={selectedTheme}
                    onChange={(e) => setSelectedTheme(e.target.value as keyof typeof PALETTE_THEMES)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  >
                    {Object.entries(PALETTE_THEMES).map(([key, name]) => (
                      <option key={key} value={key}>{name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Color Count: {colorCount} colors
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="8"
                    value={colorCount}
                    onChange={(e) => setColorCount(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>3</span>
                    <span>8</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                💡 Usage Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Click on colors to copy HEX codes</li>
                <li>• Save your favorite palettes for later use</li>
                <li>• Export as CSS or JSON format</li>
                <li>• Generate different moods with various themes</li>
              </ul>
            </div>
          </div>

          {/* Saved Palettes */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              💾 Saved Palettes ({savedPalettes.length} palettes)
            </h3>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {savedPalettes.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  No saved palettes yet.
                </p>
              ) : (
                savedPalettes.map((palette) => (
                  <div key={palette.id} className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900 dark:text-white text-sm">
                        {palette.name}
                      </span>
                      <div className="flex gap-1">
                        <button
                          onClick={() => setCurrentPalette(palette)}
                          className="p-1 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
                        >
                          <RefreshCw size={14} />
                        </button>
                        <button
                          onClick={() => deletePalette(palette.id)}
                          className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {palette.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-6 h-6 rounded cursor-pointer hover:scale-110 transition-transform"
                          style={{ backgroundColor: color }}
                          onClick={() => copyColor(color)}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}