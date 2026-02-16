# SmartAgri AI

A comprehensive AI-powered agricultural platform that provides intelligent solutions for crop management, disease detection, and fertilizer recommendations.

## 🚀 Features

### 🌱 Crop Disease Detection
- AI-powered image recognition for plant disease identification
- Real-time analysis using deep learning models
- Support for multiple crop types
- High accuracy predictions

### 🌱 Crop Recommendation System
- Data-driven crop suggestions based on soil conditions
- Weather and climate considerations
- Soil nutrient analysis (N, P, K levels)
- pH and rainfall impact assessment

### 🌱 Fertilizer Recommendation
- Optimal fertilizer suggestions based on crop needs
- Soil nutrient balance analysis
- Environmental impact considerations
- Cost-effective recommendations

## 🛠️ Tech Stack

### Backend
- **FastAPI** - High-performance web framework
- **TensorFlow** - Deep learning models
- **Python** - Primary programming language
- **Joblib** - Model serialization
- **Pandas/Numpy** - Data processing

### Frontend
- **React** - Modern UI framework
- **React Router** - Navigation
- **Axios** - HTTP client
- **FontAwesome** - Icons

### Machine Learning Models
- **Convolutional Neural Networks** - Image classification
- **Random Forest** - Crop and fertilizer recommendations
- **Keras** - Deep learning framework

## 📁 Project Structure

```
SmartAgri-AI/
├── backend/                 # FastAPI backend
│   ├── main.py            # Main API endpoints
│   ├── requirements.txt   # Python dependencies
│   └── plant_disease_model.keras  # Trained ML model
├── frontend/               # React frontend
│   ├── package.json       # Node.js dependencies
│   ├── src/
│   │   ├── components/    # React components
│   │   └── pages/         # Page components
│   └── public/            # Static assets
├── ML_model_training/     # Jupyter notebooks for model training
│   ├── crop-detection.ipynb
│   ├── crop-recommendation-using-machine-learning.ipynb
│   └── datasets/           # Training data
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- pip
- npm

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

## 📊 API Endpoints

### Crop Disease Detection
- `POST /detect-disease` - Upload image for disease analysis
- `GET /disease-info/{disease_name}` - Get disease information

### Crop Recommendation
- `POST /recommend-crop` - Get crop recommendations based on soil conditions

### Fertilizer Recommendation
- `POST /recommend-fertilizer` - Get fertilizer suggestions based on crop and soil data

## 🔧 Configuration

### Environment Variables
- `REACT_APP_BACKEND_URL` - Backend API URL
- `FRONTEND_URL` - Frontend URL for CORS

### Model Files
- Plant disease model: `backend/plant_disease_model.keras`
- Crop recommendation models: Trained in ML_model_training/

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌍 About

SmartAgri AI is an open-source project aimed at revolutionizing agriculture through artificial intelligence. The platform helps farmers make data-driven decisions for better crop management and increased yields.

## 🔗 Useful Links

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://reactjs.org/)
- [TensorFlow Documentation](https://www.tensorflow.org/)
- [Plant Disease Dataset](https://www.kaggle.com/datasets/)

---

**Built with ❤️ for sustainable agriculture**