import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ChatService } from './chatService';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  async getAllChatMessages(
    @Query('senderEmail') senderId: string,
    @Query('receiverEmail') receiverId: string,
  ): Promise<any[]> {
    return this.chatService.getAllChatMessages(senderId, receiverId);
  }
  

  @Post()
  async createChatMessage(@Body() messageData: { senderEmail: string, receiverEmail: string, messageContent: string }): Promise<any> {
    return this.chatService.createChatMessage(messageData);
  }
}
