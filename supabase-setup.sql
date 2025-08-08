-- Create predictions table
CREATE TABLE IF NOT EXISTS predictions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  hemoglobin DECIMAL(5,2) NOT NULL,
  mch DECIMAL(5,2) NOT NULL,
  mchc DECIMAL(5,2) NOT NULL,
  mcv DECIMAL(5,2) NOT NULL,
  prediction_result TEXT NOT NULL,
  confidence_score DECIMAL(5,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_predictions_user_id ON predictions(user_id);
CREATE INDEX IF NOT EXISTS idx_predictions_created_at ON predictions(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE predictions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to only see their own predictions
CREATE POLICY "Users can view their own predictions" ON predictions
  FOR SELECT USING (auth.uid() = user_id);

-- Create policy to allow users to insert their own predictions
CREATE POLICY "Users can insert their own predictions" ON predictions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to update their own predictions
CREATE POLICY "Users can update their own predictions" ON predictions
  FOR UPDATE USING (auth.uid() = user_id);

-- Create policy to allow users to delete their own predictions
CREATE POLICY "Users can delete their own predictions" ON predictions
  FOR DELETE USING (auth.uid() = user_id);
