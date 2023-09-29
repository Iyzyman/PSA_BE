import { Injectable} from '@nestjs/common';
import { type } from 'os';
import { Supabase } from 'src/supabase/supabase';

@Injectable()
export class ListingsService {
    constructor(private readonly supabase: Supabase) {}

    async insertListing(account: string, cargoSize: number, loadPort: string, destPort: string,
                        leaveDate: Date, reachDate: Date, containerType: string, typeDangGoods: string, price: number): Promise<string> {
        const client = this.supabase.getClient();
        const { data: { user } } = await client.auth.getUser()
        const newData = {
            leasingOwner: user.email,
            account: account,
            cargoSize: cargoSize,
            loadPort: loadPort,
            destPort: destPort,
            leaveDate: leaveDate,
            reachDate: reachDate,
            containerType: containerType,
            typeDangGoods: typeDangGoods,
            price: price
        }
        const { data, error} = await client.
        from('listings')
        .upsert(newData)
        if (error){
            throw error
        }
        return data
    }

    async getListings(): Promise<any[]> {
        const client = this.supabase.getClient();
        const { data, error} = await client
        .from('listings')
        .select('*')
        if (error){
            throw error
        }
        console.log(data)
        return data
    }

    async getSingleListing(listingId: string): Promise<any[]> {
        const client = this.supabase.getClient();
        const { data, error} = await client
        .from('listings')
        .select('*')
        .eq("id", listingId)
        if (error){
            throw error
        }
        console.log(data)
        return data
    }

    async updateListing(listingId: string, account: string, cargoSize: number, loadPort: string, destPort: string,
        leaveDate: Date, reachDate: Date, containerType: string, typeDangGoods: string, price: number): Promise<string> {
        const client = this.supabase.getClient();
        const { data, error } = await client
        .from('listings')
        .update({'typeDangGoods': typeDangGoods, 'price': price, 'loadPort': loadPort, 'destPort': destPort, 'cargoSize': cargoSize,
                'account': account, 'leaveDate': leaveDate, 'reachDate': reachDate, 'containerType': containerType})
        .eq('id', listingId)
        if (error){
            throw error
        }
        return data
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
        return data
    }
}