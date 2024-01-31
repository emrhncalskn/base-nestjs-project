import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async randomDigits(res: Response) {
    return await res.send(Math.floor(100000 + Math.random() * 900000));
  }
}
