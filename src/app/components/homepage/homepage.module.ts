import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomepageRoutingModule } from './homepage-routing.module';
import { HomepageComponent } from './homepage.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomepageRoutingModule
  ],
  declarations: [HomepageComponent]
})
export class HomepageModule {}
