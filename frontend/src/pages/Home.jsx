import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="page home-page">
      <header className="hero">
        <h1>🌾 AgriTech: AI-Powered Crop Advisor & Disease Detector</h1>
      </header>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">🌱</div>
          <h3>Crop Recommendation</h3>
          <p>Get personalized crop suggestions based on soil nutrients, climate conditions, and environmental factors using advanced machine learning.</p>
          <Link to="/crop-recommendation" className="btn btn-primary">
            Try Crop Recommendation
          </Link>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🍃</div>
          <h3>Disease Detection</h3>
          <p>Upload leaf images for instant AI-powered disease identification. Detect plant health issues before they spread.</p>
          <Link to="/disease-detection" className="btn btn-primary">
            Detect Diseases
          </Link>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🌾</div>
          <h3>Fertilizer Recommendation</h3>
          <p>Receive customized fertilizer suggestions tailored to your specific soil conditions and crop requirements.</p>
          <Link to="/fertilizer-recommendation" className="btn btn-primary">
            Get Fertilizer Advice
          </Link>
        </div>
      </div>

      <div className="quick-start">
        <h2>🚀 Quick Start Guide</h2>
        <div className="steps">
          <div className="step">
            <span className="step-number">1</span>
            <p>Navigate to <strong>Crop Recommendation</strong> to get crop suggestions based on your soil analysis.</p>
          </div>
          <div className="step">
            <span className="step-number">2</span>
            <p>Use <strong>Disease Detection</strong> to analyze plant leaf images for potential health issues.</p>
          </div>
          <div className="step">
            <span className="step-number">3</span>
            <p>Visit <strong>Fertilizer Recommendation</strong> for customized fertilizer suggestions.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
