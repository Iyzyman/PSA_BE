import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  
  import { Socket, Server } from 'socket.io';
  import { ChatService } from './chat/chat.service';
  
  
  @WebSocketGateway({
    cors: {
      origin: '*',
    },
  })
  export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
  {
    constructor(private chatService: ChatService) {}
  
    @WebSocketServer() server: Server;
  
    @SubscribeMessage('sendMessage')
    async handleSendMessage(client: Socket, messageData: { senderEmail: string, receiverEmail: string, messageContent: string }): Promise<void> {
      console.log(messageData);
      await this.chatService.createChatMessage(messageData);
      this.server.emit('recMessage', messageData);
    }
  
    afterInit(server: Server) {
      console.log(server);
    }
  
    handleDisconnect(client: Socket) {
      console.log(`Disconnected: ${client.id}`);
    }
  
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleConnection(client: Socket, ...args: any[]) {
      console.log(`Connected ${client.id}`);
    }
  }