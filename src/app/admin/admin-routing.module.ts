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
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
