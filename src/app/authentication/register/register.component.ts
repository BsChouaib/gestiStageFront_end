// angular import
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { passwordMatchValidator } from './passwordValidator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,RouterModule, MatInputModule, FormsModule, ReactiveFormsModule,MatSelectModule,MatFormFieldModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers:[AuthenticationService]

})
export default class RegisterComponent implements OnInit {
  formGroup: FormGroup
  constructor(private router: Router, private form: FormBuilder,private auth:AuthenticationService) { }
  ngOnInit(): void {
    this.initForm()
  }
  initForm() {
    this.formGroup = this.form.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(5)]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: [''],
      city: [''],
      country: [''],
      dateofbirth: [''],
      firstname: ['',[Validators.required,Validators.minLength(3)]],
      gender: [''],
      isActive: [true],
      lastname: ['',[Validators.required,Validators.minLength(3)]],
      nationality: [''],
      phonenumber: [''],
      postaladdress: [''],
      postalcode: [''],
      currentInstitution: [''],
      currentStudyLevel: [''],
      enrollmentYear: [''],
      studyField: ['']
    },
    {
      validator: passwordMatchValidator,
    })
  }
  submit() {
    console.log(this.formGroup.value)
    this.auth.registre(this.formGroup.value).subscribe({next: ()=>{
      console.log(this.formGroup.value)
      this.nav()
    },error:()=>{
  
    }})
  }
  nav() {
    this.router.navigateByUrl('auth/guest/login')
  }
}
