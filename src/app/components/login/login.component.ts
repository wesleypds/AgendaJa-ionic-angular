import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() { }

  async login() {
    if (this.loginForm.invalid) {
      alert('Preencha todos os campos corretamente!');
      return;
    }

    const { name, password } = this.loginForm.value;

    try {
      await this.authService.loginUser(name, password);
      alert('Login com sucesso!');
      this.loginForm.reset(); // Limpa o formulário após o cadastro
      // 🔀 Redireciona para a tela de login
      this.router.navigate(['/home']);
    } catch (error: any) {
      alert(error.message);
    }
  }

}
