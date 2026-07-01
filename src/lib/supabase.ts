import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Property = {
  id: string;
  created_at: string;
  title: string;
  region: string;
  size_m2: number;
  rooms: number;
  description: string;
  cover_photo: string | null;
  photos: string[];
};
