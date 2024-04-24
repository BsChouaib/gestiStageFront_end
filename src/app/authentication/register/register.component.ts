// angular import
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, MatInputModule, FormsModule, ReactiveFormsModule,MatSelectModule,MatFormFieldModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export default class RegisterComponent implements OnInit {
  formGroup: FormGroup
  constructor(private router: Router, private form: FormBuilder) { }
  ngOnInit(): void {
    this.initForm()
  }
  initForm() {
    this.formGroup = this.form.group({
      email: [''],
      password: [''],
      role: [''],
      city: [''],
      country: [''],
      dateofbirth: [''],
      firstname: [''],
      gender: [''],
      isActive: [true],
      lastname: [''],
      nationality: [''],
      phonenumber: [''],
      postaladdress: [''],
      postalcode: ['']

    })
  }
  submit() {
    console.log(this.formGroup.value)
  }
  nav() {
    this.router.navigateByUrl('/main/default')
  }
}
