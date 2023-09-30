import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { SupaMod } from 'src/supabase/SupaMod';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [SupaMod],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}