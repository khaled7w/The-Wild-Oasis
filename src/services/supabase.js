import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://lywipqykyfdyflnjlsys.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5d2lwcXlreWZkeWZsbmpsc3lzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMzNDUxMjAsImV4cCI6MjAyODkyMTEyMH0.noiuXFLljha4BzldkQN8TIBB96pfBmukz-lm52LNtAA';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
