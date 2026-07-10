export * from "./types";
export * from "./supabase";

// Simple sentinel used to verify the shared workspace package links correctly
// from both apps/web and apps/native.
export const SHARED_PACKAGE_NAME = "@lodeayer/shared";
