import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { SupaMod } from 'src/supabase/SupaMod';


@Module({
  imports: [SupaMod],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}