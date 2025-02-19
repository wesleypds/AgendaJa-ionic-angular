import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  standalone: false,
})
export class HomepageComponent  implements OnInit {
  user$ = this.authService.getLoggedInUserObservable();

  constructor(
    private authService: AuthService,
    private alertController: AlertController
  ) { 
  }

  ngOnInit() {}

  async notFound() {
    console.log("Função chamada!");
    const alert = await this.alertController.create({
      header: 'Aviso',
      message: 'Funcionalidade a ser implementada!',
      buttons: ['Ok'],
    });
    await alert.present();
    return;
  }

}
