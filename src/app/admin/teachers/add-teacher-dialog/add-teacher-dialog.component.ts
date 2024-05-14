import {  MatDialogRef, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelect } from "@angular/material/select";

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { TeachersService } from 'src/app/Services/teachers.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-add-teacher-dialog',
  templateUrl: './add-teacher-dialog.component.html',
  styleUrls: ['./add-teacher-dialog.component.sass'],
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, FormsModule,
    ReactiveFormsModule, MatIconModule, MatDialogModule,CommonModule,MatFormFieldModule],
    providers:[TeachersService]
})
export class AddTeacherDialogComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

  /** teacher that emits when the component has been destroyed. */


  teacher: any;

  searchMeetingControl = new FormControl();
  teacherForm: FormGroup
  constructor(
    public dialogRef: MatDialogRef<AddTeacherDialogComponent>,
    private fb: UntypedFormBuilder,
    private teacherService : TeachersService,
    private toast :ToastrService


  ) {
  }

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(5)]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['TEACHER'],
      city: [''],
      country: [''],
      dateofbirth: [''],
      firstname: ['',[Validators.required,Validators.minLength(3)]],
      gender: [''],
      lastname: ['',[Validators.required,Validators.minLength(3)]],
      nationality: [''],
      phonenumber: [''],
      postaladdress: [''],
      postalcode: [''],
      experience: [''],
      subjectTaught: [''],
      teachingLevel: [''],
    });
  }

  fermer(): void {
    this.dialogRef.close();
  }


  submit() {
    const loadingToast = this.toast.info('Loading...', 'Please wait', {
      closeButton: true,
    }); 
    let data = this.teacherForm.value
    this.teacherService.createTeacher(data).subscribe({
      next:(res)=>{
        this.toast.clear(loadingToast.toastId);

        this.toast.success('Teacher added Successfully', 'Success', {
          progressBar: true,
          closeButton: true,
        });
      },

      error:(err)=>{
        console.log(err)
        this.toast.clear(loadingToast.toastId);
        this.toast.error('Add Teacher Failed', 'Error', {
         progressBar: true,
         closeButton: true,
       });      }
    })
  }





  ngOnInit(): void {
    this.teacherForm = this.createContactForm()
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
  }


}

