import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';




@NgModule({
  declarations: [],
  imports: [CommonModule, AdminRoutingModule, ToastrModule.forRoot()],
  providers: [],
})
export class AdminModule {}
