import { NgModule } from '@angular/core';
import { ExtraOptions, PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('src/app/components/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('src/app/components/cadastro/cadastro.module').then(m => m.CadastroModule)
  },
  {
    path: 'home',
    loadChildren: () => import('src/app/components/homepage/homepage.module').then(m => m.HomepageModule)
  },
  {
    path: 'agendamentos',
    loadChildren: () => import('src/app/components/agendamentos/agentamentos.module').then(m => m.AgendamentosModule)
  }
];

const routerConfig: ExtraOptions = {
  onSameUrlNavigation: 'reload', // Força o recarregamento da página
};

@NgModule({
  imports: [
    RouterModule.forRoot(routes, routerConfig)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
