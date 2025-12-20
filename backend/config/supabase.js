import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Ensure environment variables are loaded
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Supabase credentials missing!");
  console.error("SUPABASE_URL:", !!supabaseUrl);
  console.error("SUPABASE_KEY:", !!supabaseKey);
  throw new Error(
    "Supabase configuration is missing. Please set SUPABASE_URL and SUPABASE_SERVICE_KEY in your .env file"
  );
}

const supabase = createClient(supabaseUrl, supabaseKey);

console.log("✅ Supabase client initialized");

export default supabase;
