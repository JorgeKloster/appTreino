import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./view/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'incluir',
    loadChildren: () => import('./view/incluir/incluir.module').then( m => m.IncluirPageModule)
  },
  {
    path: 'detalhar',
    loadChildren: () => import('./view/detalhar/detalhar.module').then( m => m.DetalharPageModule)
  },
  {
    path: 'editar',
    loadChildren: () => import('./view/editar/editar.module').then( m => m.EditarPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
