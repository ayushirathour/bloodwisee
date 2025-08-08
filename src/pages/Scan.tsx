import React, { useState } from 'react';
import { useAuth } from '../utils/AuthContext';
import { supabase, PredictionData, PredictionResponse } from '../utils/supabase';
import { toast } from 'react-hot-toast';

interface ScanFormData {
  hemoglobin: string;
  mch: string;
  mchc: string;
  mcv: string;
}

const Scan: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<ScanFormData>({
    hemoglobin: '',
    mch: '',
    mchc: '',
    mcv: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);

  if (!user) {
    return (
      <div className="min-h-screen bg-sleep-soft dark:bg-sleep-dark flex items-center justify-center">
        <div className="card max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold text-sleep-text dark:text-white mb-4">
            Authentication Required
          </h2>
          <p className="text-sleep-text/70 dark:text-white/70 mb-6">
            Please sign in to access the blood test analysis.
          </p>
          <a href="/login" className="btn-primary">
            Sign In
          </a>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Enhanced input validation with ranges
  const validateInputRanges = (values: { hemoglobin: number; mch: number; mchc: number; mcv: number }) => {
    const validations = [
      { field: 'hemoglobin', value: values.hemoglobin, min: 0, max: 30, name: 'Hemoglobin' },
      { field: 'mch', value: values.mch, min: 0, max: 50, name: 'MCH' },
      { field: 'mchc', value: values.mchc, min: 0, max: 50, name: 'MCHC' },
      { field: 'mcv', value: values.mcv, min: 0, max: 150, name: 'MCV' }
    ];

    for (const validation of validations) {
      if (validation.value < validation.min || validation.value > validation.max) {
        toast.error(`${validation.name} must be between ${validation.min} and ${validation.max}`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setPrediction(null);

    try {
      const { hemoglobin, mch, mchc, mcv } = formData;
      
      if (!hemoglobin || !mch || !mchc || !mcv) {
        toast.error('Please fill in all fields');
        setIsSubmitting(false);
        return;
      }

      const numericValues = {
        hemoglobin: parseFloat(hemoglobin),
        mch: parseFloat(mch),
        mchc: parseFloat(mchc),
        mcv: parseFloat(mcv)
      };

      if (Object.values(numericValues).some(val => isNaN(val))) {
        toast.error('Please enter valid numeric values');
        setIsSubmitting(false);
        return;
      }

      // Enhanced input validation
      if (!validateInputRanges(numericValues)) {
        setIsSubmitting(false);
        return;
      }

      // Enhanced API call with CORS support and environment variable
      const apiUrl = process.env.REACT_APP_API_URL || 'https://anemia-web.onrender.com';
      const response = await fetch(`${apiUrl}/predict`, {
        method: 'POST',
        mode: 'cors', // ✅ Added CORS mode
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json' // ✅ Added Accept header
        },
        body: JSON.stringify({
          Hemoglobin: numericValues.hemoglobin,
          Mean_Corpuscular_Hemoglobin: numericValues.mch,
          Mean_Corpuscular_Hemoglobin_Concentration: numericValues.mchc,
          Mean_Corpuscular_Volume: numericValues.mcv
        })
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unknown error');
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      setPrediction(result);
      
      // Store in Supabase with enhanced error handling
      const predictionData: PredictionData = {
        user_id: user.id,
        hemoglobin: numericValues.hemoglobin,
        mch: numericValues.mch,
        mchc: numericValues.mchc,
        mcv: numericValues.mcv,
        prediction_result: result.prediction,
        confidence_score: result.confidence || 0.85
      };

      const { error } = await supabase
        .from('predictions')
        .insert([predictionData]);

      if (error) {
        console.error('Error saving prediction:', error);
        toast.error('Failed to save prediction to database');
      } else {
        toast.success('Analysis completed successfully!');
      }
      
    } catch (error: any) {
      console.error('Prediction error:', error);
      
      // Enhanced error handling for specific scenarios
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        toast.error('Network error: Unable to connect to analysis server');
      } else if (error.message.includes('CORS')) {
        toast.error('Connection blocked. Please try again.');
      } else if (error.message.includes('API Error: 500')) {
        toast.error('Server processing error. Please check your input values.');
      } else if (error.message.includes('API Error: 404')) {
        toast.error('Analysis service not found. Please try again later.');
      } else {
        toast.error('Analysis failed. Please try again or contact support.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      hemoglobin: '',
      mch: '',
      mchc: '',
      mcv: '',
    });
    setPrediction(null);
  };

  return (
    <div className="min-h-screen bg-sleep-soft dark:bg-sleep-dark py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-sleep-text dark:text-white mb-4">
            Blood Test Analysis
          </h1>
          <p className="text-lg text-sleep-text/70 dark:text-white/70">
            Enter your blood test results to get an anemia risk prediction
          </p>
        </div>

        <div className="card max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className={`grid md:grid-cols-2 gap-6 ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}>
              <div>
                <label htmlFor="hemoglobin" className="block text-sm font-medium text-sleep-text dark:text-white mb-2">
                  Hemoglobin (g/dL)
                </label>
                <input
                  type="number"
                  id="hemoglobin"
                  name="hemoglobin"
                  value={formData.hemoglobin}
                  onChange={handleInputChange}
                  step="0.1"
                  min="0"
                  max="30"
                  className="input-field"
                  placeholder="e.g., 14.2"
                  required
                />
                <p className="text-xs text-sleep-text/60 dark:text-white/60 mt-1">
                  Normal range: 12-16 g/dL
                </p>
              </div>

              <div>
                <label htmlFor="mch" className="block text-sm font-medium text-sleep-text dark:text-white mb-2">
                  MCH - Mean Corpuscular Hemoglobin (pg)
                </label>
                <input
                  type="number"
                  id="mch"
                  name="mch"
                  value={formData.mch}
                  onChange={handleInputChange}
                  step="0.1"
                  min="0"
                  max="50"
                  className="input-field"
                  placeholder="e.g., 28.5"
                  required
                />
                <p className="text-xs text-sleep-text/60 dark:text-white/60 mt-1">
                  Normal range: 27-32 pg
                </p>
              </div>

              <div>
                <label htmlFor="mchc" className="block text-sm font-medium text-sleep-text dark:text-white mb-2">
                  MCHC - Mean Corpuscular Hemoglobin Concentration (g/dL)
                </label>
                <input
                  type="number"
                  id="mchc"
                  name="mchc"
                  value={formData.mchc}
                  onChange={handleInputChange}
                  step="0.1"
                  min="0"
                  max="50"
                  className="input-field"
                  placeholder="e.g., 32.5"
                  required
                />
                <p className="text-xs text-sleep-text/60 dark:text-white/60 mt-1">
                  Normal range: 32-36 g/dL
                </p>
              </div>

              <div>
                <label htmlFor="mcv" className="block text-sm font-medium text-sleep-text dark:text-white mb-2">
                  MCV - Mean Corpuscular Volume (fL)
                </label>
                <input
                  type="number"
                  id="mcv"
                  name="mcv"
                  value={formData.mcv}
                  onChange={handleInputChange}
                  step="0.1"
                  min="0"
                  max="150"
                  className="input-field"
                  placeholder="e.g., 88.5"
                  required
                />
                <p className="text-xs text-sleep-text/60 dark:text-white/60 mt-1">
                  Normal range: 80-100 fL
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Analyzing...
                  </div>
                ) : (
                  'Analyze Blood Test'
                )}
              </button>
              
              <button
                type="button"
                onClick={resetForm}
                className="btn-secondary flex-1"
                disabled={isSubmitting}
              >
                Reset Form
              </button>
            </div>
          </form>

          {/* Prediction Result */}
          {prediction && (
            <div className="mt-8 p-6 bg-gradient-to-r from-sleep-blue/10 to-sleep-lavender/10 rounded-lg border border-sleep-blue/20">
              <h3 className="text-lg font-semibold text-sleep-text dark:text-white mb-2">
                {prediction.prediction === 'Healthy' ? '✅ Analysis Complete' : '⚠️ Attention Required'}
              </h3>
              <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                prediction.prediction === 'Healthy' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}>
                {prediction.prediction}
              </div>
              {prediction.confidence && (
                <div className="mt-2 text-sm text-sleep-text/70 dark:text-white/70">
                  Confidence: {typeof prediction.confidence === 'string' 
                    ? prediction.confidence 
                    : `${(prediction.confidence * 100).toFixed(1)}%`}
                </div>
              )}
              <p className="text-sm text-sleep-text/70 dark:text-white/70 mt-3">
                {prediction.prediction === 'Healthy' 
                  ? 'Based on your blood test values, no anemia indicators were detected.'
                  : 'Based on your blood test values, potential anemia indicators were detected. Please consult with a healthcare professional.'}
              </p>
              <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p className="text-xs text-yellow-800 dark:text-yellow-200">
                  ⚠️ Important: This is a preliminary assessment for educational purposes only.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Information Cards */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-sleep-text dark:text-white mb-4">
              Understanding Your Tests
            </h3>
            <div className="space-y-3 text-sm text-sleep-text/70 dark:text-white/70">
              <p><strong>Hemoglobin:</strong> Oxygen-carrying protein in blood</p>
              <p><strong>MCH:</strong> Average hemoglobin per red blood cell</p>
              <p><strong>MCHC:</strong> Average hemoglobin concentration</p>
              <p><strong>MCV:</strong> Average red blood cell size</p>
            </div>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold text-sleep-text dark:text-white mb-4">
              AI Technology
            </h3>
            <div className="space-y-3 text-sm text-sleep-text/70 dark:text-white/70">
              <p>Our ML model analyzes 24 biomarkers using your 4 key inputs for comprehensive anemia assessment.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scan;
