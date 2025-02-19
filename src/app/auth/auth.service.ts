import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private USER_KEY = 'users';

  constructor() {}

  async registerUser(firstName: string, lastName: string, user: string, email: string, password: string) {
    const users = await this.getUsers();

    if (users.find(user => user.email === email)) {
      throw new Error('E-mail já cadastrado!');
    }

    users.push({ firstName, lastName, user, email, password });

    await Preferences.set({
      key: this.USER_KEY,
      value: JSON.stringify(users),
    });

    return true;
  }

  async loginUser(user: string, password: string) {
    const users = await this.getUsers();
    
    const u = users.find(u => u.user === user && u.password === password);

    if (!u) {
      throw new Error('Usuário ou senha incorretos!');
    }

    // Simula que o usuário está logado, armazenando o e-mail
    await Preferences.set({
      key: 'loggedInUser',
      value: JSON.stringify(u),
    });

    return u; // Retorna os dados do usuário autenticado
  }

  async getUsers(): Promise<any[]> {
    const { value } = await Preferences.get({ key: this.USER_KEY });
    return value ? JSON.parse(value) : [];
  }

  async getLoggedInUser() {
    const { value } = await Preferences.get({ key: 'loggedInUser' });
    return value ? JSON.parse(value) : null;
  }

  async logout() {
    await Preferences.remove({ key: 'loggedInUser' });
  }
}
