import { Injectable, NotFoundException } from '@nestjs/common';
import { Supabase } from 'src/supabase/supabase';

@Injectable()
export class ListingsService {
    constructor(private readonly supabase: Supabase) {}

    async insertListing(title: string, desc: string, fromLoc: string, toLoc: string, cargoSize: number): Promise<string> {
        const client = this.supabase.getClient();
        const { data: { user } } = await client.auth.getUser()
        const newData = {
            title: title,
            description: desc,
            author: user.email,
            fromLoc: fromLoc,
            toLoc: toLoc,
            cargoSize: cargoSize
        }
        const { data, error} = await client.
        from('listings')
        .upsert(newData)
        if (error){
            throw error
        }
        return 'success'
    }

    async getListings(): Promise<any[]> {
        const client = this.supabase.getClient();
        const { data, error} = await client
        .from('listings')
        .select('*')
        if (error){
            throw error
        }
        return data
    }

    async getSingleListing(listingId: string): Promise<any[]> {
        const client = this.supabase.getClient();
        const { data, error} = await client
        .from('listing')
        .select('*')
        .eq("id", listingId)
        if (error){
            throw error
        }
        return data
    }

    async updateListing(listingId: string, title: string, desc: string, fromLoc: string, toLoc: string, cargoSize: number): Promise<string> {
        const client = this.supabase.getClient();
        const { data, error } = await client
        .from('listings')
        .update({'title': title, 'description': desc, 'fromLoc': fromLoc, 'toLoc': toLoc, 'cargoSize': cargoSize})
        .eq('id', listingId)
        if (error){
            throw error
        }
        return 'success'
    }

    async deleteListing(listingId: string): Promise<string> {
        const client = this.supabase.getClient();
        const { data, error } = await client
        .from('listings')
        .delete()
        .eq('id', listingId)
        if (error){
            throw error
        }
        return 'success'
    }
}