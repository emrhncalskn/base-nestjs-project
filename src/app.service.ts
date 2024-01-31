import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  randomDigits(res: Response) {
    return res.status(200).send(Math.floor(100000 + Math.random() * 900000));
  }
}
