// angular import
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,RouterModule,MatInputModule,FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[AuthenticationService]
})
export default class LoginComponent implements OnInit{
  formGroup:FormGroup
  loading:boolean=false
  constructor(private router:Router,private form:FormBuilder,private auth:AuthenticationService) {}
  ngOnInit(): void {
    this.initForm()
  }
initForm(){
this.formGroup =this.form.group({
  email:['',[Validators.required, Validators.email, Validators.minLength(5)]],
  password:['', Validators.required],
  /* grantType:[''],
  refreshToken:[''],
  withRefreshToken:[true] */
})
}
submit(){
  this.loading=true
  this.auth.login(this.formGroup.value).subscribe({next: ()=>{
    console.log(this.formGroup.value)
    this.loading=false

  },error:()=>{
    this.loading=false

  }})
}
  nav(){
    this.router.navigateByUrl('/admin/default')  }
}
