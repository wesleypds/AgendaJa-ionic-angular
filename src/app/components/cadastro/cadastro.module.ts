import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastroComponent } from './cadastro.component';
import { CadastroRoutingModule } from './cadastro-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroRoutingModule
  ],
  declarations: [CadastroComponent]
})
export class CadastroModule {}
