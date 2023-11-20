import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./view/appTreino/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'incluir',
    loadChildren: () => import('./view/appTreino/incluir/incluir.module').then( m => m.IncluirPageModule)
  },
  {
    path: 'detalhar',
    loadChildren: () => import('./view/appTreino/detalhar/detalhar.module').then( m => m.DetalharPageModule)
  },
  {
    path: 'editar',
    loadChildren: () => import('./view/appTreino/editar/editar.module').then( m => m.EditarPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./view/usuario/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./view/usuario/registro/registro.module').then( m => m.RegistroPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
