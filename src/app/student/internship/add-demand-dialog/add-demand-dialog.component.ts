import {  MatDialogRef, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelect } from "@angular/material/select";

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SubjectAdminService } from 'src/app/Services/admin/subject-admin.service';
import { ToastrService } from 'ngx-toastr';
import { ClaimsService } from 'src/app/Services/claims.service';
import { MatInputModule } from '@angular/material/input';
import { DemandService } from 'src/app/Services/demand.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-demand-dialog',
  templateUrl: './add-demand-dialog.component.html',
  styleUrls: ['./add-demand-dialog.component.scss'],
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, FormsModule,
    ReactiveFormsModule, MatIconModule, MatDialogModule,CommonModule],
    providers:[DemandService]
})
export class AddDemandDialogComponent implements OnInit, OnDestroy, AfterViewInit {

  subject: any;

  searchMeetingControl = new FormControl();
  demandForm: FormGroup
  constructor(
    public dialogRef: MatDialogRef<AddDemandDialogComponent>,
    private fb: UntypedFormBuilder,
    private demandService : DemandService,
    private toast :ToastrService,
    @Inject(MAT_DIALOG_DATA) public subjectData: any,



  ) {
    console.log(subjectData)
  }

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      cv:  ['',Validators.required],
      cover_letter:[''],
      subjectId:[this.subjectData?.subjectId]
    });
  }

  fermer(): void {
    this.dialogRef.close();
  }


  submit() {
    const loadingToast = this.toast.info('Loading...', 'Please wait', {
      closeButton: true,
    }); 
    let data = this.demandForm.value
    const formData = new FormData();
    formData.append("resume", data.cv);
    formData.append("motivationLetter", data.cover_letter);
     this.demandService.createDemand(data,formData).subscribe({
      next:(res)=>{
        this.toast.clear(loadingToast.toastId);

        this.toast.success('Demand created Successfully', 'Success', {
          progressBar: true,
          closeButton: true,
        });
      },

      error:(err)=>{
        console.log(err)
        this.toast.clear(loadingToast.toastId);
        this.toast.error('Create Demand Failed', 'Error', {
         progressBar: true,
         closeButton: true,
       });      }
    }) 
  }

  onFileChange(event: any) {
    console.log(event)
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.demandForm.patchValue({
        cv: file
      });
    }
  }
  onCLChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.demandForm.patchValue({
        cover_letter: file
      });
    }
  }
  removeCV() {
    this.demandForm.patchValue({
      cv: null
    });
    (document.getElementById('cvInput') as HTMLInputElement).value = '';
  }
  removeCL() {
    this.demandForm.patchValue({
      cover_letter: null
    });
    (document.getElementById('clInput') as HTMLInputElement).value = '';
  }
  ngOnInit(): void {
    this.demandForm = this.createContactForm()
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
  }


}

