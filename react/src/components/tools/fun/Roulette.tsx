import { useState, useRef, useEffect } from 'react';
import { Play, Plus, Trash2, Settings, RotateCcw, Save, Upload, Volume2, VolumeX, Trophy, Star } from 'lucide-react';
import toast from 'react-hot-toast';

interface RouletteItem {
  id: string;
  text: string;
  color: string;
}

interface SpinHistory {
  result: string;
  timestamp: Date;
}

const DEFAULT_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
  '#F8B500', '#FF8A80', '#80CBC4', '#A5D6A7', '#FFCC80'
];

const DEFAULT_ITEMS: RouletteItem[] = [
  { id: '1', text: 'Choose Lunch Menu', color: '#FF6B6B' },
  { id: '2', text: 'Have Coffee', color: '#4ECDC4' },
  { id: '3', text: 'Take a Walk', color: '#45B7D1' },
  { id: '4', text: 'Read a Book', color: '#96CEB4' },
  { id: '5', text: 'Listen to Music', color: '#FFEAA7' },
  { id: '6', text: 'Call a Friend', color: '#DDA0DD' }
];

const PRESET_CATEGORIES = {
  food: {
    name: '🍽️ Food Choice',
    items: ['Pizza', 'Chicken', 'Sushi', 'Pasta', 'Burger', 'Chinese', 'Korean', 'Fast Food']
  },
  activity: {
    name: '🎯 Activity Choice',
    items: ['Watch Movie', 'Exercise', 'Reading', 'Gaming', 'Walking', 'Cooking', 'Cleaning', 'Study']
  },
  decision: {
    name: '🤔 Decision Making',
    items: ['Do it Now', 'Do it Later', 'Find Another Way', 'Ask Expert', 'Think More', 'Give Up']
  },
  team: {
    name: '👥 Team Activity',
    items: ['Brainstorming', 'Meeting', 'Team Building', 'Project Review', 'Code Review', 'Lunch Together']
  }
};

