import { Module } from '@nestjs/common';
import { ChatController } from './chatController';
import { ChatService } from './chatService';
import { SupaMod } from 'src/supabase/SupaMod';

@Module({
  imports: [SupaMod],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}