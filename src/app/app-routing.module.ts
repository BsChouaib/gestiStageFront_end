import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/guest/authentication.component';
import { MainComponent } from './mainLayout/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule)
      },
      {
        path: 'student',
        loadChildren: () => import('./student/student.module').then((m) => m.StudentModule)
      },
      {
        path: 'teacher',
        loadChildren: () => import('./teacher/teacher.module').then((m) => m.TeacherModule)
      }
    ]
  },
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      {
        path: 'guest',
        loadChildren: () => import('./authentication/authentication.module').then((m) => m.AuthenticationModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
