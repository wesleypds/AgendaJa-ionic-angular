import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
  private AGENDAMENTOS_KEY = 'agendamentos';

  constructor() {}

  async create(primeiroNome: string, 
                segundoNome: string, 
                cpf: string, 
                dataNascimento: Date, 
                telefone: string, 
                email: string, 
                especialidade: string, 
                medico: string, 
                dataConsulta: Date, 
                motivo: string
              ) {
    const agendamentos = await this.list();

    agendamentos.push({ primeiroNome, 
                        segundoNome, 
                        cpf, 
                        dataNascimento, 
                        telefone, 
                        email, 
                        especialidade, 
                        medico, 
                        dataConsulta, 
                        motivo });

    await Preferences.set({
      key: this.AGENDAMENTOS_KEY,
      value: JSON.stringify(agendamentos),
    });

    return true;
  }

  async list(): Promise<any[]> {
    const { value } = await Preferences.get({ key: this.AGENDAMENTOS_KEY });
    return value ? JSON.parse(value) : [];
  }

}
