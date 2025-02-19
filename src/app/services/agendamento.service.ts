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

//   async findById(user: string, password: string) {
//     const users = await this.list;
    
//     const u = users.find(u => u.user === user && u.password === password);

//     // Simula que o usuário está logado, armazenando o e-mail
//     await Preferences.set({
//       key: 'loggedInUser',
//       value: JSON.stringify(u),
//     });

//     return u; // Retorna os dados do usuário autenticado
//   }

  async list(): Promise<any[]> {
    const { value } = await Preferences.get({ key: this.AGENDAMENTOS_KEY });
    return value ? JSON.parse(value) : [];
  }

//   async delete() {
//     await Preferences.remove({ key: 'loggedInUser' });
//   }

}
