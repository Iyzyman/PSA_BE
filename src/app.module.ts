import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupaMod } from './supabase/SupaMod';
import { ChatModule } from './chat/chatModule';
@Module({
  imports: [SupaMod,ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
