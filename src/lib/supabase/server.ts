import { createClient } from "@supabase/supabase-js";

// Server-side admin client (full permissions)
// Only use in API routes — NEVER expose to client
function createAdminClient() {
  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { persistSession: false } }
    );
  }
  return null;
}

export const supabaseAdmin = createAdminClient();
