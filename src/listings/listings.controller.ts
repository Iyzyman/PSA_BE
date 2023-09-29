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

  @Controller('listings')
export class ProductsController {
  constructor(private readonly listingService: ListingsService) {}

  @Post()
  insertListing(
    @Body('title') title: string,
    @Body('description') desc: string,
    @Body('fromLoc') fromLoc: string,
    @Body('toLoc') toLoc: string,
    @Body('cargoSize') cargoSize: number,
  ) {
    const email = ''
    const generatedId = this.listingService.insertListing(
      title,
      desc,
      email,
      fromLoc,
      toLoc,
      cargoSize,
    );

    return { id: generatedId };
  }

  @Get()
  getAllProducts() {
    return this.listingService.getListings();
  }

  @Get(':id')
  getProduct(@Param('id') listingId: string) {
    return this.listingService.getSingleListing(listingId);
  }

  @Patch(':id')
  updateProduct(
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
  removeProduct(@Param('id') prodId: string) {
      this.listingService.deleteProduct(prodId);
      return null;
  }
}