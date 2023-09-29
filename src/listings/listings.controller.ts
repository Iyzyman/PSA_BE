import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
  } from '@nestjs/common';

  import { ListingsService } from './listings.service';

@Controller('/api/v1/listings')
export class ListingsController {
  constructor(private readonly listingService: ListingsService) {}

  @Post()
  insertListing(
    @Body('title') title: string,
    @Body('description') desc: string,
    @Body('fromLoc') fromLoc: string,
    @Body('toLoc') toLoc: string,
    @Body('cargoSize') cargoSize: number,
  ) {
    const generatedId = this.listingService.insertListing(
      title,
      desc,
      fromLoc,
      toLoc,
      cargoSize,
    );

    return { id: generatedId };
  }

  @Get()
  getAllListings() {
    return this.listingService.getListings();
  }

  @Get(':id')
  getListing(@Param('id') listingId: string) {
    return this.listingService.getSingleListing(listingId);
  }

  @Patch(':id')
  updateListing(
    @Param('id') listingId: string,
    @Body('title') title: string,
    @Body('description') desc: string,
    @Body('fromLoc') fromLoc: string,
    @Body('toLoc') toLoc: string,
    @Body('cargoSize') cargoSize: number
  ) {
    this.listingService.updateListing(listingId, title, desc, fromLoc, toLoc, cargoSize);
    return null;
  }

  @Delete(':id')
  removeListing(@Param('id') prodId: string) {
      this.listingService.deleteListing(prodId);
      return null;
  }
}