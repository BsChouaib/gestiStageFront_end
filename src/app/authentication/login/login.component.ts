// angular import
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,MatInputModule,FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[AuthenticationService]
})
export default class LoginComponent implements OnInit{
  formGroup:FormGroup
  constructor(private router:Router,private form:FormBuilder,private auth:AuthenticationService) {}
  ngOnInit(): void {
    this.initForm()
  }
initForm(){
this.formGroup =this.form.group({
  email:[''],
  password:[''],
  /* grantType:[''],
  refreshToken:[''],
  withRefreshToken:[true] */
})
}
submit(){
  this.auth.login(this.formGroup.value).subscribe({next: ()=>{
    console.log(this.formGroup.value)
    this.nav()
  },error:()=>{

  }})
}
  nav(){
    this.router.navigateByUrl('/admin/default')  }
}
