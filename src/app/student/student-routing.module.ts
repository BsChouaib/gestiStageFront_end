import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
      {
        path: 'default',
        loadComponent: () => import('./default/default.component')
      },
      {
        path: 'claims',
        loadComponent: () => import('./Claims/claims-page.component')
      },
      {
        path: 'subject',
        loadComponent: () => import('./subject/subject-page.component')
      },
      {
        path: 'demand',
        loadComponent: () => import('./demand/demand-page.component')
      }
      ,
      {
        path: 'internship',
        loadComponent: () => import('./internship/internship-page.component')
      }
      ,
      {
        path: 'presentation',
        loadComponent: () => import('./presentation/presentation-page.component')
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {}
