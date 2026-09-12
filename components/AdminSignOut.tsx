'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

export function AdminSignOut() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  async function signOut() {
    setSubmitting(true);

    try {
      const supabase = createSupabaseBrowserClient();
      await supabase.auth.signOut();
    } finally {
      router.replace('/myrequest/login');
      router.refresh();
    }
  }

  return (
    <button type="button" className="admin-inbox__signout" onClick={signOut} disabled={submitting}>
      {submitting ? 'Signing out…' : 'Sign out'}
    </button>
  );
}
