import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config/envs';
import { ValidationPipe } from '@nestjs/common';
import { WinstonmongodbService } from './winstonmongodb/winstonmongodb.service';
import { WinstonExceptionFilter } from './winstonmongodb/filters/winston-exception.filter';


async function main() {
  const app = await NestFactory.create(AppModule);

  const logger = app.get(WinstonmongodbService)
  app.useGlobalFilters(new WinstonExceptionFilter(logger))

  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  )

  await app.listen(envs.port);
}
main();
