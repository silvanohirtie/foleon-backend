import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as express from 'express';
import { Express } from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as functions from 'firebase-functions';
dotenv.config();
const server: Express = express();

let isInitialized = false;

async function createNestServer(expressInstance: Express) {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );
  app.enableCors();
  if (process.env.NODE_ENV !== 'production') {
    return app.listen(3000);
  } else {
    return app.init();
  }
}

exports.api = functions
  .region('europe-west1')
  .https.onRequest(async (req, res) => {
    console.log('isInitialized: ', isInitialized);
    console.log('req: ', req.method, req.url);
    if (!isInitialized) {
      try {
        await createNestServer(server);
        isInitialized = true;
        console.log('Started');
      } catch (e) {
        isInitialized = false;
        console.error('Error', e);
      }
    }
    server(req, res);
  });
