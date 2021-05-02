import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UnidadMedidaPageRoutingModule } from './unidad-medida-routing.module';

import { UnidadMedidaPage } from './unidad-medida.page';
import { UnidadMedidaAdd } from './unidad-medida-add/unidad-medida-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UnidadMedidaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    UnidadMedidaPage,
    UnidadMedidaAdd
    
  ]
})
export class UnidadMedidaPageModule {}
