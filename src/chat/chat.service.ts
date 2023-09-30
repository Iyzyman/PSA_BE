import { Injectable } from '@nestjs/common';
import { Supabase } from 'src/supabase/supabase'; // Import your Supabase client

@Injectable()
export class ChatService {
  constructor(private readonly supabase: Supabase) {}

  async getAllChatMessages(senderEmail: string, receiverEmail: string): Promise<any[]> {
    const client = this.supabase.getClient();

    // Replace 'chat_messages' with your actual table name
    const { data, error } = await client
      .from('Chat')
      .select('*')
      .eq('senderEmail', senderEmail) // Filter by sender ID
      .eq('receiverEmail', receiverEmail) // Filter by receiver ID
      .order('timestamp', { ascending: true });

    if (error) {
      throw error;
    }

    return data;
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
}
