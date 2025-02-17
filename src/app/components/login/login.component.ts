import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})
export class LoginComponent  implements OnInit {

  username: string = '';
  password: string = '';

  constructor() { }

  ngOnInit() {}

  login() {
    console.log('Usuário:', this.username);
    console.log('Senha:', this.password);
  }

}
