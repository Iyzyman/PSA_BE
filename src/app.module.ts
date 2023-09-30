import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupaMod } from './supabase/SupaMod';
import { ChatModule } from './chat/chat.module';
import { ListingsModule } from './listings/listings.module';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat/chat.service';
import { ChatController } from './chat/chat.controller';
@Module({
  imports: [SupaMod,ChatModule,ListingsModule],
  controllers: [AppController,ChatController],
  providers: [AppService,ChatGateway,ChatService],
})
export class AppModule {}
