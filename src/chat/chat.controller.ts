import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  async getAllChatMessages(
    @Query('senderEmail') senderEmail: string,
    @Query('receiverEmail') receiverEmail: string,
  ): Promise<any[]> {
    return this.chatService.getAllChatMessages(senderEmail, receiverEmail);
  }
  

  @Post()
  async createChatMessage(@Body() messageData: { senderEmail: string, receiverEmail: string, messageContent: string }): Promise<any> {
    return this.chatService.createChatMessage(messageData);
  }
}
