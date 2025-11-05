import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CropRecommendation from './pages/CropRecommendation';
import FertilizerRecommendation from './pages/FertilizerRecommendation';
import DiseaseDetection from './pages/DiseaseDetection';
import About from './pages/About';
import './index.css';
import ChatBot from './components/ChatBot';

const BACKENDURL = process.env.REACT_APP_BAKEND_URL;
console.log(BACKENDURL);

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/crop-recommendation" element={<CropRecommendation />} />
            <Route path="/fertilizer-recommendation" element={<FertilizerRecommendation />} />
            <Route path="/disease-detection" element={<DiseaseDetection />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
        <ChatBot />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
