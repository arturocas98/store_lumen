import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnidadMedidaPage } from './unidad-medida.page';
import { UnidadMedidaAdd } from './unidad-medida-add/unidad-medida-add.page';

const routes: Routes = [
  {
    path: '',
    component: UnidadMedidaPage
  },
  {
    path: 'unidadAdd',
    component: UnidadMedidaAdd
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnidadMedidaPageRoutingModule {}
