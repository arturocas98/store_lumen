import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UnidadMedidaPageRoutingModule } from './unidad-medida-routing.module';

import { UnidadMedidaPage } from './unidad-medida.page';
import { UnidadMedidaAdd } from './unidad-medida-add/unidad-medida-add.page';
import { UnidadMedidaEdit } from './unidad-medida-edit/unidad-medida-edit.page';

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
    UnidadMedidaAdd,
    UnidadMedidaEdit
    
  ]
})
export class UnidadMedidaPageModule {}
