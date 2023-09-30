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

@Controller('api/v1/listings')
export class ListingsController {
  constructor(private readonly listingService: ListingsService) {}

  @Post()
  insertListing(
    @Body('account') account: string,
    @Body('cargoSize') cargoSize: number,
    @Body('loadPort') loadPort: string,
    @Body('destPort') destPort: string,
    @Body('leaveDate') leaveDate: Date,
    @Body('reachDate') reachDate: Date,
    @Body('containerType') containerType: string,
    @Body('typeDangGoods') typeDangGoods: string,
    @Body('price') price: number
  ) {
    const generatedId = this.listingService.insertListing(
      account,
      cargoSize,
      loadPort,
      destPort,
      leaveDate,
      reachDate,
      containerType,
      typeDangGoods,
      price,
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
    @Body('account') account: string,
    @Body('cargoSize') cargoSize: number,
    @Body('loadPort') loadPort: string,
    @Body('destPort') destPort: string,
    @Body('leaveDate') leaveDate: Date,
    @Body('reachDate') reachDate: Date,
    @Body('containerType') containerType: string,
    @Body('typeDangGoods') typeDangGoods: string,
    @Body('price') price: number
  ) {
    this.listingService.updateListing(
      listingId,
      account,
      cargoSize,
      loadPort,
      destPort,
      leaveDate,
      reachDate,
      containerType,
      typeDangGoods,
      price,
    );
    return null;
  }

  @Delete(':id')
  removeListing(@Param('id') prodId: string) {
      this.listingService.deleteListing(prodId);
      return null;
  }
}