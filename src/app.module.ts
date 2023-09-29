import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupaMod } from './supabase/SupaMod';
@Module({
  imports: [SupaMod],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
