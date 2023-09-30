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
    async handleSendMessage(client: Socket, messageData: { senderEmail: string, receiverEmail: string, messageContent: string, listingId: number }): Promise<void> {
      // Handle the message.
      const { senderEmail, receiverEmail,listingId } = messageData;
      // Check if the recipient's socket is available.
      const recipientSocket = this.userSockets.get(`${receiverEmail}:${listingId}`);
      const senderSocket = this.userSockets.get(`${senderEmail}:${listingId}`);
    
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
        const { email, listingId } = this.findUserEmailAndListing(client);
        
        if (email && listingId) {
            const userKey = `${email}:${listingId}`;
            this.userSockets.delete(userKey);
            console.log(`Disconnected: ${email} (Listing: ${listingId})`);
        }
    }
  
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleConnection(client: Socket, ...args: any[]) {
        // Handle a new connection.
        const { email,listingId } = client.handshake.query;
        let userEmail: string | undefined;
        let userListing: string | undefined;
      
        if (typeof email === 'string'&& typeof listingId === 'string') {
          // If email is a string, use it as is.
          userEmail = email;
          userListing = listingId;
        } else if (Array.isArray(email)&& typeof listingId === 'string') {
          // If email is an array, take the first element as the user's email.
          userEmail = email[0];
          userListing = listingId;
        }
      
        if (userEmail) {
          // Store the socket associated with the user's email and listing.
          const userKey = `${userEmail}:${userListing}`;
          this.userSockets.set(userKey, client);
          console.log(`Connected: ${userEmail} (Listing: ${userListing})`);
        } else {
          console.error('Invalid email or listing format in handshake query:', email, listingId);
        }
      }
      
      private findUserEmailAndListing(client: Socket): { email?: string; listingId?: string } {
        for (const [key, socket] of this.userSockets.entries()) {
            const [email, listingId] = key.split(":");
            if (socket === client) {
                return { email, listingId };
            }
        }
        return {};
      
  }
}