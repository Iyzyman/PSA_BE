/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Supabase } from './supabase/supabase';

@Injectable()
export class AppService {
  constructor(private readonly supabase: Supabase) {}

  async getHello(): Promise<string> {
    const client = this.supabase.getClient();
    // const newData = {
    //   id: 2,
    //   title: 'hello',
    //   description: 'test',
    //   author: 'test',
    //   fromLOC: 'shanghai',
    //   toLOC: 'kl',
    // };
    // Query the "listing" table
    const { data, error } = await client
      .from('listings')
      .select('*')
    if (error) {
      throw error;
    }

    // 'data' now contains the results of your query
    console.log(data);

    return 'Hello World!';
  }
}