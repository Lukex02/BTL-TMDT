import { Module } from '@nestjs/common';
import { SupabaseProvider } from './supabase.provider';

@Module({
  providers: [SupabaseProvider],
  exports: ['SUPABASE_CLIENT'],
})
export class SupabaseModule {}
