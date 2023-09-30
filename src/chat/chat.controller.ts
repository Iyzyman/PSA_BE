import { Controller, Get, Post, Body, Query} from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('/api/v1/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  async getAllChatMessages(
    @Query('senderEmail') senderEmail: string,
    @Query('receiverEmail') receiverEmail: string,
    @Query('listingId') listingId: number,
  ): Promise<any[]> {
    return this.chatService.getAllChatMessages(senderEmail, receiverEmail,listingId);
  }
  

  @Post()
  async createChatMessage(@Body() messageData: { senderEmail: string, receiverEmail: string, messageContent: string }): Promise<any> {
    return this.chatService.createChatMessage(messageData);
  }
  @Get('list')
  async getChatList(
    @Query('Email') Email: string,
  ): Promise<any[]> {
    return this.chatService.getChatList(Email);
  }
}
