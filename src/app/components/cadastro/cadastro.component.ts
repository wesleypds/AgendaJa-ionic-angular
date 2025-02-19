import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
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
    private router: Router, // Injeta o Router no construtor
    private alertController: AlertController
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
      const alert = await this.alertController.create({
        header: 'Erro',
        message: 'Preencha todos os campos corretamente!',
        buttons: ['Ok'],
      });
      await alert.present();
      return;
    }

    const { firstName, lastName, user, email, password } = this.cadastroForm.value;

    try {
      await this.authService.registerUser(firstName, lastName, user, email, password);
      const alert = await this.alertController.create({
        header: 'Sucesso',
        message: 'Usuário cadastrado com sucesso!',
        buttons: ['Ok'],
      });
      await alert.present();
      this.cadastroForm.reset(); // Limpa o formulário após o cadastro
      // 🔀 Redireciona para a tela de login
      this.router.navigate(['/login']);
    } catch (error: any) {
      const alert = await this.alertController.create({
        header: 'Erro',
        message: error.message,
        buttons: ['Ok'],
      });
      await alert.present();
    }
  }
}
