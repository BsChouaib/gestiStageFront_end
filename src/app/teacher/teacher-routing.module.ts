import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import SamplePageComponent from './sample-page/sample-page.component';

const routes: Routes = [
      {
        path: 'default',
        loadComponent: () => import('./default/default.component')
      },
      {
        path: 'typography',
        loadComponent: () => import('./elements/typography/typography.component')
      },
      {
        path: 'color',
        loadComponent: () => import('./elements/element-color/element-color.component')
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./sample-page/sample-page.component')
      },
      {
        path: 'subject',
        loadComponent: () => import('./subject/subject-page.component')
      },
      {
        path: 'claims',
        loadComponent: () => import('./Claims/claims-page.component')
      },
      {
        path: 'presentation',
        loadComponent: () => import('../admin/presentation/presentation.component')
      },
      {
        path: 'internship',
        loadComponent: () => import('../admin/internship/internship.component')
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule {}
