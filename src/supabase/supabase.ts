/* eslint-disable prettier/prettier */
import { Injectable, Logger, Scope } from '@nestjs/common';
// import { Request } from 'express';
// import { REQUEST } from '@nestjs/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';


@Injectable({ scope: Scope.REQUEST })
export class Supabase {
  private readonly logger = new Logger(Supabase.name);
  private clientInstance: SupabaseClient;

//   constructor(
//     @Inject(REQUEST) private readonly request: Request,
//   ) {}

  getClient() {
    this.logger.log('getting supabase client...');
    if (this.clientInstance) {
      this.logger.log('client exists - returning for current Scope.REQUEST');
      return this.clientInstance;
    }

    this.logger.log('initialising new supabase client for new Scope.REQUEST');

    this.clientInstance = createClient(
      "https://tcsgfwsjuwyzqhlmtytk.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjc2dmd3NqdXd5enFobG10eXRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU3OTkyMDgsImV4cCI6MjAxMTM3NTIwOH0.Wl4DRG7yXT92Zfv3u-LY59pb-N9x55EYyPf9u2QEfQ8",
    );

    return this.clientInstance;
  }
}
