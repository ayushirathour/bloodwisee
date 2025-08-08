# BloodWise - AI-Powered Anemia Detection

A sleep-themed React application that uses AI to predict anemia risk based on blood test parameters. Built with TypeScript, Tailwind CSS, and Supabase authentication.

## 🚀 Features

- **AI-Powered Analysis**: ML model analyzes 24 biomarkers using 4 key blood test values
- **Supabase Authentication**: Secure email/password authentication
- **Prediction Storage**: Save and track your prediction history
- **Sleep-Inspired Design**: Calming, medical-themed UI with dark/light mode
- **Mobile Responsive**: Works perfectly on all devices
- **Real-time API**: Connected to hosted ML model on Render

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **API**: Render-hosted ML model (`https://anemia-web.onrender.com`)
- **Notifications**: React Hot Toast
- **Routing**: React Router DOM

## 📁 Project Structure

```
bloodwise/
├── src/
│   ├── components/
│   │   └── Navigation.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Scan.tsx
│   │   ├── About.tsx
│   │   └── Login.tsx
│   ├── utils/
│   │   ├── AuthContext.tsx
│   │   ├── ThemeContext.tsx
│   │   └── supabase.ts
│   ├── App.tsx
│   ├── index.tsx
│   └── index.css
├── public/
│   └── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── supabase-setup.sql
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Supabase account

### Installation

1. **Clone and navigate to the project**
   ```bash
   cd bloodwise
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new Supabase project at [supabase.com](https://supabase.com)
   - Go to SQL Editor and run the `supabase-setup.sql` script
   - Get your project URL and anon key from Settings > API

4. **Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_SUPABASE_URL=your_supabase_project_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
   REACT_APP_API_URL=https://anemia-web.onrender.com
   ```

5. **Start development server**
   ```bash
   npm start
   ```

## 🗄️ Database Schema

### Predictions Table
```sql
CREATE TABLE predictions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  hemoglobin DECIMAL(5,2) NOT NULL,
  mch DECIMAL(5,2) NOT NULL,
  mchc DECIMAL(5,2) NOT NULL,
  mcv DECIMAL(5,2) NOT NULL,
  prediction_result TEXT NOT NULL,
  confidence_score DECIMAL(5,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🔧 API Integration

The application connects to a hosted ML model on Render:
- **Endpoint**: `https://anemia-web.onrender.com/predict`
- **Method**: POST
- **Input**: JSON with Hemoglobin, MCH, MCHC, MCV values
- **Output**: Prediction result with confidence score

## 📱 Pages

### Home (`/`)
- Calming hero section with tagline "Check your health, sleep easy."
- Features section highlighting AI technology
- Authentication-aware CTAs

### Scan (`/scan`)
- **Secure page requiring authentication**
- Form with 4 blood test inputs:
  - Hemoglobin (g/dL)
  - MCH - Mean Corpuscular Hemoglobin (pg)
  - MCHC - Mean Corpuscular Hemoglobin Concentration (g/dL)
  - MCV - Mean Corpuscular Volume (fL)
- Real-time prediction results from Render API
- Form validation and loading states

### About (`/about`)
- Information about anemia and early detection
- How BloodWise works (3-step process)
- Developer credits (Ayushi Rathour)
- Medical disclaimer

### Login (`/login`)
- Sign up and login forms
- Supabase authentication
- Redirects to `/scan` after login

## 🎨 Design Features

- **Sleep-Inspired Colors**: Soft blues, lavender, purples
- **Dark/Light Mode**: Toggle between themes
- **Mobile Responsive**: Adaptive design for all screen sizes
- **Loading States**: Smooth loading animations
- **Toast Notifications**: User feedback for all actions
- **Accessible**: WCAG compliant design

## 🚀 Deployment

### Deploy to Netlify

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   # Create GitHub repository and push
   ```

2. **Deploy on Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Set build settings:
     - **Build command**: `npm run build`
     - **Publish directory**: `build`
   - Add environment variables in Netlify dashboard

### Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Add environment variables** in Vercel dashboard

## 🔒 Security Notes

- All API calls use HTTPS
- Supabase provides enterprise-grade security
- Row Level Security (RLS) protects user data
- Environment variables keep secrets secure

## ⚠️ Important Disclaimer

**This is an educational tool, not a medical device.**

BloodWise provides preliminary assessments for educational purposes only. Always consult with qualified healthcare professionals for:

- Medical diagnosis
- Treatment decisions
- Health advice
- Emergency situations

The predictions should not replace professional medical evaluation.

## 👩‍💻 Developer

**Ayushi Rathour**
- Created the ML model and API
- Designed the user interface
- Implemented the full-stack solution

## 📄 License

This project is licensed under the MIT License.

---

*Built with ❤️ for better health awareness*
