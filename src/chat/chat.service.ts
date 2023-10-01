import { Injectable } from '@nestjs/common';
import { Supabase } from 'src/supabase/supabase'; // Import your Supabase client
type Message = {
  senderEmail: string;
  messageContent: string;
  timestamp: any;
};
type Chat = {
  senderEmail: string;
  receiverEmail: string;
  messageContent: string;
  timestamp: any;
  listingId: number;
};
@Injectable()
export class ChatService {
  constructor(private readonly supabase: Supabase) {}

  async getAllChatMessages(senderEmail: string, receiverEmail: string,listingId:number): Promise<any[]> {
    const client = this.supabase.getClient();

    // Replace 'chat_messages' with your actual table name
    const { data, error } = await client
      .from('Chat')
      .select('*')
      .eq('listingId',listingId)
      .eq('senderEmail', senderEmail) // Filter by sender ID
      .eq('receiverEmail', receiverEmail) // Filter by receiver ID
      .order('timestamp', { ascending: true });
     
      const { data: data2, error: error2 } = await client
      .from('Chat')
      .select('*')
      .eq('listingId',listingId)
      .eq('senderEmail', receiverEmail) // Filter by sender ID
      .eq('receiverEmail', senderEmail) // Filter by receiver ID
      .order('timestamp', { ascending: true });
      const combinedData = [...data, ...data2];
      combinedData.forEach(item => {
        item.timestamp = new Date(item.timestamp);
      });
      
      combinedData.sort((a, b) => a.timestamp - b.timestamp);

    if (error || error2) {
        throw error || error2;
      }

    return combinedData;
  }
  async createChatMessage(messageData: { senderEmail: string, receiverEmail: string, messageContent: string }): Promise<any> {
    const client = this.supabase.getClient();
    console.log(messageData)
    const { data, error } = await client.from('Chat').upsert(messageData);

    if (error) {
      throw error;
    }

    return data;
  }
  async getChatList(Email: string): Promise<any> {
    const client = this.supabase.getClient();
   
    const { data, error } = await client
    .from('Chat')
    .select('')
    .or(`receiverEmail.eq.${Email},senderEmail.eq.${Email}`)
    .order('timestamp', { ascending: false });
  
    if (error) {
      throw error;
    }
  
    const userMessagesMap: Map<string, Message> = new Map();
    // Assuming data and Email are properly defined earlier in your code
    data.forEach((chat) => {
      
     
      // Check if senderEmail is not the same as the specified Email and if it's not already in the map
       // @ts-ignore
      if (chat.senderEmail !== Email && !userMessagesMap.has(`${chat.listingId}-${chat.senderEmail}`)) {
        // @ts-ignore
        const chatKey = `${chat.listingId}-${chat.senderEmail}`;
         // @ts-ignore
        userMessagesMap.set(chatKey, {id:chat.id,senderEmail: chat.senderEmail,messageContent: chat.messageContent,timestamp: chat.timestamp,listingId: chat.listingId
        });
      }
      // Check if receiverEmail is not the same as the specified Email and if it's not already in the map
       // @ts-ignore
      if (chat.receiverEmail !== Email && !userMessagesMap.has(`${chat.listingId}-${chat.receiverEmail}`)) {
        // @ts-ignore
        const chatKey=`${chat.listingId}-${chat.receiverEmail}`;
         // @ts-ignore
        userMessagesMap.set(chatKey, {id:chat.id,senderEmail: chat.receiverEmail, messageContent: chat.messageContent,timestamp: chat.timestamp,listingId: chat.listingId
        });
      }
    });
    
    // Convert the map values to an array to return
    return Array.from(userMessagesMap.values());
  
}
}
