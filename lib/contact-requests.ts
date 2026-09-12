import 'server-only';

import { createClient } from '@supabase/supabase-js';
import { getSupabasePublicConfig } from '@/lib/supabase/config';

export interface ContactRequestInput {
  name: string;
  email: string;
  company: string;
  website: string;
  industry: string;
  timeline: string;
  message: string;
}

export interface ContactRequest extends ContactRequestInput {
  id: string;
  created_at: string;
  status: 'new' | 'handled';
}

export type StoreContactRequestResult =
  | { configured: false; stored: false }
  | { configured: true; stored: true }
  | { configured: true; stored: false; reason: string };

export async function storeContactRequest(
  request: ContactRequestInput,
): Promise<StoreContactRequestResult> {
  const config = getSupabasePublicConfig();
  const secretKey = process.env.SUPABASE_SECRET_KEY?.trim();

  if (!config || !secretKey) {
    return { configured: false, stored: false };
  }

  const supabase = createClient(config.url, secretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });

  try {
    const { error } = await supabase.from('contact_requests').insert({
      ...request,
      website: request.website || null,
    });

    if (error) {
      console.error('Unable to store contact request.', {
        code: error.code,
        message: error.message,
      });
      return { configured: true, stored: false, reason: error.code };
    }

    return { configured: true, stored: true };
  } catch (error) {
    console.error('Unable to reach contact request storage.', {
      message: error instanceof Error ? error.message : 'Unknown storage error',
    });
    return { configured: true, stored: false, reason: 'storage_unavailable' };
  }
}
