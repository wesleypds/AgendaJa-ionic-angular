import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {
  private AGENDAMENTOS_KEY = 'agendamentos';

  constructor() {}

//   async create(firstName: string, lastName: string, user: string, email: string, password: string) {
//     const users = await this.getUsers();

//     users.push({ firstName, lastName, user, email, password });

//     await Preferences.set({
//       key: this.AGENDAMENTOS_KEY,
//       value: JSON.stringify(users),
//     });

//     return true;
//   }

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

//   async list(): Promise<any[]> {
//     const { value } = await Preferences.get({ key: this.AGENDAMENTOS_KEY });
//     return value ? JSON.parse(value) : [];
//   }

//   async delete() {
//     await Preferences.remove({ key: 'loggedInUser' });
//   }

}
