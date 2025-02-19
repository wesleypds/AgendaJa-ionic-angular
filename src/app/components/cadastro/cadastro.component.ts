import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { PasswordValidator } from 'src/app/util/password.validator';

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
      firstName: ['', [Validators.required, Validators.maxLength(10)]],
      lastName: ['', [Validators.required, Validators.maxLength(100)]],
      user: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(9), PasswordValidator.strongPassword]],
    });
  }

  async register() {
    if (this.cadastroForm.invalid) {
      alert('Preencha todos os campos corretamente!');
      return;
    }

    const { firstName, lastName, user, email, password } = this.cadastroForm.value;

    try {
      await this.authService.registerUser(firstName, lastName, user, email, password);
      alert('Usuário cadastrado com sucesso!');
      this.cadastroForm.reset(); // Limpa o formulário após o cadastro
      // 🔀 Redireciona para a tela de login
      this.router.navigate(['/login']);
    } catch (error: any) {
      alert(error.message);
    }
  }
}