export default function Roulette() {
  const [items, setItems] = useState<RouletteItem[]>(DEFAULT_ITEMS);
  const [newItemText, setNewItemText] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string>('');
  const [showSettings, setShowSettings] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [spinHistory, setSpinHistory] = useState<SpinHistory[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Sound effects generation
  const playSound = (frequency: number, duration: number, type: 'spin' | 'win' = 'spin') => {
    if (!soundEnabled) return;
    
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const ctx = audioContextRef.current;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      if (type === 'spin') {
        oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(frequency * 0.5, ctx.currentTime + duration);
        gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      } else {
        // Victory sound
        oscillator.frequency.setValueAtTime(523, ctx.currentTime); // C5
        oscillator.frequency.setValueAtTime(659, ctx.currentTime + 0.1); // E5
        oscillator.frequency.setValueAtTime(784, ctx.currentTime + 0.2); // G5
        gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      }
      
      oscillator.type = 'sine';
      oscillator.start();
      oscillator.stop(ctx.currentTime + duration);
    } catch (error) {
      console.log('Audio not supported');
    }
  };

  // Draw roulette
  const drawRoulette = () => {
    const canvas = canvasRef.current;
    if (!canvas || items.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;
    const anglePerItem = (2 * Math.PI) / items.length;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Outer shadow
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    // Draw roulette sections
    items.forEach((item, index) => {
      const startAngle = index * anglePerItem - Math.PI / 2 + (rotation * Math.PI) / 180;
      const endAngle = (index + 1) * anglePerItem - Math.PI / 2 + (rotation * Math.PI) / 180;

      // Draw section
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      
      // Gradient effect
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      gradient.addColorStop(0, item.color);
      gradient.addColorStop(1, item.color + '80');
      ctx.fillStyle = gradient;
      ctx.fill();
      
      ctx.shadowColor = 'transparent';
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Draw text
      const textAngle = startAngle + anglePerItem / 2;
      const textRadius = radius * 0.7;
      const textX = centerX + Math.cos(textAngle) * textRadius;
      const textY = centerY + Math.sin(textAngle) * textRadius;

      ctx.save();
      ctx.translate(textX, textY);
      ctx.rotate(textAngle + Math.PI / 2);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 3;
      
      // Line wrapping based on text length
      const maxWidth = 80;
      const words = item.text.split(' ');
      let line = '';
      let lineHeight = 16;
      let y = 0;

      if (ctx.measureText(item.text).width <= maxWidth) {
        ctx.strokeText(item.text, 0, 0);
        ctx.fillText(item.text, 0, 0);
      } else {
        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + ' ';
          const metrics = ctx.measureText(testLine);
          const testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            ctx.strokeText(line, 0, y);
            ctx.fillText(line, 0, y);
            line = words[n] + ' ';
            y += lineHeight;
          } else {
            line = testLine;
          }
        }
        ctx.strokeText(line, 0, y);
        ctx.fillText(line, 0, y);
      }
      ctx.restore();
    });

    // Draw center circle
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 5;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 25, 0, 2 * Math.PI);
    const centerGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 25);
    centerGradient.addColorStop(0, '#fff');
    centerGradient.addColorStop(1, '#ddd');
    ctx.fillStyle = centerGradient;
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw pointer
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 3;
    ctx.beginPath();
    ctx.moveTo(centerX, 15);
    ctx.lineTo(centerX - 20, 50);
    ctx.lineTo(centerX + 20, 50);
    ctx.closePath();
    const pointerGradient = ctx.createLinearGradient(centerX - 20, 15, centerX + 20, 50);
    pointerGradient.addColorStop(0, '#FF4757');
    pointerGradient.addColorStop(1, '#FF3742');
    ctx.fillStyle = pointerGradient;
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  // Spin roulette
  const spinRoulette = () => {
    if (items.length === 0) {
      toast.error('Please add items!');
      return;
    }

    if (isSpinning) return;

    setIsSpinning(true);
    setResult('');
    
    // Spin sound
    playSound(400, 0.1, 'spin');

    const spinDuration = 3000 + Math.random() * 2000; // 3-5 seconds
    const totalRotation = 360 * (5 + Math.random() * 5) + Math.random() * 360; // 5-10 rotations + random

    let startTime: number;
    let lastSoundTime = 0;
    const startRotation = rotation;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / spinDuration, 1);

      // Easing function (deceleration)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentRotation = startRotation + totalRotation * easeOut;
      
      // Speed-based sound
      if (soundEnabled && currentTime - lastSoundTime > 100 - (progress * 90)) {
        const frequency = 200 + (1 - progress) * 200;
        playSound(frequency, 0.05, 'spin');
        lastSoundTime = currentTime;
      }

      setRotation(currentRotation % 360);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Calculate result
        const normalizedRotation = (360 - (currentRotation % 360)) % 360;
        const anglePerItem = 360 / items.length;
        const selectedIndex = Math.floor(normalizedRotation / anglePerItem);
        const selectedItem = items[selectedIndex];

        setResult(selectedItem.text);
        setIsSpinning(false);
        
        // Victory sound
        setTimeout(() => playSound(523, 0.8, 'win'), 100);
        
        // Add to history
        setSpinHistory(prev => [{
          result: selectedItem.text,
          timestamp: new Date()
        }, ...prev.slice(0, 9)]); // Save only last 10
        
        toast.success(`🎉 Result: ${selectedItem.text}`, { 
          duration: 4000,
          icon: '🎯'
        });
      }
    };

    requestAnimationFrame(animate);
  };

  // Apply preset
  const applyPreset = (category: keyof typeof PRESET_CATEGORIES) => {
    const preset = PRESET_CATEGORIES[category];
    const newItems: RouletteItem[] = preset.items.map((item, index) => ({
      id: Date.now().toString() + index,
      text: item,
      color: DEFAULT_COLORS[index % DEFAULT_COLORS.length]
    }));
    setItems(newItems);
    setSelectedPreset('');
    toast.success(`${preset.name} preset applied!`);
  };

  // Add item
  const addItem = () => {
    if (!newItemText.trim()) {
      toast.error('Please enter item content!');
      return;
    }

    const newItem: RouletteItem = {
      id: Date.now().toString(),
      text: newItemText.trim(),
      color: DEFAULT_COLORS[items.length % DEFAULT_COLORS.length]
    };

    setItems([...items, newItem]);
    setNewItemText('');
    toast.success('Item added successfully!');
  };

  // Remove item
  const removeItem = (id: string) => {
    if (items.length <= 2) {
      toast.error('At least 2 items are required!');
      return;
    }
    setItems(items.filter(item => item.id !== id));
    toast.success('Item removed successfully!');
  };

  // Update item
  const updateItem = (id: string, newText: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, text: newText } : item
    ));
  };

  // Update item color
  const updateItemColor = (id: string, newColor: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, color: newColor } : item
    ));
  };

  // Reset
  const resetRoulette = () => {
    setItems(DEFAULT_ITEMS);
    setRotation(0);
    setResult('');
    setSpinHistory([]);
    toast.success('Roulette has been reset!');
  };

  // Save
  const saveRoulette = () => {
    const data = JSON.stringify({ items, history: spinHistory }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `roulette-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Roulette data saved successfully!');
  };

  // Load
  const loadRoulette = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.items && Array.isArray(data.items) && data.items.length > 0) {
          setItems(data.items);
          if (data.history) {
            setSpinHistory(data.history.map((h: any) => ({
              ...h,
              timestamp: new Date(h.timestamp)
            })));
          }
          toast.success('Roulette data loaded successfully!');
        } else {
          throw new Error('Invalid file format.');
        }
      } catch (error) {
        toast.error('Failed to load file.');
      }
    };
    reader.readAsText(file);
  };

  useEffect(() => {
    drawRoulette();
  }, [items, rotation]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-3">
            🎯 Random Roulette
            <span className="text-sm px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full">
              Enhanced
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            When decisions are tough, leave it to fate!
          </p>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Roulette Section */}
          <div className="xl:col-span-2 flex flex-col items-center">
            <div className="relative mb-6">
              <canvas
                ref={canvasRef}
                width="450"
                height="450"
                className="border-4 border-gray-200 dark:border-gray-600 rounded-full shadow-2xl"
              />
              {isSpinning && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-bold text-lg animate-pulse">
                    Spinning...
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-4 mb-6 justify-center">
              <button
                onClick={spinRoulette}
                disabled={isSpinning || items.length === 0}
                className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all ${
                  isSpinning || items.length === 0
                    ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95'
                }`}
              >
                <Play size={24} />
                {isSpinning ? 'Spinning...' : '🎲 Spin the Roulette!'}
              </button>
              
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`flex items-center gap-2 px-4 py-4 rounded-xl transition-all ${
                  soundEnabled 
                    ? 'bg-green-500 hover:bg-green-600 text-white' 
                    : 'bg-gray-500 hover:bg-gray-600 text-white'
                }`}
              >
                {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
              </button>
              
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="flex items-center gap-2 px-4 py-4 bg-gray-500 hover:bg-gray-600 text-white rounded-xl transition-all"
              >
                <Settings size={20} />
              </button>
              
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="flex items-center gap-2 px-4 py-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl transition-all"
              >
                <Trophy size={20} />
              </button>
            </div>

            {result && (
              <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white p-6 rounded-xl text-center font-bold text-xl shadow-lg animate-bounce mb-4">
                🎉 Result: <span className="text-2xl">{result}</span> 🎉
              </div>
            )}

            {/* History */}
            {showHistory && spinHistory.length > 0 && (
              <div className="w-full max-w-md bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Trophy size={20} />
                  Recent Results
                </h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {spinHistory.map((spin, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span className="text-gray-900 dark:text-white font-medium">
                        {spin.result}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {spin.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Settings Section */}
          <div className="space-y-6">
            {/* Preset Selection */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                🎨 Quick Settings
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-2">
                {Object.entries(PRESET_CATEGORIES).map(([key, preset]) => (
                  <button
                    key={key}
                    onClick={() => applyPreset(key as keyof typeof PRESET_CATEGORIES)}
                    className="text-left p-3 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors border border-gray-200 dark:border-gray-600"
                  >
                    <div className="font-medium text-gray-900 dark:text-white">
                      {preset.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {preset.items.slice(0, 3).join(', ')}...
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Add Item */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                ➕ Add Item
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newItemText}
                  onChange={(e) => setNewItemText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addItem()}
                  placeholder="Enter a new item..."
                  className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={addItem}
                  className="flex items-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            {/* Management Buttons */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                ⚙️ Management
              </h3>
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={saveRoulette}
                  className="flex items-center justify-center gap-1 px-3 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors flex-1 sm:flex-initial"
                >
                  <Save size={16} />
                  Save
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center justify-center gap-1 px-3 py-2 text-sm bg-purple-500 hover:bg-purple-600 text-white rounded transition-colors flex-1 sm:flex-initial"
                >
                  <Upload size={16} />
                  Load
                </button>
                <button
                  onClick={resetRoulette}
                  className="flex items-center justify-center gap-1 px-3 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded transition-colors flex-1 sm:flex-initial"
                >
                  <RotateCcw size={16} />
                  Reset
                </button>
              </div>
            </div>

            {/* Item List */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                📝 Item List ({items.length} items)
              </h3>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {items.map((item, index) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-6">
                      {index + 1}
                    </span>
                    <div
                      className="w-6 h-6 rounded-full border-2 border-white shadow-sm flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    {showSettings ? (
                      <div className="flex-1 flex gap-2">
                        <input
                          type="text"
                          value={item.text}
                          onChange={(e) => updateItem(item.id, e.target.value)}
                          className="flex-1 p-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                        <input
                          type="color"
                          value={item.color}
                          onChange={(e) => updateItemColor(item.id, e.target.value)}
                          className="w-10 h-8 border border-gray-300 dark:border-gray-600 rounded cursor-pointer"
                        />
                      </div>
                    ) : (
                      <span className="flex-1 text-gray-900 dark:text-white font-medium">
                        {item.text}
                      </span>
                    )}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                      disabled={items.length <= 2}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={loadRoulette}
          className="hidden"
        />
      </div>
    </div>
  );
}
