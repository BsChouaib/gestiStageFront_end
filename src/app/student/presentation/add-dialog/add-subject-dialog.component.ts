import {  MatDialogRef, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelect } from "@angular/material/select";

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SubjectAdminService } from 'src/app/Services/admin/subject-admin.service';
import { ToastrService } from 'ngx-toastr';
import { UniversityService } from 'src/app/Services/university.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-subject-dialog',
  templateUrl: './add-subject-dialog.component.html',
  styleUrls: ['./add-subject-dialog.component.sass'],
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, FormsModule,
    ReactiveFormsModule, MatIconModule, MatDialogModule,CommonModule],
    providers:[SubjectAdminService]
})
export class AddSubjectDialogComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */


  subject: any;

  searchMeetingControl = new FormControl();
  subjectForm: FormGroup
  constructor(
    public dialogRef: MatDialogRef<AddSubjectDialogComponent>,
    private fb: UntypedFormBuilder,
    private subjectService : SubjectAdminService,
    private toast :ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) {
    console.log(data)
  }

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      title:  [''],
      description:  [''],
      internshipType: [''],
      teacherEmail: [''],
      StudyFieldId:[null]
    });
  }

  fermer(): void {
    this.dialogRef.close();
  }


  submit() {
    const loadingToast = this.toast.info('Loading...', 'Please wait', {
      closeButton: true,
    }); 
    let data = this.subjectForm.value
   
    this.subjectService.createSubject(data).subscribe({
      next:(res)=>{
        this.toast.clear(loadingToast.toastId);

        this.toast.success('Subject added Successfully', 'Success', {
          progressBar: true,
          closeButton: true,
        });
      },

      error:(err)=>{
        console.log(err)
        this.toast.clear(loadingToast.toastId);
        this.toast.error('Add Subject Failed', 'Error', {
         progressBar: true,
         closeButton: true,
       });      }
    })
  }





  ngOnInit(): void {
    this.subjectForm = this.createContactForm()

  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
  }


}

