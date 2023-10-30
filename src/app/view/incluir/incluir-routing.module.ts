import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncluirPage } from './incluir.page';

const routes: Routes = [
  {
    path: '',
    component: IncluirPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncluirPageRoutingModule {}
