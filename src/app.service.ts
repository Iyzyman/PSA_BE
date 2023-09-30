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

  async getUtilization(): Promise<any>{
    const client = this.supabase.getClient()
    const { data, error } = await client
    .from('listings')
    .select('cargoSize, sold')
    .eq('leasingOwner', 'xiezijian99@gmail.com');

    if (error) {
      // Handle the error
    } else {
      const rows = data;
      let totalCargoSize = 0;
      let soldCargoSize = 0;

      rows.forEach((row) => {
        // Convert cargoSpace to numeric (assuming it's a numeric string)
        const numericCargoSpace = parseFloat(row.cargoSize);

        if (!isNaN(numericCargoSpace)) {
          totalCargoSize += numericCargoSpace;
          if (row.sold) {
            soldCargoSize += numericCargoSpace;
          }
        }
      });

      // Calculate the percentage
      const percentageSold = (soldCargoSize / totalCargoSize) * 100;
      // Use the percentageSold value as needed
      return percentageSold
        }
  }

  async getTrends(): Promise<any>{
    const client = this.supabase.getClient()
    const { data, error } = await client
    .from('indexTrends')
    .select('indexes, trend')
    if (error){
      throw error
    }
    return data
  }

  async getTotalRevenue(): Promise<any>{
    const client = this.supabase.getClient()
    const { data, error } = await client
    .from('listings')
    .select('price, sold, created_at')
    .eq('leasingOwner', 'xiezijian99@gmail.com');

  if (error) {
    // Handle the error
  } else {
    const rows = data;
    // Filter rows for the current and last month
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const currentMonthRows = rows.filter((row) => {
      const createdAt = new Date(row.created_at);
      return (
        createdAt.getMonth() === currentMonth && createdAt.getFullYear() === currentYear
      );
    });

    const lastMonthRows = rows.filter((row) => {
      const createdAt = new Date(row.created_at);
      return (
        createdAt.getMonth() === lastMonth && createdAt.getFullYear() === lastYear
      );
    });

    const currentMonthRevenue = currentMonthRows
      .filter((row) => row.sold)
      .reduce((total, row) => total + row.price, 0);

    const lastMonthRevenue = lastMonthRows
      .filter((row) => row.sold)
      .reduce((total, row) => total + row.price, 0);
    console.log(currentMonthRevenue, lastMonthRevenue)
    const percentChange =
      lastMonthRevenue !== 0
        ? ((currentMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100
        : 100; 

    const totalRevenue = rows
      .filter((row) => row.sold)
      .reduce((total, row) => total + row.price, 0);

    return {'revenue': totalRevenue, 'percentage': percentChange, }
  }
  }
}