import { Controller, Post, Body, Get, Query, Param } from '@nestjs/common';
import { ConsumoService } from './consumo.service';
import { CreateConsumoDto } from './dto/create-consumo.dto';
import { ConsultaHistoricoDto } from './dto/consulta-historico.dto';

@Controller('consumo')
export class ConsumoController {
  constructor(private readonly consumoService: ConsumoService) {}

  @Post()
  registrar(@Body() dto: CreateConsumoDto) {
    return this.consumoService.create(dto);
  }

  @Get('historico')
  historico(@Query() dto: ConsultaHistoricoDto) {
    return this.consumoService.historico(dto);
  }

  @Get('alerta/:userId')
  alerta(@Param('userId') userId: string) {
    return this.consumoService.alerta(userId);
  }
}
