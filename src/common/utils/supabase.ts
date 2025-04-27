import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';
import { Request } from 'express';

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!,
);

export const supabaseWithToken = (req: Request) => {
  const authHeader = req.headers.authorization;

  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: authHeader ?? '',
        },
      },
    },
  );
};
