import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-sleep-soft dark:bg-sleep-dark py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-sleep-text dark:text-white mb-4">
            About BloodWise
          </h1>
          <p className="text-lg text-sleep-text/70 dark:text-white/70 max-w-2xl mx-auto">
            Empowering individuals with early anemia detection through advanced AI technology
          </p>
        </div>

        {/* Mission Section */}
        <div className="card mb-12">
          <h2 className="text-2xl font-bold text-sleep-text dark:text-white mb-4">
            Our Mission
          </h2>
          <p className="text-sleep-text/70 dark:text-white/70 mb-4">
            BloodWise was created to make anemia detection accessible, accurate, and stress-free. 
            We believe that early detection of health issues should be simple and calming, not overwhelming.
          </p>
          <p className="text-sleep-text/70 dark:text-white/70">
            Our sleep-inspired design reflects our commitment to providing a peaceful, 
            non-intimidating experience for health screening.
          </p>
        </div>

        {/* Understanding Anemia */}
        <div className="card mb-12">
          <h2 className="text-2xl font-bold text-sleep-text dark:text-white mb-6">
            Understanding Anemia
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-sleep-text dark:text-white mb-3">
                What is Anemia?
              </h3>
              <p className="text-sleep-text/70 dark:text-white/70 mb-4">
                Anemia is a condition where your blood lacks enough healthy red blood cells 
                or hemoglobin to carry adequate oxygen to your body's tissues.
              </p>
              <p className="text-sleep-text/70 dark:text-white/70">
                It can cause fatigue, weakness, shortness of breath, and other symptoms 
                that significantly impact quality of life.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-sleep-text dark:text-white mb-3">
                Why Early Detection Matters
              </h3>
              <ul className="space-y-2 text-sleep-text/70 dark:text-white/70">
                <li>• Prevents complications and worsening symptoms</li>
                <li>• Enables timely treatment and lifestyle changes</li>
                <li>• Improves overall health outcomes</li>
                <li>• Reduces healthcare costs in the long term</li>
              </ul>
            </div>
          </div>
        </div>

        {/* How BloodWise Works */}
        <div className="card mb-12">
          <h2 className="text-2xl font-bold text-sleep-text dark:text-white mb-6">
            How BloodWise Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-sleep-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-sleep-blue font-bold">1</span>
              </div>
              <h3 className="font-semibold text-sleep-text dark:text-white mb-2">
                Enter Your Values
              </h3>
              <p className="text-sm text-sleep-text/70 dark:text-white/70">
                Input your blood test results for Hemoglobin, MCH, MCHC, and MCV
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-sleep-lavender/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-sleep-lavender font-bold">2</span>
              </div>
              <h3 className="font-semibold text-sleep-text dark:text-white mb-2">
                AI Analysis
              </h3>
              <p className="text-sm text-sleep-text/70 dark:text-white/70">
                Our ML model analyzes 24 biomarkers using your 4 key inputs
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-sleep-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-sleep-purple font-bold">3</span>
              </div>
              <h3 className="font-semibold text-sleep-text dark:text-white mb-2">
                Get Results
              </h3>
              <p className="text-sm text-sleep-text/70 dark:text-white/70">
                Receive instant, accurate prediction with confidence scores
              </p>
            </div>
          </div>
        </div>

        {/* Technology */}
        <div className="card mb-12">
          <h2 className="text-2xl font-bold text-sleep-text dark:text-white mb-4">
            Advanced Technology
          </h2>
          <p className="text-sleep-text/70 dark:text-white/70 mb-4">
            BloodWise uses state-of-the-art machine learning algorithms trained on extensive 
            medical datasets to provide accurate anemia risk assessments.
          </p>
          <p className="text-sleep-text/70 dark:text-white/70">
            Our model analyzes 24 different biomarkers, creating a comprehensive picture 
            of your blood health from just 4 key measurements.
          </p>
        </div>

        {/* Credits */}
        <div className="card mb-12">
          <h2 className="text-2xl font-bold text-sleep-text dark:text-white mb-4">
            Developer Credits
          </h2>
          <div className="bg-gradient-to-r from-sleep-blue/10 to-sleep-lavender/10 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-sleep-text dark:text-white mb-2">
              Created by Ayushi Rathour
            </h3>
            <p className="text-sleep-text/70 dark:text-white/70">
              This project represents the intersection of healthcare technology and user experience design, 
              demonstrating how AI can make health screening more accessible and less intimidating.
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="card border-2 border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20">
          <h2 className="text-xl font-bold text-yellow-800 dark:text-yellow-200 mb-4">
            ⚠️ Important Medical Disclaimer
          </h2>
          <p className="text-yellow-800 dark:text-yellow-200 mb-4">
            <strong>This is an educational tool, not a medical device.</strong>
          </p>
          <div className="space-y-2 text-sm text-yellow-800 dark:text-yellow-200">
            <p>• BloodWise provides preliminary assessments for educational purposes only</p>
            <p>• Results should not replace professional medical evaluation</p>
            <p>• Always consult with qualified healthcare professionals for diagnosis and treatment</p>
            <p>• Do not make medical decisions based solely on this tool</p>
            <p>• In case of emergency, contact emergency services immediately</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
