import { Component } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor() {
    this.startAutoClearPreferences();
  }

  startAutoClearPreferences() {
    setInterval(async () => {
      console.log('🕒 Limpando Preferences...');
      await Preferences.clear();
    }, 5 * 60 * 1000); // 5 minutos em milissegundos
  }
}
