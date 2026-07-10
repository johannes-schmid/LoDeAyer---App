import { createClient, type SupabaseClientOptions } from "@supabase/supabase-js";

// Platform-agnostic Supabase client factory.
// Web passes standard options; native passes AsyncStorage + { detectSessionInUrl: false }.
export function createSupabaseClient(
  url: string,
  anonKey: string,
  options?: SupabaseClientOptions<"public">,
) {
  if (!url || !anonKey) {
    throw new Error("createSupabaseClient: missing Supabase url or anon key");
  }
  return createClient(url, anonKey, options);
}

export type { SupabaseClient } from "@supabase/supabase-js";
