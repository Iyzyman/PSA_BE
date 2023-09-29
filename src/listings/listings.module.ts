import { Module } from '@nestjs/common';
import { ListingsController } from './listings.controller';
import { ListingsService } from './listings.service';
import { SupaMod } from 'src/supabase/SupaMod';

@Module({
  imports: [SupaMod],
  controllers: [ListingsController],
  providers: [ListingsService],
})
export class ListingsModule {}