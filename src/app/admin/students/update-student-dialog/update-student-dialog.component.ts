import { MAT_DIALOG_DATA, MatDialogRef, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup,  FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatSelect } from "@angular/material/select";

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { StudentModule } from 'src/app/student/student.module';
import { StudentsService } from 'src/app/Services/students.service';

@Component({
  selector: 'app-update-student-dialog',
  templateUrl: './update-student-dialog.component.html',
  styleUrls: ['./update-student-dialog.component.sass'],
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, FormsModule,
    ReactiveFormsModule, MatIconModule, MatDialogModule,MatFormFieldModule,CommonModule],
    providers:[StudentsService]
})
export class UpdateStudentDialogComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

  /** student that emits when the component has been destroyed. */


  student: any;

  searchMeetingControl = new FormControl();
  studentForm: FormGroup
  constructor(
    public dialogRef: MatDialogRef<UpdateStudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: UntypedFormBuilder,
    private studentService : StudentsService,
    private toast :ToastrService

  ) {
    this.student = data
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      email: [this.student?.email, [Validators.required, Validators.email, Validators.minLength(5)]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['STUDENT'],
      city: [''],
      country: [''],
      dateofbirth: [''],
      firstname: [this.student?.firstname,[Validators.required,Validators.minLength(3)]],
      gender: [''],
      lastname: [this.student?.lastname,[Validators.required,Validators.minLength(3)]],
      nationality: [''],
      phonenumber: [this.student?.phonenumber],
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
    this.studentService.updateStudent(this.student?.id,this.studentForm.value).subscribe({
      next:(res)=>{
        this.toast.clear(loadingToast.toastId);

        this.toast.success('student updated Successfully', 'Success', {
          progressBar: true,
          closeButton: true,
        });
      },

      error:(err)=>{
          console.log(err)
          this.toast.clear(loadingToast.toastId);
          this.toast.error('Update student Failed', 'Error', {
           progressBar: true,
           closeButton: true,
         });
      }
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

