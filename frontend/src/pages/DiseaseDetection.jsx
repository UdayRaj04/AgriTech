import React, { useState } from 'react';
import axios from 'axios';
// import { diseaseDatabase } from './diseasedata';
const BACKENDURL = process.env.REACT_APP_BAKEND_URL;
const DiseaseDetection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  // Disease information database
  const diseaseDatabase =  {
  // Apple diseases
  "Apple - Apple Scab": {
    description: "Fungal disease (Venturia inaequalis) causing dark, velvety lesions on leaves and fruit.",
    symptoms: "Olive-green to brown spots on leaves and fruit; leaves may become distorted and drop.",
    stepsToOvercome: "Prune for air flow, remove infected leaves/fruit, apply recommended fungicide at bud break and during wet periods, practice crop rotation and sanitation.",
    fertilizerSuggestion: "Balanced N-P-K (e.g., 10-10-10) at recommended rates; avoid excessive nitrogen which encourages lush growth.",
    timePeriod: "Several weeks to months; improvement after 2–3 spray cycles and seasonal management."
  },
  "Apple - Black Rot": {
    description: "Fungal disease (Botryosphaeria) causing fruit rot and leaf spots.",
    symptoms: "Circular dark lesions on fruit that enlarge into rotten patches; leaf spots with yellow halos; branch cankers.",
    stepsToOvercome: "Remove mummified fruit and prune out cankers; improve air circulation; apply fungicides during growing season; sanitize tools.",
    fertilizerSuggestion: "Balanced fertilizer, soil test first; avoid over-fertilization with nitrogen.",
    timePeriod: "Weeks to a season depending on severity; repeated control measures over a season."
  },
  "Apple - Cedar Apple Rust": {
    description: "Fungal disease (Gymnosporangium) alternating between junipers and apples causing bright orange lesions.",
    symptoms: "Yellow-orange spots on leaves and fruit; rubbery orange galls on juniper hosts in spring.",
    stepsToOvercome: "Remove nearby junipers if possible, prune infected tissue, use resistant varieties, apply fungicide at petal fall and early summer.",
    fertilizerSuggestion: "Maintain moderate fertility guided by soil test; balanced N-P-K.",
    timePeriod: "Several weeks to months; preventively managed each season."
  },
  "Apple - Healthy": {
    description: "No disease present; plant is healthy.",
    symptoms: "Normal green leaves, steady growth, normal fruit set.",
    stepsToOvercome: "Maintain good cultural practices: proper irrigation, pruning, nutrition, and monitoring.",
    fertilizerSuggestion: "Apply balanced fertilizer per soil test and growth stage.",
    timePeriod: "N/A"
  },

  // Blueberry
  "Blueberry - Healthy": {
    description: "No disease present; plant is healthy.",
    symptoms: "Vigorous growth, blue fruit, green leaves.",
    stepsToOvercome: "Maintain acidic soil (pH 4.5–5.5), mulch, regular monitoring.",
    fertilizerSuggestion: "Acid-forming fertilizer for blueberries (e.g., ammonium sulfate or specialized blueberry feed).",
    timePeriod: "N/A"
  },

  // Cherry
  "Cherry - Powdery Mildew": {
    description: "Fungal disease causing white powdery growth on leaves and shoots (Erysiphales species).",
    symptoms: "White powdery coating on leaves, young shoots distorted, reduced vigor.",
    stepsToOvercome: "Improve air circulation, remove infected shoots, apply sulfur-based or appropriate fungicide, avoid excessive nitrogen.",
    fertilizerSuggestion: "Balanced fertilizer; avoid high nitrogen in susceptible periods.",
    timePeriod: "A few weeks with treatment; manage through season."
  },
  "Cherry - Healthy": {
    description: "No disease present; plant is healthy.",
    symptoms: "Normal glossy leaves and fruit.",
    stepsToOvercome: "Good pruning, sanitation, pest monitoring.",
    fertilizerSuggestion: "Balanced fertilizer per soil test.",
    timePeriod: "N/A"
  },

  // Corn
  "Corn - Cercospora Leaf Spot / Gray Leaf Spot": {
    description: "Fungal leaf disease (Cercospora) causing rectangular lesions that reduce photosynthesis.",
    symptoms: "Brown to gray rectangular lesions between leaf veins; severe infections cause leaf blighting.",
    stepsToOvercome: "Use resistant hybrids, crop rotation, remove residue, apply fungicide at tassel/silking if necessary.",
    fertilizerSuggestion: "Maintain balanced fertility; ensure adequate potassium to improve stress tolerance.",
    timePeriod: "Several weeks; yield protection if controlled at key growth stages."
  },
  "Corn - Common Rust": {
    description: "Fungal disease (Puccinia sorghi) producing reddish-brown pustules on leaves.",
    symptoms: "Small reddish-brown pustules on leaf surface, can coalesce and reduce vigor.",
    stepsToOvercome: "Plant resistant varieties, ensure good field sanitation, fungicide if severe during grain-fill.",
    fertilizerSuggestion: "Balanced N-P-K; avoid excessive nitrogen that can increase susceptibility.",
    timePeriod: "A few weeks; usually controlled within season."
  },
  "Corn - Northern Leaf Blight": {
    description: "Fungal disease (Exserohilum turcicum) causing cigar-shaped lesions that impair photosynthesis.",
    symptoms: "Long gray-green to tan cigar-shaped lesions on leaves, may lead to premature leaf death.",
    stepsToOvercome: "Use resistant hybrids, crop rotation, residue management, apply fungicides at disease onset if needed.",
    fertilizerSuggestion: "Maintain balanced fertility and adequate potassium.",
    timePeriod: "Several weeks to recover; protect yield during critical stages."
  },
  "Corn - Healthy": {
    description: "No disease present; plant is healthy.",
    symptoms: "Green leaves, normal tassel and ear development.",
    stepsToOvercome: "Rotate crops, monitor for pests/diseases, balanced fertilization.",
    fertilizerSuggestion: "N-rich program during vegetative growth; follow soil test.",
    timePeriod: "N/A"
  },

  // Grape
  "Grape - Black Rot": {
    description: "Fungal disease (Guignardia bidwellii) causing dark circular lesions on leaves and black rot on fruit.",
    symptoms: "Small brown leaf spots with black centers; shriveled black fruit (mummies).",
    stepsToOvercome: "Sanitation (remove mummies), canopy management, apply fungicides during growing season, choose resistant cultivars.",
    fertilizerSuggestion: "Balanced fertilizers; avoid excess nitrogen promoting dense canopy.",
    timePeriod: "Weeks to season; repeated sprays often required."
  },
  "Grape - Esca / Black Measles": {
    description: "Complex fungal trunk and wood disease causing leaf symptoms and berry spotting.",
    symptoms: "Interveinal leaf chlorosis or tiger stripe patterns, dark spots on berries, wood discoloration in trunk.",
    stepsToOvercome: "Remove severely affected vines, improve pruning sanitation, avoid wounding, use certified planting material.",
    fertilizerSuggestion: "Maintain balanced nutrition; ensure vine vigor without excessive growth.",
    timePeriod: "Long-term — may be perennial; removal of affected vines often recommended."
  },
  "Grape - Leaf Blight / Isariopsis Leaf Spot": {
    description: "Fungal disease causing circular to irregular leaf spots and defoliation.",
    symptoms: "Small brown spots that may coalesce causing leaf death and reduced photosynthesis.",
    stepsToOvercome: "Canopy management, remove infected tissue, fungicide applications during wet weather.",
    fertilizerSuggestion: "Balanced N-P-K; avoid excess nitrogen that favors disease.",
    timePeriod: "A few weeks to a season depending on control."
  },
  "Grape - Healthy": {
    description: "No disease present; plant is healthy.",
    symptoms: "Healthy foliage and normal fruit set.",
    stepsToOvercome: "Standard vineyard practices: pruning, balanced fertilization, irrigation management.",
    fertilizerSuggestion: "Apply nutrition per vineyard soil and petiole tests.",
    timePeriod: "N/A"
  },

  // Orange
  "Orange - Huanglongbing / Citrus Greening": {
    description: "Bacterial disease (Candidatus Liberibacter spp.) spread by psyllids; causes severe decline in citrus.",
    symptoms: "Yellowing of leaves (blotchy mottle), misshapen small fruit, twig dieback, overall decline.",
    stepsToOvercome: "Remove and destroy infected trees, control psyllid vectors, use certified disease-free nursery stock.",
    fertilizerSuggestion: "Frequent, balanced feeding with micronutrients (including zinc, manganese); follow citrus nutrition program.",
    timePeriod: "Often permanent for infected tree; removal recommended to prevent spread."
  },

  // Peach
  "Peach - Bacterial Spot": {
    description: "Bacterial disease (Xanthomonas campestris pv. pruni) causing spots on leaves and fruit.",
    symptoms: "Small water-soaked spots on leaves and fruit that become dark and scabby; premature leaf drop.",
    stepsToOvercome: "Use disease-free nursery stock, copper sprays at bud break and during wet conditions, prune for airflow.",
    fertilizerSuggestion: "Balanced N-P-K; avoid excess nitrogen during wet periods.",
    timePeriod: "Weeks with copper sprays and sanitation; season-long management."
  },
  "Peach - Healthy": {
    description: "No disease present; plant is healthy.",
    symptoms: "Normal foliage and fruit set.",
    stepsToOvercome: "Good orchard hygiene and nutrient management.",
    fertilizerSuggestion: "Follow soil test recommendations.",
    timePeriod: "N/A"
  },

  // Bell Pepper
  "Bell Pepper - Bacterial Spot": {
    description: "Bacterial disease (Xanthomonas spp.) producing spots on leaves and fruit.",
    symptoms: "Water-soaked spots on leaves and fruit that become necrotic; fruit scarring and reduced quality.",
    stepsToOvercome: "Use certified seed/transplants, crop rotation, copper-based bactericides, remove infected plants, sanitize tools.",
    fertilizerSuggestion: "Balanced N-P-K with adequate calcium to reduce fruit disorders.",
    timePeriod: "Several weeks with sanitation and treatments."
  },
  "Bell Pepper - Healthy": {
    description: "No disease present; plant is healthy.",
    symptoms: "Green healthy leaves and firm fruit.",
    stepsToOvercome: "Good cultural practices and regular scouting.",
    fertilizerSuggestion: "Balanced vegetable fertilizer; calcium supplements if blossom-end rot risk.",
    timePeriod: "N/A"
  },

  // Potato
  "Potato - Early Blight": {
    description: "Fungal disease (Alternaria solani) causing leaf spots and tuber quality loss.",
    symptoms: "Concentric ringed brown leaf spots, defoliation, reduced tuber yield.",
    stepsToOvercome: "Use resistant varieties, rotate crops, remove debris, apply fungicide protectants.",
    fertilizerSuggestion: "Balanced N-P-K; adequate potassium and magnesium to improve tuber health.",
    timePeriod: "Several weeks; season-long management recommended."
  },
  "Potato - Late Blight": {
    description: "Serious oomycete disease (Phytophthora infestans) causing rapid foliar and tuber decay.",
    symptoms: "Water-soaked lesions on leaves that turn brown/black; tuber rot; rapid crop loss in wet conditions.",
    stepsToOvercome: "Rapid removal of infected plants, use certified seed, fungicide programs with protective and systemic products.",
    fertilizerSuggestion: "Balanced fertility; maintain plant vigor but avoid excessive nitrogen.",
    timePeriod: "Days to weeks; rapid action required to limit spread during outbreaks."
  },
  "Potato - Healthy": {
    description: "No disease present; plant is healthy.",
    symptoms: "Vigorous foliage and sound tubers.",
    stepsToOvercome: "Use certified seed tubers, crop rotation, timely fungicide protection where risk exists.",
    fertilizerSuggestion: "Follow soil test; balanced program with emphasis on potassium for tuber quality.",
    timePeriod: "N/A"
  },

  // Raspberry
  "Raspberry - Healthy": {
    description: "No disease present; plant is healthy.",
    symptoms: "Strong canes and healthy fruit.",
    stepsToOvercome: "Prune canes, remove diseased wood, monitor pests and diseases.",
    fertilizerSuggestion: "Balanced fertilizer with emphasis on potassium for fruiting.",
    timePeriod: "N/A"
  },

  // Soybean
  "Soybean - Healthy": {
    description: "No disease present; plant is healthy.",
    symptoms: "Green leaves, normal pod set.",
    stepsToOvercome: "Crop rotation, resistant varieties, scouting.",
    fertilizerSuggestion: "Soybeans fix N; apply P and K per soil test; inoculate seed if needed.",
    timePeriod: "N/A"
  },

  // Squash
  "Squash - Powdery Mildew": {
    description: "Fungal disease causing white powdery patches on leaves and stems (Podosphaera/Erysiphe spp.).",
    symptoms: "White powdery growth on leaf surface, yellowing, leaf curling, reduced vigor and yield.",
    stepsToOvercome: "Provide air flow, remove infected leaves, use resistant varieties, apply fungicides or sulfur sprays.",
    fertilizerSuggestion: "Balanced N-P-K; avoid excess nitrogen which increases susceptibility.",
    timePeriod: "A few weeks with treatment; manage throughout season."
  },

  // Strawberry
  "Strawberry - Leaf Scorch": {
    description: "Bacterial or fungal leaf scorch causing brown lesions and reduced vigor.",
    symptoms: "Marginal browning and scorched appearance on leaves, reduced fruit yield.",
    stepsToOvercome: "Improve drainage, remove affected tissue, apply appropriate fungicide/bactericide.",
    fertilizerSuggestion: "Balanced fertilizer; maintain calcium and potassium for fruit quality.",
    timePeriod: "Several weeks; depends on correct diagnosis and treatment."
  },
  "Strawberry - Healthy": {
    description: "No disease present; plant is healthy.",
    symptoms: "Green leaves, abundant fruit.",
    stepsToOvercome: "Mulch, proper irrigation, balanced feeding.",
    fertilizerSuggestion: "Strawberry-specific balanced fertilizer at recommended timings.",
    timePeriod: "N/A"
  },

  // Tomato diseases
  "Tomato - Bacterial Spot": {
    description: "Bacterial disease (Xanthomonas spp.) causing leaf and fruit lesions.",
    symptoms: "Small dark spots on leaves and fruit, sometimes with yellow halos; defoliation in severe cases.",
    stepsToOvercome: "Use certified seed/seedlings, copper sprays, remove infected plants, crop rotation.",
    fertilizerSuggestion: "Balanced N-P-K; adequate calcium to reduce physiological disorders.",
    timePeriod: "Several weeks with cultural and chemical control."
  },
  "Tomato - Early Blight": {
    description: "Fungal disease (Alternaria solani) causing concentric ringed lesions on leaves and fruit.",
    symptoms: "Brown concentric leaf spots, defoliation, reduced yield.",
    stepsToOvercome: "Use resistant varieties, crop rotation, remove infected debris, apply fungicides protectively.",
    fertilizerSuggestion: "Balanced nutrition; avoid excess nitrogen.",
    timePeriod: "A few weeks to season-long management."
  },
  "Tomato - Late Blight": {
    description: "Oomycete disease (Phytophthora infestans) causing rapid collapse of foliage and fruit rot.",
    symptoms: "Water-soaked lesions on leaves that rapidly turn brown/black; greasy lesions on fruit.",
    stepsToOvercome: "Destroy infected plants promptly, use certified seed, fungicide programs, avoid overhead irrigation.",
    fertilizerSuggestion: "Balanced fertility; maintain plant vigor but avoid excessive nitrogen.",
    timePeriod: "Days to weeks; rapid control necessary."
  },
  "Tomato - Leaf Mold": {
    description: "Fungal disease (Passalora fulva) causing yellowing and olive-green patches on undersides of leaves.",
    symptoms: "Yellow spots on upper leaf surface and olive-green mold on lower surface, leading to defoliation in humid conditions.",
    stepsToOvercome: "Increase ventilation, reduce humidity, remove infected leaves, apply fungicides.",
    fertilizerSuggestion: "Balanced feeding; avoid high nitrogen in humid conditions.",
    timePeriod: "Several weeks with humidity control and sprays."
  },
  "Tomato - Septoria Leaf Spot": {
    description: "Fungal disease (Septoria lycopersici) causing many small circular spots on lower leaves.",
    symptoms: "Numerous small circular spots with dark borders and light centers on lower leaves; defoliation.",
    stepsToOvercome: "Remove lower leaves, rotate crops, apply fungicides, avoid wetting foliage.",
    fertilizerSuggestion: "Balanced N-P-K; maintain plant vigor.",
    timePeriod: "Weeks to season with management."
  },
  "Tomato - Spider Mites / Two-Spotted Spider Mite": {
    description: "Arachnid pest causing stippling and fine webbing leading to leaf bronzing.",
    symptoms: "Tiny stippled or bronzed spots on leaves, fine webbing, leaf drop in severe cases.",
    stepsToOvercome: "Increase humidity, use miticides or insecticidal soaps, introduce natural predators.",
    fertilizerSuggestion: "Balanced nutrition; avoid over-fertilization which can favor mites.",
    timePeriod: "Days to weeks depending on control method."
  },
  "Tomato - Target Spot": {
    description: "Fungal disease (Corynespora cassiicola) producing target-like leaf lesions.",
    symptoms: "Circular to target-shaped brown spots on leaves and fruit; defoliation under heavy pressure.",
    stepsToOvercome: "Remove infected debris, rotate crops, apply fungicides when conditions favor disease.",
    fertilizerSuggestion: "Balanced N-P-K; adequate potassium for stress tolerance.",
    timePeriod: "Several weeks with management."
  },
  "Tomato - Yellow Leaf Curl Virus": {
    description: "Viral disease transmitted by whiteflies causing severe yield loss.",
    symptoms: "Severe leaf curling, yellowing, stunted growth, reduced fruit set.",
    stepsToOvercome: "Use virus-free transplants and resistant varieties, control whitefly vectors, use reflective mulches.",
    fertilizerSuggestion: "Supportive balanced nutrition; no cure for virus itself.",
    timePeriod: "Often permanent for infected plants; remove infected plants to limit spread."
  },
  "Tomato - Mosaic Virus": {
    description: "Viral disease causing mottled leaf patterns and stunting (Tobacco mosaic virus).",
    symptoms: "Mottled/mosaic leaf patterns, distortion, stunted growth and reduced yield.",
    stepsToOvercome: "Use certified virus-free seed/transplants, sanitation, remove infected plants, control insect vectors.",
    fertilizerSuggestion: "Supportive balanced nutrition; no direct cure for virus.",
    timePeriod: "Often permanent for infected plants; remove infected plants."
  },
  "Tomato - Healthy": {
    description: "No disease present; plant is healthy.",
    symptoms: "Green leaves, normal fruit set, vigorous growth.",
    stepsToOvercome: "Good cultural practices and monitoring.",
    fertilizerSuggestion: "Tomato-specific balanced fertilizer; support calcium levels.",
    timePeriod: "N/A"
  },

  // Wheat
  "Wheat - Brown Rust": {
    description: "Fungal rust disease (Puccinia triticina) causing orange-brown pustules on leaves.",
    symptoms: "Small orange-brown pustules mainly on upper leaf surfaces, reduced photosynthesis.",
    stepsToOvercome: "Plant resistant varieties, timely fungicide sprays, destroy volunteer wheat, crop rotation.",
    fertilizerSuggestion: "Balanced fertilization; adequate potassium for disease resistance.",
    timePeriod: "Several weeks to a season depending on control."
  },
  "Wheat - Yellow Rust": {
    description: "Fungal disease (Puccinia striiformis) causing yellow-orange stripes on leaves.",
    symptoms: "Bright yellow-orange pustules in stripes on leaves and leaf sheaths.",
    stepsToOvercome: "Use resistant cultivars, apply fungicides early when rust appears, remove volunteer crops.",
    fertilizerSuggestion: "Balanced N-P-K; avoid excessive nitrogen.",
    timePeriod: "Weeks to season; preventive sprays most effective."
  },
  "Wheat - Healthy": {
    description: "No disease present; plant is healthy.",
    symptoms: "Green healthy leaves, good tillering, strong heads.",
    stepsToOvercome: "Balanced nutrition, disease monitoring, resistant varieties.",
    fertilizerSuggestion: "Soil-based fertilizer recommendations for wheat.",
    timePeriod: "N/A"
  },

  // Rice
  "Rice - Bacterial Leaf Blight": {
    description: "Bacterial disease (Xanthomonas oryzae pv. oryzae) causing leaf drying from tips downward.",
    symptoms: "Water-soaked lesions starting at leaf tips, turning yellow then brown, wilting in severe cases.",
    stepsToOvercome: "Use resistant varieties, avoid overhead irrigation, copper sprays, balanced nitrogen use.",
    fertilizerSuggestion: "Moderate nitrogen, adequate potassium and zinc to enhance resistance.",
    timePeriod: "Weeks to manage; season-long care for full recovery."
  },
  "Rice - Brown Spot": {
    description: "Fungal disease (Bipolaris oryzae) causing brown spots on leaves and reduced yield.",
    symptoms: "Small brown circular spots with gray centers on leaves; seed discoloration.",
    stepsToOvercome: "Use disease-free seed, apply fungicides, balanced fertilization, improve drainage.",
    fertilizerSuggestion: "Add potassium and silicon; balanced N-P-K.",
    timePeriod: "Several weeks with treatment."
  },
  "Rice - Hispa": {
    description: "Insect pest (Dicladispa armigera) feeding on leaf tissue causing damage.",
    symptoms: "Parallel white streaks on leaves due to adult feeding; larvae mine inside leaves.",
    stepsToOvercome: "Remove and destroy infested leaves, use neem or insecticidal sprays, maintain field hygiene.",
    fertilizerSuggestion: "Balanced N-P-K; avoid excessive nitrogen.",
    timePeriod: "Weeks to control population."
  },
  "Rice - Leaf Blast": {
    description: "Fungal disease (Magnaporthe oryzae) causing lesions on leaves and nodes.",
    symptoms: "Spindle-shaped gray lesions with brown margins; can kill leaves and panicles.",
    stepsToOvercome: "Use resistant varieties, avoid high nitrogen, apply triazole or strobilurin fungicides.",
    fertilizerSuggestion: "Balanced fertilizer, adequate potassium and silicon.",
    timePeriod: "Weeks; control early for best results."
  },
  "Rice - Leaf Scald": {
    description: "Fungal disease (Microdochium oryzae) causing leaf tip necrosis and scalded appearance.",
    symptoms: "Elliptical grayish lesions with brown borders, often starting from leaf tip.",
    stepsToOvercome: "Use resistant varieties, maintain balanced nutrition, apply fungicides.",
    fertilizerSuggestion: "Balanced nutrients, potassium and silicon supplementation.",
    timePeriod: "Weeks; with timely fungicide sprays."
  },
  "Rice - Narrow Brown Spot": {
    description: "Fungal disease (Cercospora oryzae) causing narrow brown lesions on leaves and panicles.",
    symptoms: "Narrow dark brown streaks on leaves, can lead to premature senescence.",
    stepsToOvercome: "Use resistant varieties, remove crop residues, apply fungicide.",
    fertilizerSuggestion: "Balanced fertilization; adequate potassium and silicon.",
    timePeriod: "Weeks; managed with season-long care."
  },
  "Rice - Neck Blast": {
    description: "Fungal disease (Magnaporthe oryzae) affecting panicle necks causing grain loss.",
    symptoms: "Blackening and shriveling of panicle neck; panicles remain unfilled.",
    stepsToOvercome: "Apply fungicide at booting stage, use resistant varieties, avoid excess nitrogen.",
    fertilizerSuggestion: "Balanced N-P-K with added potassium.",
    timePeriod: "Weeks; control before heading stage."
  },
  "Rice - Sheath Blight": {
    description: "Fungal disease (Rhizoctonia solani) causing sheath lesions and lodging.",
    symptoms: "Irregular green-gray lesions on lower leaf sheaths spreading upwards.",
    stepsToOvercome: "Improve spacing and drainage, apply fungicides at tillering, rotate crops.",
    fertilizerSuggestion: "Balanced fertilization; avoid heavy nitrogen.",
    timePeriod: "Weeks with management."
  },
  "Rice - Tungro": {
    description: "Viral disease transmitted by green leafhopper (Nephotettix virescens).",
    symptoms: "Stunted plants, orange-yellow discoloration, reduced tillering.",
    stepsToOvercome: "Use resistant varieties, control vector, remove infected plants.",
    fertilizerSuggestion: "Balanced fertilization; zinc and potassium to improve tolerance.",
    timePeriod: "Often permanent; remove infected plants promptly."
  },
  "Rice - Healthy": {
    description: "No disease present; plant is healthy.",
    symptoms: "Green vigorous growth and healthy panicles.",
    stepsToOvercome: "Maintain balanced fertilization, timely irrigation, pest monitoring.",
    fertilizerSuggestion: "Soil test-based fertilization; balanced N-P-K with micronutrients.",
    timePeriod: "N/A"
  }
};

  

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result);
      };
      reader.readAsDataURL(file);
      setResult(null);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      setError('Please select an image first.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedImage);

      const response = await axios.post(
        `${BACKENDURL}/predict/disease`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setResult(response.data);
    } catch (err) {
      setError('Error analyzing image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Get disease information for the result
  const getDiseaseInfo = (prediction) => {
    return diseaseDatabase[prediction] || {
      description: "Detailed information not available for this condition.",
      symptoms: "Please consult agricultural experts for specific symptoms.",
      stepsToOvercome: "Follow general plant health practices and consult local agricultural extension services.",
      fertilizerSuggestion: "Use balanced fertilizer appropriate for the plant type.",
      timePeriod: "Varies depending on severity and treatment approach."
    };
  };

  const diseaseInfo = result ? getDiseaseInfo(result.prediction) : null;

  return (
    <div className="page disease-page">
      <h1>🍃 Crop Disease Detection System 🔍</h1>
      <p>Upload a plant leaf image for AI-powered disease detection with detailed treatment guidance.</p>

      <form onSubmit={handleSubmit} className="disease-form">
        <div className="upload-section">
          <div className="file-upload">
            <label htmlFor="image-upload" className="file-upload-label">
              📤 Upload a Plant Leaf Image
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="file-input"
            />
          </div>

          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
            </div>
          )}

          <button 
            type="submit" 
            disabled={!selectedImage || loading}
            className="btn btn-primary"
          >
            {loading ? '🚀 Analyzing...' : '🚀 Analyze Disease'}
          </button>
        </div>
      </form>

      {error && <div className="alert alert-error">{error}</div>}

      {result && (
        <div className="result-section">
          <div className={`alert ${result.is_healthy ? 'alert-success' : 'alert-error'}`}>
            <h3>
              {result.is_healthy 
                ? `🎉 The ${result.plant.toLowerCase()} plant appears Healthy ✅`
                : `⚠️ Detected: ${result.disease} in ${result.plant.toLowerCase()} plant!`
              }
            </h3>
            <p>Confidence: {(result.confidence * 100).toFixed(1)}%</p>
            
            <div className="diagnosis-card">
              <h4>🌿 Plant:</h4> <b>{result.plant}</b>
              <h4>🧬 Condition:</h4> <b>{result.disease}</b>
            </div>
          </div>

          {/* Detailed Disease Information */}
          {diseaseInfo && (
            <div className="disease-details">
              <h3>📋 Detailed Disease Information & Treatment Guide</h3>
              
              <div className="details-grid">
                <div className="detail-card">
                  <h4>🔍 Description</h4>
                  <p>{diseaseInfo.description}</p>
                </div>

                <div className="detail-card">
                  <h4>🩺 Symptoms</h4>
                  <p>{diseaseInfo.symptoms}</p>
                </div>

                <div className="detail-card">
                  <h4>🛠️ Steps to Overcome</h4>
                  <p>{diseaseInfo.stepsToOvercome}</p>
                </div>

                <div className="detail-card">
                  <h4>🌱 Fertilizer Suggestion</h4>
                  <p>{diseaseInfo.fertilizerSuggestion}</p>
                </div>

                <div className="detail-card">
                  <h4>⏱️ Time Period</h4>
                  <p>{diseaseInfo.timePeriod}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="page-footer">
        <p>Model: Convolutional Neural Network | Accuracy: 98% | developed with ❤️ by Uday</p>
      </div>
    </div>
  );
};

export default DiseaseDetection;
