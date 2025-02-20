import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private USER_KEY = 'users';
  private loggedInUserSubject = new BehaviorSubject<any>(null);

  constructor(
    private router: Router
  ) {
    this.loadLoggedInUser();
  }

  async registerUser(firstName: string, lastName: string, user: string, email: string, password: string) {
    const users = await this.getUsers();

    if (users.find(u => u.user === user)) {
      throw new Error('Usuário já cadastrado!');
    }

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
    
    const u = await users.find(u => u.user === user);

    if (!u) {
      throw new Error('Usuário não existe!');
    }

    if (u.password !== password) {
      throw new Error('Senha incorreta!');
    }

    // Simula que o usuário está logado, armazenando o e-mail
    await Preferences.set({
      key: 'loggedInUser',
      value: JSON.stringify(u),
    });

    this.loggedInUserSubject.next(u); // Atualiza o estado global

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
    this.loggedInUserSubject.next(null); // Remove o usuário logado
    this.router.navigate(['/login']);
  }

  async loadLoggedInUser() {
    const { value } = await Preferences.get({ key: 'loggedInUser' });
    const user = value ? JSON.parse(value) : null;
    this.loggedInUserSubject.next(user);
  }

  getLoggedInUserObservable() {
    return this.loggedInUserSubject.asObservable();
  }
}
