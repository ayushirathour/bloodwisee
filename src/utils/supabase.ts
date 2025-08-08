import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://tdxasfchtaolvjybnjca.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'your_actual_anon_key_here';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type AuthUser = {
  id: string;
  email: string;
  created_at: string;
};

export type AuthError = {
  message: string;
};

// Prediction types for database storage
export interface PredictionData {
  id?: string;
  user_id: string;
  hemoglobin: number;
  mch: number;
  mchc: number;
  mcv: number;
  prediction_result: string;
  confidence_score?: number;
  created_at?: string;
}

export interface PredictionResponse {
  prediction: string;
  confidence?: number;
  message?: string;
}

export type Prediction = {
  id: string;
  user_id: string;
  hemoglobin: number;
  mch: number;
  mchc: number;
  mcv: number;
  prediction_result: string;
  confidence_score: number;
  created_at: string;
};
