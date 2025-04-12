import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config/envs';

async function main() {
  const app = await NestFactory.create(AppModule);
  await app.listen(envs.port);
}
main();
