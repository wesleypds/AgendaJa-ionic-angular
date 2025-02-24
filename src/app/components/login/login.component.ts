import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

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
    private router: Router,
    private alertController: AlertController
  ) {
    this.loginForm = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() { }

  async login() {
    if (this.loginForm.invalid) {
      const alert = await this.alertController.create({
        header: 'Erro',
        message: 'Preencha todos os campos corretamente!',
        buttons: ['Ok'],
      });
      await alert.present();
      return;
    }

    const { user, password } = this.loginForm.value;

    try {
      await this.authService.loginUser(user, password);
      const alert = await this.alertController.create({
        header: 'Sucesso',
        message: 'Login com sucesso!',
        buttons: ['Ok'],
      });
      await alert.present();
      this.loginForm.reset(); // Limpa o formulário após o cadastro
      // 🔀 Redireciona para a tela de login
      this.router.navigate(['/home']);
    } catch (error: any) {
      const alert = await this.alertController.create({
        header: 'Erro',
        message: error.message,
        buttons: ['Ok'],
      });
      await alert.present();
    }
  }

  async resetarDados() {
    await Preferences.clear();
    console.log("Todos os dados foram resetados.");
  }

}
