import { Injectable } from '@nestjs/common';
import { CreateConsumoDto } from './dto/create-consumo.dto';
import { ConsultaHistoricoDto } from './dto/consulta-historico.dto';
import { Consumo } from './entities/consumo.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class ConsumoService {
  private registros: Consumo[] = [];

  create(dto: CreateConsumoDto) {
    const novo: Consumo = {
      id: randomUUID(),
      ...dto,
    };
    this.registros.push(novo);
    return novo;
  }

  historico(dto: ConsultaHistoricoDto) {
    return this.registros.filter(
      r =>
        r.userId === dto.userId &&
        new Date(r.dataLeitura) >= new Date(dto.dataInicio) &&
        new Date(r.dataLeitura) <= new Date(dto.dataFim),
    );
  }

  alerta(userId: string): string | null {
    const userRegistros = this.registros
      .filter(r => r.userId === userId)
      .sort((a, b) => new Date(b.dataLeitura).getTime() - new Date(a.dataLeitura).getTime());

    if (userRegistros.length < 2) return null;

    const [atual, anterior] = userRegistros;
    if (atual.consumoKwh > anterior.consumoKwh) {
      return 'Alerta: consumo deste mês maior que o anterior!';
    }
    return null;
  }
}
