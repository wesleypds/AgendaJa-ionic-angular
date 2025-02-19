import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private USER_KEY = 'users';

  constructor() {}

  async registerUser(name: string, email: string, password: string) {
    const users = await this.getUsers();

    if (users.find(user => user.email === email)) {
      throw new Error('E-mail já cadastrado!');
    }

    users.push({ name, email, password });

    await Preferences.set({
      key: this.USER_KEY,
      value: JSON.stringify(users),
    });

    return true;
  }

  async loginUser(name: string, password: string) {
    const users = await this.getUsers();
    
    const user = users.find(user => user.name === name && user.password === password);

    if (!user) {
      throw new Error('Usuário ou senha incorretos!');
    }

    // Simula que o usuário está logado, armazenando o e-mail
    await Preferences.set({
      key: 'loggedInUser',
      value: JSON.stringify(user),
    });

    return user; // Retorna os dados do usuário autenticado
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
