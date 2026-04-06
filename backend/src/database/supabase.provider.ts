import { createClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

export const SupabaseProvider = {
  provide: 'SUPABASE_CLIENT',
  useFactory: (config: ConfigService) => {
    return createClient(
      config.get<string>('SUPABASE_URI')!,
      config.get<string>('SUPABASE_PUBLISHABLE_KEY')!,
    );
  },
  inject: [ConfigService],
};
