import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKENDURL = process.env.REACT_APP_BAKEND_URL;

const FertilizerRecommendation = () => {
  const [formData, setFormData] = useState({
    temperature: 25,
    humidity: 60,
    moisture: 40,
    soil_type: 'Loamy',
    nitrogen: 60,
    potassium: 50,
    phosphorus: 40,
    crop_type: 'Wheat'
  });
  const [soilTypes, setSoilTypes] = useState([]);
  const [cropTypes, setCropTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Load soil and crop types
    const loadOptions = async () => {
      try {
        const [soilResponse, cropResponse] = await Promise.all([
          axios.get(`${BACKENDURL}/options/soil-types`),
          axios.get(`${BACKENDURL}/options/crop-types`)
        ]);
        setSoilTypes(soilResponse.data.soil_types);
        setCropTypes(cropResponse.data.crop_types);
      } catch (err) {
        console.error('Error loading options:', err);
      }
    };

    loadOptions();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.post(
        `${BACKENDURL}/predict/fertilizer`,
        formData
      );
      setResult(response.data);
    } catch (err) {
      setError('Error predicting fertilizer. Please check your inputs and try again.');
    } finally {
      // console.log(BACKENDURL);
      setLoading(false);
    }
  };

  return (
    <div className="page fertilizer-page">
      <h1>🌾 Smart Fertilizer Recommendation System</h1>
      <p>This app suggests the best fertilizer based on soil, crop, and environmental data.</p>

      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-section">
          <h3>🌡️ Environmental Conditions</h3>
          <div className="form-group">
            <label>Temperature (°C)</label>
            <input
              type="number"
              min="0"
              max="50"
              value={formData.temperature}
              onChange={(e) => handleInputChange('temperature', parseFloat(e.target.value) || 0)}
            />
          </div>
          <div className="form-group">
            <label>Humidity (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={formData.humidity}
              onChange={(e) => handleInputChange('humidity', parseFloat(e.target.value) || 0)}
            />
          </div>
          <div className="form-group">
            <label>Soil Moisture (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={formData.moisture}
              onChange={(e) => handleInputChange('moisture', parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>

        <div className="form-section">
          <h3>🪨 Soil & Crop Type</h3>
          <div className="form-group">
            <label>Soil Type</label>
            <select
              value={formData.soil_type}
              onChange={(e) => handleInputChange('soil_type', e.target.value)}
            >
              {soilTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Crop Type</label>
            <select
              value={formData.crop_type}
              onChange={(e) => handleInputChange('crop_type', e.target.value)}
            >
              {cropTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-section">
          <h3>🧪 Soil Nutrients</h3>
          <div className="form-group">
            <label>Nitrogen (N)</label>
            <input
              type="number"
              min="0"
              max="140"
              value={formData.nitrogen}
              onChange={(e) => handleInputChange('nitrogen', parseFloat(e.target.value) || 0)}
            />
          </div>
          <div className="form-group">
            <label>Potassium (K)</label>
            <input
              type="number"
              min="0"
              max="200"
              value={formData.potassium}
              onChange={(e) => handleInputChange('potassium', parseFloat(e.target.value) || 0)}
            />
          </div>
          <div className="form-group">
            <label>Phosphorus (P)</label>
            <input
              type="number"
              min="0"
              max="200"
              value={formData.phosphorus}
              onChange={(e) => handleInputChange('phosphorus', parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? '🚀 Predicting...' : '🚀 Predict Best Fertilizer'}
          </button>
        </div>
      </form>

      {error && <div className="alert alert-error">{error}</div>}

      {result && (
        <div className="result-section">
          <div className="alert alert-success">
            <h3>🌱 Recommended Fertilizer: {result.prediction}</h3>
          </div>
        </div>
      )}

      <footer className="page-footer">
        <p>Model: Decision Tree | Accuracy: 99.9% | developed with ❤️ by Uday</p>
      </footer>
    </div>
  );
};

export default FertilizerRecommendation;
