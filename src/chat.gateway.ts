import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  
  import { Socket, Server } from 'socket.io';
 
  
  @WebSocketGateway({
    cors: {
      origin: '*',
    },
  })
 
  export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
  {
    constructor() {}
  
    @WebSocketServer() server: Server;
    private readonly userSockets = new Map<string, Socket>();
  
    @SubscribeMessage('sendMessage')
    async handleSendMessage(client: Socket, messageData: { senderEmail: string, receiverEmail: string, messageContent: string }): Promise<void> {
      // Handle the message.
      const { senderEmail, receiverEmail } = messageData;
    
      // Check if the recipient's socket is available.
      const recipientSocket = this.userSockets.get(receiverEmail);
      const senderSocket = this.userSockets.get(senderEmail);
    
      if (recipientSocket) {
        // Emit the message to the recipient's WebSocket connection.
        recipientSocket.emit('recMessage', messageData);
      }
    
      if (senderSocket) {
        // Emit the message back to the sender's WebSocket connection.
        senderSocket.emit('recMessage', messageData);
      }
    
      // You can also save the message to your database here.
    }
    
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      afterInit(server: Server) {
        // This method is called after the WebSocket server has been initialized.
        console.log('WebSocket server initialized.');
        // You can perform any additional initialization logic here.
      }
    handleDisconnect(client: Socket) {
        // Handle a disconnection.
        const email = this.findUserEmail(client);
        
        // Remove the socket association when a user disconnects.
        if (email) {
          this.userSockets.delete(email);
          console.log(`Disconnected: ${email}`);
        }
      }
  
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleConnection(client: Socket, ...args: any[]) {
        // Handle a new connection.
        const { email } = client.handshake.query;
        let userEmail: string | undefined;
      
        if (typeof email === 'string') {
          // If email is a string, use it as is.
          userEmail = email;
        } else if (Array.isArray(email)) {
          // If email is an array, take the first element as the user's email.
          userEmail = email[0];
        }
      
        if (userEmail) {
          // Store the socket associated with the user's email.
          this.userSockets.set(userEmail, client);
          console.log(`Connected: ${userEmail}`);
        } else {
          console.error('Invalid email format in handshake query:', email);
        }
      }
      
    private findUserEmail(client: Socket): string | undefined {
        for (const [email, socket] of this.userSockets.entries()) {
            if (socket === client) {
            return email;
            }
        }
        return undefined;
        }
      
  }