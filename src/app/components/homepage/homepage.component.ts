import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MaskitoOptions, MaskitoElementPredicate } from '@maskito/core';
import { AgendamentoService } from 'src/app/services/agendamento.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  standalone: false,
})
export class HomepageComponent  implements OnInit {
  user$ = this.authService.getLoggedInUserObservable();
  agendamentoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private agendamentoService: AgendamentoService,
    private alertController: AlertController,
    private router: Router
  ) {
    this.agendamentoForm = this.fb.group({
      primeiroNome: ['', [Validators.required, Validators.maxLength(10)]],
      segundoNome: ['', [Validators.required, Validators.maxLength(100)]],
      cpf: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      especialidade: ['', Validators.required],
      medico: [''],
      dataConsulta: ['', Validators.required],
      motivo: ['']
    });
  }

  ngOnInit() {}

  async notFound() {
    const alert = await this.alertController.create({
      header: 'Aviso',
      message: 'Funcionalidade a ser implementada!',
      buttons: ['Ok'],
    });
    await alert.present();
    return;
  }

  async create() {
    if (this.agendamentoForm.invalid) {
      const alert = await this.alertController.create({
        header: 'Erro',
        message: 'Preencha todos os campos corretamente!',
        buttons: ['Ok'],
      });
      await alert.present();
      return;
    }

    const { primeiroNome, 
            segundoNome, 
            cpf, 
            dataNascimento, 
            telefone, 
            email, 
            especialidade, 
            medico, 
            dataConsulta, 
            motivo } = this.agendamentoForm.value;

    try {
      await this.agendamentoService.create(primeiroNome,
                                            segundoNome,
                                            cpf,
                                            dataNascimento,
                                            telefone,
                                            email,
                                            especialidade,
                                            medico,
                                            dataConsulta,
                                            motivo
                                          );
      const alert = await this.alertController.create({
        header: 'Sucesso',
        message: 'Agendamento cadastrado com sucesso!',
        buttons: ['Ok'],
      });
      await alert.present();
      this.agendamentoForm.reset(); // Limpa o formulário após o cadastro
    } catch (error: any) {
      const alert = await this.alertController.create({
        header: 'Erro',
        message: error.message,
        buttons: ['Ok'],
      });
      await alert.present();
    }
  }

  logout() {
    this.authService.logout();
  }

  viewAgendamentos() {
    this.router.navigate(['/agendamentos']);
  }

  clear() {
    this.agendamentoForm.reset();
  }

  readonly dateMask: MaskitoOptions = {
    mask: [
      /\d/, /\d/, '/',  // Dia (00/)
      /\d/, /\d/, '/',  // Mês (00/)
      /\d/, /\d/, /\d/, /\d/ // Ano (0000)
    ]
  };

  readonly cpfMask: MaskitoOptions = {
    mask: [
      /\d/, /\d/, /\d/, '.',  // Primeiros 3 dígitos + ponto
      /\d/, /\d/, /\d/, '.',  // Mais 3 dígitos + ponto
      /\d/, /\d/, /\d/, '-',  // Últimos 3 dígitos + hífen
      /\d/, /\d/              // Dígitos finais
    ]
  };

  readonly telMask: MaskitoOptions = {
    mask: [
      '(', /\d/, /\d/, ')', ' ',
      /\d/, ' ', /\d/, /\d/, /\d/, /\d/, '-',
      /\d/, /\d/, /\d/, /\d/  
    ]
  };

  readonly maskPredicate: MaskitoElementPredicate = async (el) => (el as HTMLIonInputElement).getInputElement();

}
