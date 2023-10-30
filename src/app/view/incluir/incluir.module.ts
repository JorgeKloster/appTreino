import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IncluirPageRoutingModule } from './incluir-routing.module';

import { IncluirPage } from './incluir.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IncluirPageRoutingModule
  ],
  declarations: [IncluirPage]
})
export class IncluirPageModule {}
