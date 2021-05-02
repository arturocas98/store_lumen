import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriaPageRoutingModule } from './categoria-routing.module';

import { CategoriaPage } from './categoria.page';
import { CategoriaAdd } from './categoria-add/categoria-add.page';
import { CategoriaEdit } from './categoria-edit/categoria-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: 
  [
    CategoriaPage,
    CategoriaAdd,
    CategoriaEdit
  ]
})
export class CategoriaPageModule {}
