// angular import
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthenticationService]
})
export default class LoginComponent implements OnInit {
  formGroup: FormGroup
  loading: boolean = false
  msg: string = null
  constructor(private router: Router, private form: FormBuilder, private auth: AuthenticationService, private toast: ToastrService) { }
  ngOnInit(): void {
    this.initForm()
  }
  initForm() {
    this.formGroup = this.form.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(5)]],
      password: ['', Validators.required],
      /* grantType:[''],
      refreshToken:[''],
      withRefreshToken:[true] */
    })
  }
  submit() {
    this.loading = true
    const loadingToast = this.toast.info('Loading...', 'Please wait', {
      closeButton: true,
    });
    this.auth.login(this.formGroup.value).subscribe({
      next: () => {
        console.log(this.formGroup.value)
        this.loading = false
        this.toast.clear(loadingToast.toastId);

        this.toast.success('Login successfully', 'Success', {
          progressBar: true,
          closeButton: true,
        });
        this.msg = null

      }, error: (err) => {
        this.loading = false
        this.toast.clear(loadingToast.toastId);
        this.toast.error("Login Error", 'Error', {
          progressBar: true,
          closeButton: true,
        });
        console.log(err)
        this.msg = err.error.error
      }
    })
  }
  nav() {
    this.router.navigateByUrl('/admin/default')
    console.log('route vers admin')
  }
}
