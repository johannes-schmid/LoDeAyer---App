"use client";
import { createClient } from "@/lib/supabase/client";

export default function SignInButton({ next, className, children }: { next: string; className?: string; children: React.ReactNode }) {
  async function handleClick() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback?next=${next}` },
    });
  }

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
