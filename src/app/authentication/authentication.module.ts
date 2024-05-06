import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from '../Services/jwt.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule,FormsModule,ReactiveFormsModule, AuthenticationRoutingModule],
  providers:[]
})
export class AuthenticationModule {}
