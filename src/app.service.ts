/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Supabase } from './supabase/supabase';

@Injectable()
export class AppService {
  constructor(private readonly supabase: Supabase) {}

  async getGoodTypes(): Promise<any> {
    const client = this.supabase.getClient();
    const { data, error } = await client
      .from('typeGoods')
      .select('type')
    if (error) {
      throw error;
    }
    let result = data.map(a => a.type)
    console.log(result);

    return data
  }

  async getContainerTypes(): Promise<any> {
    const client = this.supabase.getClient();
    const { data, error } = await client
      .from('typeContainers')
      .select('type')
    if (error) {
      throw error;
    }
    let result = data.map(a => a.type)
    console.log(result);

    return data
  }

  async getPorts(): Promise<any> {
    const client = this.supabase.getClient();
    const { data, error } = await client
      .from('ports')
      .select('UNLocode, name')
    if (error) {
      throw error;
    }

    return data
  }
}