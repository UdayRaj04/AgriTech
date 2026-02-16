from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import numpy as np
import joblib
import tensorflow as tf
import uvicorn
from typing import List
import os
from pathlib import Path
from io import BytesIO

# Initialize FastAPI app
app = FastAPI(title="SmartAgri AI API", version="1.0.0")
# Front = os.getenv("FRONTEND_URL")

# Add CORS middlewareallow_origins=[ FRONTEND_URL , "http://127.0.0.1:3000"],
app.add_middleware(
    CORSMiddleware,
    allow_origins=[ "http://localhost:3000" , "https://agritech-c6vy.onrender.com" ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class CropPredictionRequest(BaseModel):
    nitrogen: float
    phosphorus: float
    potassium: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float

class FertilizerPredictionRequest(BaseModel):
    temperature: float
    humidity: float
    moisture: float
    soil_type: str
    nitrogen: float
    potassium: float
    phosphorus: float
    crop_type: str

class PredictionResponse(BaseModel):
    prediction: str
    confidence: float
    alternatives: List[str]

class FertilizerResponse(BaseModel):
    prediction: str

# Load models
def load_crop_model():
    """Load crop recommendation model and label encoder"""
    try:
        model = joblib.load('recommendation_model.pkl')
        le = joblib.load('recommendation_label_encoder.pkl')
        return model, le
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error loading crop model: {str(e)}")

# def load_disease_model():
#     """Load disease detection model"""
#     try:
#         return tf.keras.models.load_model('plant_disease_model.keras')
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Error loading disease model: {str(e)}")

def load_ferti_model():
    """Load fertilizer recommendation model"""
    try:
        return joblib.load("fertilizer_recommendation_model.pkl")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error loading fertilizer model: {str(e)}")

# Load models at startup
crop_model, label_encoder = load_crop_model()
# disease_model = load_disease_model()
ferti_model = load_ferti_model()

# Mappings
SOIL_TYPES = {
    "Loamy": 1, "Sandy": 2, "Clayey": 3, "Black": 4, "Red": 5
}

CROP_TYPES = {
    "Sugarcane": 1, "Cotton": 2, "Millets": 3, "Paddy": 4, "Pulses": 5,
    "Wheat": 6, "Tobacco": 7, "Barley": 8, "Oil seeds": 9, "Ground Nuts": 10, "Maize": 11
}

# DISEASE_CLASSES = [
#     'Apple - Apple Scab', 'Apple - Black Rot', 'Apple - Cedar Apple Rust', 'Apple - Healthy',
#     'Blueberry - Healthy', 'Cherry - Powdery Mildew', 'Cherry - Healthy',
#     'Corn - Cercospora Leaf Spot (Gray Leaf Spot)', 'Corn - Common Rust', 'Corn - Northern Leaf Blight',
#     'Corn - Healthy', 'Grape - Black Rot', 'Grape - Esca (Black Measles)',
#     'Grape - Leaf Blight (Isariopsis Leaf Spot)', 'Grape - Healthy',
#     'Orange - Huanglongbing (Citrus Greening)', 'Peach - Bacterial Spot', 'Peach - Healthy',
#     'Bell Pepper - Bacterial Spot', 'Bell Pepper - Healthy', 'Potato - Early Blight',
#     'Potato - Late Blight', 'Potato - Healthy', 'Raspberry - Healthy', 'Soybean - Healthy',
#     'Squash - Powdery Mildew', 'Strawberry - Leaf Scorch', 'Strawberry - Healthy',
#     'Tomato - Bacterial Spot', 'Tomato - Early Blight', 'Tomato - Late Blight',
#     'Tomato - Leaf Mold', 'Tomato - Septoria Leaf Spot',
#     'Tomato - Spider Mites (Two-Spotted Spider Mite)', 'Tomato - Target Spot',
#     'Tomato - Yellow Leaf Curl Virus', 'Tomato - Mosaic Virus', 'Tomato - Healthy',
#     'Wheat - Brown Rust', 'Wheat - Healthy', 'Wheat - Yellow Rust',
#     'Rice - Bacterial Leaf Blight', 'Rice - Brown Spot', 'Rice - Healthy',
#     'Rice - Hispa', 'Rice - Leaf Blast', 'Rice - Leaf Scald', 'Rice - Narrow Brown Spot',
#     'Rice - Neck Blast', 'Rice - Sheath Blight', 'Rice - Tungro'
# ]

# API Endpoints
@app.get("/")
async def root():
    return {"message": "SmartAgri AI API is running!"}

@app.get("/health")
def health():
    return jsonify({"ok": True})

@app.post("/predict/crop", response_model=PredictionResponse)
async def predict_crop(request: CropPredictionRequest):
    try:
        # Prepare input data
        input_data = np.array([[
            request.nitrogen, request.phosphorus, request.potassium,
            request.temperature, request.humidity, request.ph, request.rainfall
        ]])
        
        # Get prediction probabilities
        probs = crop_model.predict_proba(input_data)
        top3_idx = np.argsort(probs, axis=1)[:, -3:][:, ::-1][0]
        top3_crops = label_encoder.inverse_transform(top3_idx)
        
        # Calculate confidence
        confidence = float(np.max(probs))
        
        return PredictionResponse(
            prediction=top3_crops[0],
            confidence=confidence,
            alternatives=list(top3_crops)
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error in crop prediction: {str(e)}")

@app.post("/predict/fertilizer", response_model=FertilizerResponse)
async def predict_fertilizer(request: FertilizerPredictionRequest):
    try:
        # Convert categorical inputs to numeric
        soil_num = SOIL_TYPES.get(request.soil_type)
        crop_num = CROP_TYPES.get(request.crop_type)
        
        if soil_num is None or crop_num is None:
            raise HTTPException(status_code=400, detail="Invalid soil or crop type")
        
        # Prepare input array
        user_input = np.array([[
            request.temperature, request.humidity, request.moisture,
            request.nitrogen, request.potassium, request.phosphorus,
            soil_num, crop_num
        ]])
        
        # Make prediction
        prediction = ferti_model.predict(user_input)
        
        return FertilizerResponse(prediction=prediction[0])
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error in fertilizer prediction: {str(e)}")

@app.post("/predict/disease")
async def predict_disease(file: UploadFile = File(...)):
    try:
        diagnosis = "render(free plan) cannot able to deploy plant disease detection model try it LOCALLY"
        plant = ""
        disease = "render(free plan) cannot able to deploy plant disease detection model try it LOCALLY"
        confidence = 00
        
        return {
            "prediction": diagnosis,
            "plant": plant,
            "disease": disease,
            "is_healthy": "Healthy" in disease,
            "confidence": confidence
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error in disease prediction: {str(e)}")

@app.get("/options/soil-types")
async def get_soil_types():
    return {"soil_types": list(SOIL_TYPES.keys())}

@app.get("/options/crop-types")
async def get_crop_types():
    return {"crop_types": list(CROP_TYPES.keys())}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
