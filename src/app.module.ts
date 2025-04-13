import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { envs } from './config/envs';
import { UsersModule } from './users/users.module';
import { WinstonmongodbModule } from './winstonmongodb/winstonmongodb.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      envs.mongodburi
    ),
    UsersModule,
    WinstonmongodbModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
