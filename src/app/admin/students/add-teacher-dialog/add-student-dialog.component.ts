import {  MatDialogRef, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelect } from "@angular/material/select";

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { StudentsService } from 'src/app/Services/students.service';

@Component({
  selector: 'app-add-student-dialog',
  templateUrl: './add-student-dialog.component.html',
  styleUrls: ['./add-student-dialog.component.sass'],
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, FormsModule,
    ReactiveFormsModule, MatIconModule, MatDialogModule,CommonModule,MatFormFieldModule],
    providers:[StudentsService]
})
export class AddStudentDialogComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

  /** student that emits when the component has been destroyed. */


  student: any;

  searchMeetingControl = new FormControl();
  studentForm: FormGroup
  constructor(
    public dialogRef: MatDialogRef<AddStudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: UntypedFormBuilder,
    private studentService : StudentsService,
    private toast :ToastrService


  ) {
    console.log(data)
  }

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(5)]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['STUDENT'],
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
      currentInstitution: [''],
      currentStudyLevel: [''],
      enrollmentYear: [''],
      studyField: ['']
    });
  }

  fermer(): void {
    this.dialogRef.close();
  }


  submit() {
    const loadingToast = this.toast.info('Loading...', 'Please wait', {
      closeButton: true,
    }); 
    let data = this.studentForm.value
    this.studentService.createStudent(data).subscribe({
      next:(res)=>{
        this.toast.clear(loadingToast.toastId);

        this.toast.success('Student added Successfully', 'Success', {
          progressBar: true,
          closeButton: true,
        });
      },

      error:(err)=>{
        console.log(err)
        this.toast.clear(loadingToast.toastId);
        this.toast.error('Add student Failed', 'Error', {
         progressBar: true,
         closeButton: true,
       });      }
    })
  }





  ngOnInit(): void {
    this.studentForm = this.createContactForm()
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
  }


}

