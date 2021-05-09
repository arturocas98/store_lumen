import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnidadMedidaPage } from './unidad-medida.page';
import { UnidadMedidaAdd } from './unidad-medida-add/unidad-medida-add.page';
import { UnidadMedidaEdit } from './unidad-medida-edit/unidad-medida-edit.page';

const routes: Routes = [
  {
    path: '',
    component: UnidadMedidaPage
  },
  {
    path: 'unidadAdd',
    component: UnidadMedidaAdd
  },
  {
    path: 'unidadEdit/:id',
    component: UnidadMedidaEdit
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnidadMedidaPageRoutingModule {}
