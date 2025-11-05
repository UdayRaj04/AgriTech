import React from 'react';
import './footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>AgriTech AI</h3>
          <p>Empowering farmers with AI-driven agricultural solutions for sustainable farming and increased productivity.</p>
        </div>
        
        <div className="footer-section">
          <h4>Features</h4>
          <ul>
            <li>Smart Crop Recommendation</li>
            <li>Fertilizer Optimization</li>
            <li>Disease Detection & Analysis</li>
            <li>AI-Powered Insights</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Model Performance</h4>
          <ul>
            <li><strong>Crop Recommendation:</strong> 99% Accuracy</li>
            <li><strong>Fertilizer Suggestion:</strong> 99.9% Accuracy</li>
            <li><strong>Disease Detection:</strong> 98% Accuracy</li>
            <li><strong>Total Plant Coverage:</strong> 25+ Varieties</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact & Support</h4>
          <ul>
            <li>Email: support@AgriTech.ai</li>
            <li>Website: www.AgriTech.ai</li>
            <li>Mobile App: Coming Soon</li>
            <li>Report Issues: GitHub Issues</li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-divider"></div>
        <div className="footer-bottom-content">
          <p>© {currentYear} AgriTech AI. All rights reserved. | Made with ❤️ by{" "}
  <strong>
    <a 
      href="https://udayaj.web.app" 
      target="_blank" 
      rel="noopener noreferrer"
      style={{ color: '#42e7d9ff', textDecoration: 'none' }}
    >
      Uday Raj
    </a>
  </strong></p>
          <p className="footer-tech">
            Built with React, FastAPI, TensorFlow & Scikit-learn
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
