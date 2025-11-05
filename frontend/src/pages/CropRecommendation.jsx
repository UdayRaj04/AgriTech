import React, { useState } from 'react';
import axios from 'axios';
const BACKENDURL = process.env.REACT_APP_BAKEND_URL;
const CropRecommendation = () => {
  const [formData, setFormData] = useState({
    nitrogen: 50,
    phosphorus: 50,
    potassium: 50,
    temperature: 25,
    humidity: 50,
    ph: 6.5,
    rainfall: 100
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

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
        `${BACKENDURL}/predict/crop`,
        formData
      );
      setResult(response.data);
    } catch (err) {
      setError('Error predicting crop. Please check your inputs and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page crop-page">
      <h1>🌾 Smart Crop Recommendation System</h1>
      <p>Enter soil and environmental parameters to get the best crop suggestions.</p>

      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-section">
          <h3>🌱 Soil Nutrients</h3>
          <div className="form-group">
            <label>Nitrogen (N)</label>
            <input
              type="number"
              min="0"
              max="150"
              value={formData.nitrogen}
              onChange={(e) => handleInputChange('nitrogen', parseFloat(e.target.value) || 0)}
            />
          </div>
          <div className="form-group">
            <label>Phosphorus (P)</label>
            <input
              type="number"
              min="0"
              max="150"
              value={formData.phosphorus}
              onChange={(e) => handleInputChange('phosphorus', parseFloat(e.target.value) || 0)}
            />
          </div>
          <div className="form-group">
            <label>Potassium (K)</label>
            <input
              type="number"
              min="0"
              max="150"
              value={formData.potassium}
              onChange={(e) => handleInputChange('potassium', parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>

        <div className="form-section">
          <h3>🌤️ Environmental Conditions</h3>
          <div className="form-group">
            <label>Temperature (°C)</label>
            <input
              type="number"
              min="0"
              max="50"
              step="0.1"
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
              step="0.1"
              value={formData.humidity}
              onChange={(e) => handleInputChange('humidity', parseFloat(e.target.value) || 0)}
            />
          </div>
          <div className="form-group">
            <label>Soil pH</label>
            <input
              type="number"
              min="0"
              max="14"
              step="0.1"
              value={formData.ph}
              onChange={(e) => handleInputChange('ph', parseFloat(e.target.value) || 0)}
            />
          </div>
          <div className="form-group">
            <label>Rainfall (mm)</label>
            <input
              type="number"
              min="0"
              max="300"
              step="0.1"
              value={formData.rainfall}
              onChange={(e) => handleInputChange('rainfall', parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? '🌱 Predicting...' : '🌱 Predict Crop'}
          </button>
        </div>
      </form>

      {error && <div className="alert alert-error">{error}</div>}

      {result && (
        <div className="result-section">
          <div className="alert alert-success">
            <h3>✅ Recommended Crop: {result.prediction}</h3>
            <p>Confidence: {(result.confidence * 100).toFixed(1)}%</p>
            <p><strong>Top 3 Recommendations:</strong> {result.alternatives.join(', ')}</p>
          </div>
        </div>
      )}

      <footer className="page-footer">
        <p>Model: Random Forest | Accuracy: 99% | developed with ❤️ by Uday</p>
      </footer>
    </div>
  );
};

export default CropRecommendation;
