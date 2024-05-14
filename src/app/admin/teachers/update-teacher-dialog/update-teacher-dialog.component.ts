import { MAT_DIALOG_DATA, MatDialogRef, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup,  FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatSelect } from "@angular/material/select";

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { TeachersService } from 'src/app/Services/teachers.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-teacher-dialog',
  templateUrl: './update-teacher-dialog.component.html',
  styleUrls: ['./update-teacher-dialog.component.sass'],
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, FormsModule,
    ReactiveFormsModule, MatIconModule, MatDialogModule,MatFormFieldModule,CommonModule],
    providers:[TeachersService]
})
export class UpdateTeacherDialogComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

  /** teacher that emits when the component has been destroyed. */


  teacher: any;

  searchMeetingControl = new FormControl();
  teacherForm: FormGroup
  constructor(
    public dialogRef: MatDialogRef<UpdateTeacherDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: UntypedFormBuilder,
    private teacherService : TeachersService,
    private toast :ToastrService

  ) {
    this.teacher = data
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      email: [this.teacher?.email, [Validators.required, Validators.email, Validators.minLength(5)]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['TEACHER'],
      city: [''],
      country: [''],
      dateofbirth: [''],
      firstname: [this.teacher?.firstname,[Validators.required,Validators.minLength(3)]],
      gender: [''],
      lastname: [this.teacher?.lastname,[Validators.required,Validators.minLength(3)]],
      nationality: [''],
      phonenumber: [this.teacher?.phonenumber],
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
    this.teacherService.updateTeacher(this.teacher?.id,this.teacherForm.value).subscribe({
      next:(res)=>{
        this.toast.clear(loadingToast.toastId);

        this.toast.success('teacher updated Successfully', 'Success', {
          progressBar: true,
          closeButton: true,
        });
      },

      error:(err)=>{
          console.log(err)
          this.toast.clear(loadingToast.toastId);
          this.toast.error('Update teacher Failed', 'Error', {
           progressBar: true,
           closeButton: true,
         });
      }
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

