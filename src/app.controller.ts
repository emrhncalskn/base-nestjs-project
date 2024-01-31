import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { PassAuth } from './auth/guards/pass-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @ApiBearerAuth()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @PassAuth()
  @Get('test')
  async randomDigits(@Res() res: Response) {
    return await this.appService.randomDigits(res);
  }
}
