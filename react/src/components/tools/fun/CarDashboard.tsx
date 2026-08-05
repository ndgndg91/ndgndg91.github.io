import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Trash2, 
  Columns2, 
  Gauge, 
  Zap, 
  DollarSign, 
  X, 
  Sparkles, 
  Car as CarIcon, 
  Info,
  Droplet,
  RotateCcw,
  ExternalLink
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid
} from 'recharts';
import type { Car } from '../../../types/car';
import { getStoredCars, saveCars, INITIAL_CARS } from '../../../data/mockCars';
import './CarDashboard.css';

export default function CarDashboard() {
  const [cars, setCars] = useState<Car[]>([]);
  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  
  // Real-time Energy Prices
  const [gasPrice, setGasPrice] = useState(1650);
  const [electricityPrice, setElectricityPrice] = useState(340);

  // Helper for fuel cost per km
  const calculateCostPerKm = (type: Car['type'], efficiency: number) => {
    if (efficiency <= 0) return 0;
    if (type === 'EV') {
      return Math.round(electricityPrice / efficiency);
    }
    return Math.round(gasPrice / efficiency);
  };
  
  // Image Customization State
  const [editingCarId, setEditingCarId] = useState<string | null>(null);
  const [tempImageUrl, setTempImageUrl] = useState('');

  const handleStartEditImage = (id: string, currentUrl: string) => {
    setEditingCarId(id);
    setTempImageUrl(currentUrl || '');
  };

  const handleSaveImage = (id: string) => {
    const updated = cars.map(car => {
      if (car.id === id) {
        return { ...car, imageUrl: tempImageUrl };
      }
      return car;
    });
    setCars(updated);
    saveCars(updated);
    setEditingCarId(null);
  };

  // Compare Bucket State
  const [compareIds, setCompareIds] = useState<string[]>([]);
  
  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  
  // New Car Form State
  const [newCar, setNewCar] = useState<Omit<Car, 'id' | 'isCustom'>>({
    brand: '',
    model: '',
    type: 'EV',
    priceMin: 0,
    priceMax: 0,
    power: 0,
    torque: 0,
    efficiency: 0,
    range: 0,
    zeroToHundred: 0,
    size: 'Mid-size',
    seats: 5,
    features: ['']
  });

  useEffect(() => {
    setCars(getStoredCars());
  }, []);

  // Unique brands list for filter
  const brands = ['All', ...Array.from(new Set(cars.map(c => c.brand)))];

  // Handle toggle compare
  const toggleCompare = (id: string) => {
    if (compareIds.includes(id)) {
      setCompareIds(compareIds.filter(item => item !== id));
    } else {
      if (compareIds.length >= 3) {
        alert('You can compare up to 3 vehicles at once.');
        return;
      }
      setCompareIds([...compareIds, id]);
    }
  };

  // Reset comparison bucket
  const resetCompare = () => {
    setCompareIds([]);
  };

  // Add customized vehicle
  const handleAddCar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCar.brand || !newCar.model) {
      alert('Brand and model name are required.');
      return;
    }

    const createdCar: Car = {
      ...newCar,
      id: `custom-${Date.now()}`,
      isCustom: true,
      // Filter out empty features
      features: newCar.features.filter(f => f.trim() !== '')
    };

    const updated = [...cars, createdCar];
    setCars(updated);
    saveCars(updated);
    
    // Reset Form
    setNewCar({
      brand: '',
      model: '',
      type: 'EV',
      priceMin: 0,
      priceMax: 0,
      power: 0,
      torque: 0,
      efficiency: 0,
      range: 0,
      zeroToHundred: 0,
      size: 'Mid-size',
      seats: 5,
      features: ['']
    });
    setIsAddModalOpen(false);
  };

  // Delete customized vehicle
  const handleDeleteCar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this custom vehicle?')) {
      const updated = cars.filter(c => c.id !== id);
      setCars(updated);
      saveCars(updated);
      setCompareIds(compareIds.filter(item => item !== id));
    }
  };

  // Reset to default preset data
  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all data? Custom vehicles will be deleted.')) {
      localStorage.removeItem('user_cars');
      setCars(INITIAL_CARS);
      setCompareIds([]);
    }
  };

  // Form helper for dynamic feature inputs
  const handleFeatureChange = (index: number, val: string) => {
    const updatedFeatures = [...newCar.features];
    updatedFeatures[index] = val;
    setNewCar({ ...newCar, features: updatedFeatures });
  };

  const addFeatureInput = () => {
    setNewCar({ ...newCar, features: [...newCar.features, ''] });
  };

  const removeFeatureInput = (index: number) => {
    if (newCar.features.length === 1) return;
    const updated = newCar.features.filter((_, i) => i !== index);
    setNewCar({ ...newCar, features: updated });
  };

  // Filtering & Sorting logic
  const filteredCars = cars
    .filter(car => {
      const matchSearch = car.model.toLowerCase().includes(search.toLowerCase()) || 
                          car.brand.toLowerCase().includes(search.toLowerCase());
      const matchBrand = selectedBrand === 'All' || car.brand === selectedBrand;
      const matchType = selectedType === 'All' || car.type === selectedType;
      return matchSearch && matchBrand && matchType;
    })
    .sort((a, b) => {
      if (sortBy === 'priceAsc') return a.priceMin - b.priceMin;
      if (sortBy === 'priceDesc') return b.priceMin - a.priceMin;
      if (sortBy === 'powerDesc') return b.power - a.power;
      if (sortBy === 'efficiencyDesc') return b.efficiency - a.efficiency;
      if (sortBy === 'costAsc') return calculateCostPerKm(a.type, a.efficiency) - calculateCostPerKm(b.type, b.efficiency);
      return 0; // Default Sort
    });

  // Data for charts inside comparison modal
  const selectedCarsData = cars.filter(c => compareIds.includes(c.id));
  
  const chartDataPrice = selectedCarsData.map(c => ({
    name: c.model.length > 10 ? `${c.model.substring(0, 10)}...` : c.model,
    'Min Price': c.priceMin,
    'Max Price': c.priceMax
  }));

  const chartDataPower = selectedCarsData.map(c => ({
    name: c.model.length > 10 ? `${c.model.substring(0, 10)}...` : c.model,
    'Power (hp)': c.power,
    '0-100 km/h (s)': c.zeroToHundred
  }));

  const chartDataCost = selectedCarsData.map(c => ({
    name: c.model.length > 10 ? `${c.model.substring(0, 10)}...` : c.model,
    'Cost (KRW/km)': calculateCostPerKm(c.type, c.efficiency)
  }));

  const getBadgeClass = (type: Car['type']) => {
    switch(type) {
      case 'EV': return 'badge-ev';
      case 'HEV': return 'badge-hev';
      case 'PHEV': return 'badge-phev';
      case 'ICE': return 'badge-ice';
      default: return '';
    }
  };

  return (
    <div className="app-container">
      {/* HEADER */}
      <header className="app-header glass-panel animate-fade-in">
        <div className="header-title-area">
          <h1>AutoHorizon</h1>
          <p>Customize and compare your vehicle specifications</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={handleResetData}>
            <RotateCcw size={18} />
            Reset Data
          </button>
          <button className="btn-primary" onClick={() => setIsAddModalOpen(true)}>
            <Plus size={18} />
            Add Vehicle
          </button>
        </div>
      </header>

      {/* FILTER & SEARCH */}
      <section className="filter-bar glass-panel animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="filter-row-top">
          <div className="search-input-wrapper">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by model or brand..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>
          
          <select 
            value={selectedBrand} 
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="select-input"
          >
            <option value="All">All Brands</option>
            {brands.filter(b => b !== 'All').map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>

          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="select-input"
          >
            <option value="default">Default Sort</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="powerDesc">Power: High to Low</option>
            <option value="efficiencyDesc">Efficiency: High to Low</option>
            <option value="costAsc">Driving Cost: Low to High</option>
          </select>
        </div>

        <div className="filter-tags-row">
          <span className="filter-label">Drive Type:</span>
          {['All', 'EV', 'HEV', 'PHEV', 'ICE'].map(type => (
            <button
              key={type}
              className={`tag-btn ${selectedType === type ? 'active' : ''}`}
              onClick={() => setSelectedType(type)}
            >
              {type === 'All' ? 'All' : type}
            </button>
          ))}
        </div>

        {/* Real-time Fuel Pricing Panel */}
        <div className="filter-tags-row" style={{ marginTop: '0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '0.75rem' }}>
          <span className="filter-label" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <DollarSign size={14} /> Fuel / charging cost settings (KRW):
          </span>
          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}>
              Gasoline (per L):
              <input 
                type="number" 
                value={gasPrice} 
                onChange={(e) => setGasPrice(Number(e.target.value))}
                style={{ width: '80px', marginLeft: '0.5rem', padding: '0.25rem 0.5rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: 'white', fontSize: '0.8rem' }}
              />
            </label>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}>
              Electricity (per kWh):
              <input 
                type="number" 
                value={electricityPrice} 
                onChange={(e) => setElectricityPrice(Number(e.target.value))}
                style={{ width: '80px', marginLeft: '0.5rem', padding: '0.25rem 0.5rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: 'white', fontSize: '0.8rem' }}
              />
            </label>
          </div>
        </div>
      </section>

      {/* CARS GRID */}
      <main className="cars-grid animate-fade-in" style={{ animationDelay: '0.2s' }}>
        {filteredCars.length > 0 ? (
          filteredCars.map(car => (
            <div key={car.id} className="car-card glass-panel">
              <div className="car-image-container">
                {car.imageUrl ? (
                  <img src={car.imageUrl} alt={car.model} className="car-image" referrerPolicy="no-referrer" />
                ) : (
                  <div className="car-placeholder">
                    <CarIcon size={36} />
                    <span style={{ fontSize: '0.8rem' }}>No Image</span>
                  </div>
                )}
                <span className={`car-badge-type ${getBadgeClass(car.type)}`}>
                  {car.type}
                </span>
                {car.isCustom && (
                  <span className="car-badge-custom">Custom</span>
                )}

                {/* Inline Image Editor Panel */}
                {editingCarId === car.id ? (
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.95)', display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '0.75rem', justifyContent: 'center', zIndex: 10 }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Image URL:</span>
                    <input 
                      type="text" 
                      value={tempImageUrl} 
                      onChange={(e) => setTempImageUrl(e.target.value)}
                      placeholder="https://example.com/photo.jpg"
                      className="form-input"
                      style={{ padding: '0.35rem 0.5rem', fontSize: '0.75rem', background: 'rgba(2, 6, 23, 0.5)' }}
                    />
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button type="button" className="tag-btn active" style={{ flex: 1, borderRadius: '6px', fontSize: '0.75rem', padding: '0.25rem' }} onClick={() => handleSaveImage(car.id)}>Save</button>
                      <button type="button" className="tag-btn" style={{ flex: 1, borderRadius: '6px', fontSize: '0.75rem', padding: '0.25rem' }} onClick={() => setEditingCarId(null)}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <button 
                    style={{ position: 'absolute', bottom: '0.5rem', right: '0.5rem', background: 'rgba(2, 6, 23, 0.75)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'var(--accent-cyan)', borderRadius: '6px', padding: '0.25rem 0.5rem', fontSize: '0.7rem', fontWeight: 600, cursor: 'pointer', zIndex: 5, backdropFilter: 'blur(4px)' }}
                    onClick={() => handleStartEditImage(car.id, car.imageUrl || '')}
                  >
                    Edit Image
                  </button>
                )}
              </div>

              <div className="car-info-content">
                <div className="car-card-header">
                  <span className="car-brand">{car.brand}</span>
                  <h3 className="car-model">{car.model}</h3>
                  <span className="car-price">
                    {car.priceMin === car.priceMax 
                      ? `${(car.priceMin * 10000).toLocaleString()} KRW`
                      : `${(car.priceMin * 10000).toLocaleString()} ~ ${(car.priceMax * 10000).toLocaleString()} KRW`
                    }
                  </span>
                </div>

                <div className="car-specs-grid">
                  <div className="spec-item">
                    <Zap size={15} className="spec-icon" />
                    <div className="spec-details">
                      <span className="spec-label">Max Power</span>
                      <span className="spec-val">{car.power} hp</span>
                    </div>
                  </div>
                  <div className="spec-item">
                    <Gauge size={15} className="spec-icon" />
                    <div className="spec-details">
                      <span className="spec-label">0-100 km/h</span>
                      <span className="spec-val">{car.zeroToHundred || '-'} s</span>
                    </div>
                  </div>
                  <div className="spec-item">
                    <Droplet size={15} className="spec-icon" />
                    <div className="spec-details">
                      <span className="spec-label">{car.type === 'EV' ? 'Electricity' : 'Fuel Econ'}</span>
                      <span className="spec-val">{car.efficiency} {car.type === 'EV' ? 'km/kWh' : 'km/L'}</span>
                    </div>
                  </div>
                  <div className="spec-item">
                    <Info size={15} className="spec-icon" />
                    <div className="spec-details">
                      <span className="spec-label">{car.type === 'EV' ? 'Range' : 'Seats'}</span>
                      <span className="spec-val">{car.type === 'EV' ? `${car.range} km` : `${car.seats} seats`}</span>
                    </div>
                  </div>
                </div>

                {/* Driving cost estimate banner */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(16, 185, 129, 0.08)', padding: '0.5rem 0.75rem', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.15)', fontSize: '0.8rem' }}>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Driving Cost per km</span>
                  <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>
                    approx. {calculateCostPerKm(car.type, car.efficiency).toLocaleString()} KRW
                  </span>
                </div>

                {car.features && car.features.length > 0 && (
                  <div className="car-features-list">
                    {car.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="feature-bullet">
                        <Sparkles size={11} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="car-card-actions">
                  <button 
                    onClick={() => toggleCompare(car.id)}
                    className={`btn-compare-toggle ${compareIds.includes(car.id) ? 'selected' : 'not-selected'}`}
                  >
                    <Columns2 size={16} />
                    {compareIds.includes(car.id) ? 'Remove' : 'Compare'}
                  </button>
                  {car.officialUrl && (
                    <a 
                      href={car.officialUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-official-link"
                      title="Open official site"
                    >
                      <ExternalLink size={16} />
                      <span>Link</span>
                    </a>
                  )}
                  {car.isCustom && (
                    <button 
                      onClick={(e) => handleDeleteCar(car.id, e)}
                      className="btn-delete-custom"
                      title="Delete custom vehicle"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state glass-panel" style={{ gridColumn: '1 / -1' }}>
            <CarIcon size={64} className="empty-state-icon" />
            <p>No vehicles match your search criteria.</p>
          </div>
        )}
      </main>

      {/* COMPARE TRAY (STICKY BOTTOM) */}
      {compareIds.length > 0 && (
        <div className="compare-tray glass-panel">
          <div className="compare-tray-info">
            <span className="compare-count-badge">{compareIds.length} selected</span>
            <div className="compare-tray-models">
              {selectedCarsData.map(c => (
                <span key={c.id} className="compare-tray-model-tag">{c.model}</span>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn-secondary" onClick={resetCompare}>Reset</button>
            <button 
              className="btn-primary" 
              onClick={() => setIsCompareModalOpen(true)}
              disabled={compareIds.length < 2}
              style={{ opacity: compareIds.length < 2 ? 0.6 : 1, cursor: compareIds.length < 2 ? 'not-allowed' : 'pointer' }}
            >
              Compare Specs & Charts
            </button>
          </div>
        </div>
      )}

      {/* MODAL: COMPARE VIEW */}
      {isCompareModalOpen && (
        <div className="modal-overlay" onClick={() => setIsCompareModalOpen(false)}>
          <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setIsCompareModalOpen(false)}>
              <X size={20} />
            </button>
            <h2 className="modal-title">Detailed Vehicle Comparison</h2>
            
            <div className="compare-dashboard">
              {/* CHARTS */}
              <div className="compare-charts-row">
                {/* Chart 1: Price */}
                <div className="chart-card glass-panel">
                  <h4 className="chart-title"><DollarSign size={16} /> Price Range (10k KRW)</h4>
                  <div className="chart-wrapper">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartDataPrice} margin={{ top: 20, right: 10, left: -20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 10 }} />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)' }} />
                        <Legend />
                        <Bar dataKey="Min Price" fill="#0891b2" />
                        <Bar dataKey="Max Price" fill="#06b6d4" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Chart 2: Output */}
                <div className="chart-card glass-panel">
                  <h4 className="chart-title"><Zap size={16} /> Max Power & Acceleration</h4>
                  <div className="chart-wrapper">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartDataPower} margin={{ top: 20, right: 10, left: -20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 10 }} />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)' }} />
                        <Legend />
                        <Bar dataKey="Power (hp)" fill="#f97316" />
                        <Bar dataKey="0-100 km/h (s)" fill="#8b5cf6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Chart 3: Cost per Km */}
                <div className="chart-card glass-panel">
                  <h4 className="chart-title"><DollarSign size={16} /> Driving Cost per km (KRW)</h4>
                  <div className="chart-wrapper">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartDataCost} margin={{ top: 20, right: 10, left: -20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 10 }} />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)' }} />
                        <Legend />
                        <Bar dataKey="Cost (KRW/km)" fill="#10b981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* SPECIFICATION TABLE */}
              <div className="compare-table-wrapper glass-panel">
                <table className="compare-table">
                  <thead>
                    <tr>
                      <th>Specs</th>
                      {selectedCarsData.map(car => (
                        <th key={car.id}>
                          <div className="car-compare-header-cell">
                            <span className="brand">{car.brand}</span>
                            <span className="model">{car.model}</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="header-column">Drive Type</td>
                      {selectedCarsData.map(car => (
                        <td key={car.id} className="car-val-column">
                          <span className={`car-badge-type ${getBadgeClass(car.type)}`} style={{ position: 'static' }}>
                            {car.type}
                          </span>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="header-column">Price Range</td>
                      {selectedCarsData.map(car => (
                        <td key={car.id} className="car-val-column">
                          {car.priceMin === car.priceMax 
                            ? `${(car.priceMin * 10000).toLocaleString()} KRW`
                            : `${(car.priceMin * 10000).toLocaleString()} ~ ${(car.priceMax * 10000).toLocaleString()} KRW`
                          }
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="header-column">Max Power</td>
                      {selectedCarsData.map(car => (
                        <td key={car.id} className="car-val-column">{car.power} hp</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="header-column">Max Torque</td>
                      {selectedCarsData.map(car => (
                        <td key={car.id} className="car-val-column">{car.torque} kg.m</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="header-column">Efficiency</td>
                      {selectedCarsData.map(car => (
                        <td key={car.id} className="car-val-column">
                          {car.efficiency} {car.type === 'EV' ? 'km/kWh' : 'km/L'}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="header-column">Driving Cost per km</td>
                      {selectedCarsData.map(car => (
                        <td key={car.id} className="car-val-column" style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>
                          approx. {calculateCostPerKm(car.type, car.efficiency).toLocaleString()} KRW
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="header-column">Range (EV)</td>
                      {selectedCarsData.map(car => (
                        <td key={car.id} className="car-val-column">{car.type === 'EV' ? `${car.range} km` : '-'}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="header-column">0-100 km/h (s)</td>
                      {selectedCarsData.map(car => (
                        <td key={car.id} className="car-val-column">{car.zeroToHundred || '-'} s</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="header-column">Size / Seats</td>
                      {selectedCarsData.map(car => (
                        <td key={car.id} className="car-val-column">{car.size} / {car.seats} seats</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="header-column">Key Features</td>
                      {selectedCarsData.map(car => (
                        <td key={car.id} className="car-val-column" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                          <ul style={{ paddingLeft: '1rem' }}>
                            {car.features.map((f, i) => <li key={i}>{f}</li>)}
                          </ul>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD VEHICLE FORM */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-content glass-panel" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setIsAddModalOpen(false)}>
              <X size={20} />
            </button>
            <h2 className="modal-title">Add New Vehicle</h2>
            
            <form onSubmit={handleAddCar} className="form-grid">
              <div className="form-group">
                <label className="form-label">Brand *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Toyota, Tesla, Hyundai" 
                  value={newCar.brand}
                  onChange={(e) => setNewCar({ ...newCar, brand: e.target.value })}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Model *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Camry Hybrid, Model Y" 
                  value={newCar.model}
                  onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Drive Type</label>
                <select 
                  value={newCar.type}
                  onChange={(e) => setNewCar({ ...newCar, type: e.target.value as Car['type'] })}
                  className="form-input"
                >
                  <option value="EV">EV (Electric)</option>
                  <option value="HEV">HEV (Hybrid)</option>
                  <option value="PHEV">PHEV (Plug-in Hybrid)</option>
                  <option value="ICE">ICE (Internal Combustion)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Size</label>
                <select 
                  value={newCar.size}
                  onChange={(e) => setNewCar({ ...newCar, size: e.target.value as Car['size'] })}
                  className="form-input"
                >
                  <option value="Compact">Compact</option>
                  <option value="Subcompact">Subcompact</option>
                  <option value="Mid-size">Mid-size</option>
                  <option value="Full-size">Full-size</option>
                  <option value="Large">Large</option>
                  <option value="Compact SUV">Compact SUV</option>
                  <option value="Mid-size SUV">Mid-size SUV</option>
                  <option value="Large SUV">Large SUV</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Min Price (10k KRW)</label>
                <input 
                  type="number" 
                  value={newCar.priceMin || ''}
                  onChange={(e) => setNewCar({ ...newCar, priceMin: Number(e.target.value) })}
                  className="form-input"
                  placeholder="0"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Max Price (10k KRW)</label>
                <input 
                  type="number" 
                  value={newCar.priceMax || ''}
                  onChange={(e) => setNewCar({ ...newCar, priceMax: Number(e.target.value) })}
                  className="form-input"
                  placeholder="0"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Max Power (hp)</label>
                <input 
                  type="number" 
                  value={newCar.power || ''}
                  onChange={(e) => setNewCar({ ...newCar, power: Number(e.target.value) })}
                  className="form-input"
                  placeholder="0"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Max Torque (kg.m)</label>
                <input 
                  type="number" 
                  step="0.1"
                  value={newCar.torque || ''}
                  onChange={(e) => setNewCar({ ...newCar, torque: Number(e.target.value) })}
                  className="form-input"
                  placeholder="0"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Efficiency</label>
                <input 
                  type="number" 
                  step="0.1"
                  value={newCar.efficiency || ''}
                  onChange={(e) => setNewCar({ ...newCar, efficiency: Number(e.target.value) })}
                  className="form-input"
                  placeholder="0"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Range (EV, km)</label>
                <input 
                  type="number" 
                  value={newCar.range || ''}
                  onChange={(e) => setNewCar({ ...newCar, range: Number(e.target.value) })}
                  className="form-input"
                  disabled={newCar.type !== 'EV'}
                  placeholder={newCar.type !== 'EV' ? 'N/A' : '0'}
                />
              </div>

              <div className="form-group">
                <label className="form-label">0-100 km/h (s)</label>
                <input 
                  type="number" 
                  step="0.1"
                  value={newCar.zeroToHundred || ''}
                  onChange={(e) => setNewCar({ ...newCar, zeroToHundred: Number(e.target.value) })}
                  className="form-input"
                  placeholder="0.0"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Seats</label>
                <input 
                  type="number" 
                  value={newCar.seats || ''}
                  onChange={(e) => setNewCar({ ...newCar, seats: Number(e.target.value) })}
                  className="form-input"
                  placeholder="5"
                />
              </div>

              <div className="form-group full-width">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label className="form-label">Key Features</label>
                  <button type="button" onClick={addFeatureInput} className="tag-btn" style={{ borderRadius: '6px', fontSize: '0.75rem' }}>+ Add</button>
                </div>
                
                {newCar.features.map((feature, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                    <input 
                      type="text" 
                      placeholder="e.g. Quiet cabin, smooth ride" 
                      value={feature}
                      onChange={(e) => handleFeatureChange(idx, e.target.value)}
                      className="form-input"
                      style={{ flex: 1 }}
                    />
                    {newCar.features.length > 1 && (
                      <button 
                        type="button" 
                        onClick={() => removeFeatureInput(idx)}
                        className="btn-delete-custom"
                        style={{ padding: '0.5rem' }}
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="form-actions full-width">
                <button type="button" className="btn-secondary" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Add Vehicle</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
