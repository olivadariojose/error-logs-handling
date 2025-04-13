import { Module } from '@nestjs/common';
import { WinstonmongodbService } from './winstonmongodb.service';

@Module({
  controllers: [],
  providers: [WinstonmongodbService],
  exports:[WinstonmongodbService]
})
export class WinstonmongodbModule {}
