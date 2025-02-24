import { Component } from '@angular/core';
import { App } from '@capacitor/app';
import { StatusBar } from '@capacitor/status-bar';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.initializeApp();
  }
  async initializeApp() {
    await this.platform.ready();

    if (this.platform.is('hybrid')) { // Garante que está rodando em um dispositivo real
      await this.hideStatusBar(); // Oculta no início

      // Escuta quando o app volta do background
      App.addListener('appStateChange', async (state) => {
        if (state.isActive) {
          await this.hideStatusBar(); // Oculta novamente ao retornar
        }
      });
    }
  }

  async hideStatusBar() {
    try {
      await StatusBar.hide();
    } catch (error) {
      console.error('Erro ao esconder a Status Bar:', error);
    }
  }
}
