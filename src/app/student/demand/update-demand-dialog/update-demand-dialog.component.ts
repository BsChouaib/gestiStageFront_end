import {  MatDialogRef, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelect } from "@angular/material/select";

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SubjectAdminService } from 'src/app/Services/admin/subject-admin.service';
import { ToastrService } from 'ngx-toastr';
import { DemandService } from 'src/app/Services/demand.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-demand-dialog',
  templateUrl: './update-demand-dialog.component.html',
  styleUrls: ['./update-demand-dialog.component.sass'],
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, FormsModule,
    ReactiveFormsModule, MatIconModule, MatDialogModule,CommonModule],
    providers:[DemandService]
})
export class UpdateDemandDialogComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */


  demands: any;

  searchMeetingControl = new FormControl();
  demandForm: FormGroup
  cover_letter:string=''
  resume:string=''
  constructor(
    public dialogRef: MatDialogRef<UpdateDemandDialogComponent>,
    private fb: UntypedFormBuilder,
    private demandService : DemandService,
    private toast :ToastrService,
    @Inject(MAT_DIALOG_DATA) public demand: any,



  ) {
    this.demands=demand
    console.log(demand)
    this.cover_letter=demand.motivationLetter?.fileName
    this.resume=demand.resume?.fileName
  }

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      cv:  [null,Validators.required],
      cover_letter:[null],
      subjectId:[this.demands?.subject.subjectId],
      id:[this.demands?.demandId],
      email:[''],
    });
  }

  fermer(): void {
    this.dialogRef.close();
  }
  deleteResume(){
    this.resume=''
  }
  deleteCoverLetter(){
    this.cover_letter=''
  }
  submit() {
    const loadingToast = this.toast.info('Loading...', 'Please wait', {
      closeButton: true,
    }); 
    let data = this.demandForm.value
    console.log(data)
    const formData = new FormData();
    if(data.cv)
    formData.append("resume", data.cv);
    if(data.cover_letter)
    formData.append("coverLetter", data.cover_letter);
     this.demandService.updateDemand(data,formData).subscribe({
      next:(res)=>{
        this.toast.clear(loadingToast.toastId);
        this.toast.success('Demand updated Successfully', 'Success', {
          progressBar: true,
          closeButton: true,
        });
      },

      error:(err)=>{
        console.log(err)
        this.toast.clear(loadingToast.toastId);
        this.toast.error('Update Demand Failed', 'Error', {
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
    console.log(event)

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

