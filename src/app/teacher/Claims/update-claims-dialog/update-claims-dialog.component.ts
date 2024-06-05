import {  MatDialogRef, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelect } from "@angular/material/select";

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SubjectAdminService } from 'src/app/Services/admin/subject-admin.service';
import { ToastrService } from 'ngx-toastr';
import { ClaimsService } from 'src/app/Services/claims.service';

@Component({
  selector: 'app-update-claims-dialog',
  templateUrl: './update-claims-dialog.component.html',
  styleUrls: ['./update-claims-dialog.component.sass'],
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, FormsModule,
    ReactiveFormsModule, MatIconModule, MatDialogModule],
    providers:[SubjectAdminService]
})
export class UpdateClaimDialogComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */


  claims: any;

  searchMeetingControl = new FormControl();
  subjectForm: FormGroup
  constructor(
    public dialogRef: MatDialogRef<UpdateClaimDialogComponent>,
    private fb: UntypedFormBuilder,
    private claimsService : ClaimsService,
    private toast :ToastrService,
    @Inject(MAT_DIALOG_DATA) public claim: any,



  ) {
    this.claims=claim
  }

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      description:  [''],
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
    this.claimsService.updateClaims(this.claims.claimId,data).subscribe({
      next:(res)=>{
        this.toast.clear(loadingToast.toastId);

        this.toast.success('Claim update Successfully', 'Success', {
          progressBar: true,
          closeButton: true,
        });
      },

      error:(err)=>{
        console.log(err)
        this.toast.clear(loadingToast.toastId);
        this.toast.error('Update Claim Failed', 'Error', {
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

