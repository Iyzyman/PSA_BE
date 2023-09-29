import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupaMod } from './supabase/SupaMod';
import { ChatModule } from './chat/chat.module';
import { ListingsModule } from './listings/listings.module';
@Module({
  imports: [SupaMod,ChatModule,ListingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
