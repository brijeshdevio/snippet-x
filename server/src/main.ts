import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const hosts = process.env.HOSTS_URI as string;
const allowHosts = hosts?.split(' ');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.enableCors({
    origin: allowHosts,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap()
  .then(() => console.log('Server started'))
  .catch(console.error);
