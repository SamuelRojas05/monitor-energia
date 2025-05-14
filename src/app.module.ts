import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsumoModule } from './consumo/consumo.module';

@Module({
  imports: [ConsumoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
