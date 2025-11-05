import React from 'react';

const About = () => {
  // const supportedPlants = [
  //   {
  //     plant: 'Apple',
  //     diseases: ['Apple Scab', 'Black Rot', 'Cedar Apple Rust', 'Healthy']
  //   },
  //   {
  //     plant: 'Blueberry',
  //     diseases: ['Healthy']
  //   },
  //   {
  //     plant: 'Cherry',
  //     diseases: ['Powdery Mildew', 'Healthy']
  //   },
  //   {
  //     plant: 'Corn',
  //     diseases: ['Cercospora Leaf Spot (Gray Leaf Spot)', 'Common Rust', 'Northern Leaf Blight', 'Healthy']
  //   },
  //   {
  //     plant: 'Grape',
  //     diseases: ['Black Rot', 'Esca (Black Measles)', 'Leaf Blight (Isariopsis Leaf Spot)', 'Healthy']
  //   },
  //   {
  //     plant: 'Orange',
  //     diseases: ['Huanglongbing (Citrus Greening)']
  //   },
  //   {
  //     plant: 'Peach',
  //     diseases: ['Bacterial Spot', 'Healthy']
  //   },
  //   {
  //     plant: 'Bell Pepper',
  //     diseases: ['Bacterial Spot', 'Healthy']
  //   },
  //   {
  //     plant: 'Potato',
  //     diseases: ['Early Blight', 'Late Blight', 'Healthy']
  //   },
  //   {
  //     plant: 'Raspberry',
  //     diseases: ['Healthy']
  //   },
  //   {
  //     plant: 'Soybean',
  //     diseases: ['Healthy']
  //   },
  //   {
  //     plant: 'Squash',
  //     diseases: ['Powdery Mildew']
  //   },
  //   {
  //     plant: 'Strawberry',
  //     diseases: ['Leaf Scorch', 'Healthy']
  //   },
  //   {
  //     plant: 'Tomato',
  //     diseases: ['Bacterial Spot', 'Early Blight', 'Late Blight', 'Leaf Mold', 'Septoria Leaf Spot', 
  //               'Spider Mites (Two-Spotted Spider Mite)', 'Target Spot', 'Yellow Leaf Curl Virus', 
  //               'Mosaic Virus', 'Healthy']
  //   },
  //   {
  //     plant: 'Wheat',
  //     diseases: ['Brown Rust', 'Healthy', 'Yellow Rust']
  //   },
  //   {
  //     plant: 'Rice',
  //     diseases: ['Bacterial Leaf Blight', 'Brown Spot', 'Healthy', 'Hispa', 'Leaf Blast', 'Leaf Scald', 
  //               'Narrow Brown Spot', 'Neck Blast', 'Sheath Blight', 'Tungro']
  //   }
  // ];

  return (
    <div className="page about-page">
      <h1>📚 About AgriTech AI</h1>
      
      <div className="about-content">
        <section className="about-section">
          <h2>🌾 Project Overview</h2>
          <p>
            <strong>AgriTech AI</strong> combines advanced agricultural technologies to empower farmers 
            with intelligent decision-making tools for better crop management and increased yields.
          </p>
        </section>

        <section className="features-detailed">
          <div className="feature-detail">
            <h3>🌱 Crop Recommendation</h3>
            <p>
              Suggests the best-fit crops based on comprehensive soil and climate analysis using 
              a Random Forest machine learning model trained on extensive agricultural datasets.
            </p>
            <ul>
              <li>Analyzes soil nutrients (NPK levels)</li>
              <li>Considers environmental factors (temperature, humidity, pH, rainfall)</li>
              <li>Crop support for Recommendation : Rice, Maize, Jute, Cotton, Coconut, Papaya, Orange, Apple, Muskmelon, Watermelon, Grapes, Mango, Banana, Pomegranate, Lentil, Blackgram, Mungbean, Mothbeans, Pigeonpeas, Kidneybeans, Chickpea, Coffee.</li>
              <li>Provides top 3 crop recommendations with confidence scores</li>
            </ul>
          </div>

          <div className="feature-detail">
            <h3>🌾 Fertilizer Recommendation</h3>
            <p>
              Recommends optimal fertilizer formulations tailored to specific soil conditions 
              and crop requirements using a Decision Tree model.
            </p>
            <ul>
              <li>Soil type classification (Loamy, Sandy, Clayey, etc.)</li>
              <li>Crop-specific nutrient requirements</li>
              <li>Environmental condition adjustments</li>

              <li>Fertilizer Recommendation – Crop support: Sugarcane, Cotton, Millets, Paddy, Pulses, Wheat, Tobacco, Barley, Oil Seeds, Ground Nuts, Maize.</li>
              <li>Recommended Fertilizer Supports: Urea, DAP, 14-35-14, 28-28, 17-17-17, 20-20, 10-26-26.</li>
            </ul>
          </div>

          <div className="feature-detail">
            <h3>🍃 Crop Disease Recognition</h3>
            <p>
              Detects plant diseases from leaf images using a state-of-the-art Convolutional Neural Network 
              trained on thousands of plant disease samples.
            </p>
            <ul>
              <li>Instant disease identification from leaf photos</li>
              <li>Supports 25+ different plants and 50+ disease types</li>
              <li>High accuracy detection with confidence scoring</li>

              <li>Supported plant with disease == Apple (Apple Scab, Black Rot, Cedar Apple Rust, Healthy),
              Blueberry (Healthy),
              Cherry (Powdery Mildew, Healthy),
              Corn (Cercospora Leaf Spot / Gray Leaf Spot, Common Rust, Northern Leaf Blight, Healthy), Grape (Black Rot, Esca / Black Measles, Leaf Blight / Isariopsis Leaf Spot, Healthy), Orange (Huanglongbing / Citrus Greening), Peach (Bacterial Spot, Healthy), Bell Pepper (Bacterial Spot, Healthy), Potato (Early Blight, Late Blight, Healthy), Raspberry (Healthy), Soybean (Healthy), Squash (Powdery Mildew), Strawberry (Leaf Scorch, Healthy), Tomato (Bacterial Spot, Early Blight, Late Blight, Leaf Mold, Septoria Leaf Spot, Spider Mites / Two-Spotted Spider Mite, Target Spot, Yellow Leaf Curl Virus, Mosaic Virus, Healthy), Wheat (Brown Rust, Yellow Rust, Healthy), Rice (Bacterial Leaf Blight, Brown Spot, Hispa, Leaf Blast, Leaf Scald, Narrow Brown Spot, Neck Blast, Sheath Blight, Tungro, Healthy).</li>
            </ul>
          </div>
        </section>

        <section className="tech-stack">
          <h2>🛠️ Technologies Used</h2>
          <div className="tech-categories">
            <div className="tech-category">
              <h4>Backend</h4>
              <ul>
                <li><strong>FastAPI:</strong> Modern Python web framework</li>
                <li><strong>TensorFlow:</strong> Deep learning for disease detection</li>
                <li><strong>Scikit-learn:</strong> Machine learning algorithms</li>
                <li><strong>Joblib:</strong> Model serialization</li>
              </ul>
            </div>
            
            <div className="tech-category">
              <h4>Frontend</h4>
              <ul>
                <li><strong>React:</strong> Modern JavaScript library</li>
                <li><strong>JavaScript:</strong> Dynamic programming language</li>
                <li><strong>Axios:</strong> HTTP client</li>
                <li><strong>React Router:</strong> Navigation</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="performance">
          <h2>📊 Model Performance</h2>
          <div className="performance-grid">
            <div className="performance-card">
              <h3>🌱 Crop Model</h3>
              <div className="accuracy">99%</div>
              <p>Random Forest Classifier</p>
            </div>
            <div className="performance-card">
              <h3>🌾 Fertilizer Model</h3>
              <div className="accuracy">99.9%</div>
              <p>Decision Tree Classifier</p>
            </div>
            <div className="performance-card">
              <h3>🍃 Disease Model</h3>
              <div className="accuracy">98%</div>
              <p>Convolutional Neural Network</p>
            </div>
          </div>
        </section>

        {/* <section className="supported-plants">
          <h2>🌿 Supported Plants & Diseases</h2>
          <p>Our disease detection model can identify health conditions for the following plants:</p>
          
          <div className="plants-grid">
            {supportedPlants.map((plantInfo, index) => (
              <div key={index} className="plant-card">
                <h4>🌱 {plantInfo.plant}</h4>
                <div className="disease-list">
                  <p><strong>Conditions:</strong></p>
                  <ul>
                    {plantInfo.diseases.map((disease, diseaseIndex) => (
                      <li key={diseaseIndex} className={disease === 'Healthy' ? 'healthy' : 'disease'}>
                        {disease === 'Healthy' ? '✅ ' : '⚠️ '}{disease}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          
          <div className="plant-summary">
            <p><strong>Total Coverage:</strong> 25 plant varieties with 50+ different health conditions</p>
            <p><strong>Diseases Detected:</strong> Various fungal, bacterial, viral infections, nutritional deficiencies, and pest damage</p>
            <p><strong>Healthy Recognition:</strong> Confirms plant health when no diseases are detected</p>
          </div>
        </section> */}

        <section className="datasets">
          <h2>📈 Datasets</h2>
          <p>
            Models are trained on high-quality datasets from Kaggle and agricultural research institutions, 
            ensuring robust performance across diverse growing conditions and plant varieties.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
