import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
  standalone: false
})
export class CadastroComponent {
  cadastroForm: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router // Injeta o Router no construtor
  ) {
    this.cadastroForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async register() {
    if (this.cadastroForm.invalid) {
      alert('Preencha todos os campos corretamente!');
      return;
    }

    const { name, email, password } = this.cadastroForm.value;

    try {
      await this.authService.registerUser(name, email, password);
      alert('Usuário cadastrado com sucesso!');
      this.cadastroForm.reset(); // Limpa o formulário após o cadastro
      // 🔀 Redireciona para a tela de login
      this.router.navigate(['/login']);
    } catch (error: any) {
      alert(error.message);
    }
  }
}
