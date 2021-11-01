import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import * as mongoose from 'mongoose';

import { AppModule } from './app.module';

const port = process.env.SERVICE_AGENT_PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //   app.enableCors({ origin: true, methods: '*', credentials: true });
  app
    .listen(port)
    .then(() => {
      mongoose.set('debug', true);
      Logger.log('Server running on port ' + port, 'Bootstrap');
    })
    .catch((err) => {
      Logger.log('Failed to start server ' + err, 'Bootstrap');
    });
}
bootstrap();
