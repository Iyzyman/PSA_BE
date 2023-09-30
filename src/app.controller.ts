import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api/v1')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('typeGoods')
  getGoods() {
    return this.appService.getGoodTypes();
  }
  
  @Get('typeContainers')
  getContainers() {
    return this.appService.getContainerTypes();
  } 

  @Get('ports')
  getPorts() {
    //return this.appService.getPorts();
    return " hehe"
  }

  @Get('totalRevenue')
  getTotalRevenue() {
    return this.appService.getTotalRevenue();
  }

}
