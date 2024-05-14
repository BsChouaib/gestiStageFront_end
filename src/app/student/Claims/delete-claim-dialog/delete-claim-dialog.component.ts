import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators, FormArray, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ReplaySubject, Subject, take, takeUntil, finalize, Subscription, Observable } from "rxjs";
import { MatSelect } from "@angular/material/select";
import { HttpEventType } from "@angular/common/http";
import { MatChipInputEvent } from '@angular/material/chips';
import { UntypedFormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { map, startWith } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SubjectAdminService } from 'src/app/Services/admin/subject-admin.service';
import { ToastrService } from 'ngx-toastr';
import { ClaimsService } from 'src/app/Services/claims.service';

@Component({
  selector: 'app-delete-claim-dialog',
  templateUrl: './delete-claim-dialog.component.html',
  styleUrls: ['./delete-claim-dialog.component.sass'],
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, FormsModule,
    ReactiveFormsModule, MatIconModule, MatDialogModule],
    providers:[SubjectAdminService]
})
export class DeleteClaimDialogComponent implements OnInit, OnDestroy {

  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */


  claim: any;

  searchMeetingControl = new FormControl();
  subjectForm: FormGroup
  constructor(
    public dialogRef: MatDialogRef<DeleteClaimDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private claimService : ClaimsService,
    private toast :ToastrService


  ) {
    this.claim = data
  }
 

  fermer(): void {
    this.dialogRef.close();
  }


  submit() {
    const loadingToast = this.toast.info('Loading...', 'Please wait', {
      closeButton: true,
    });    
    let id =this.claim.claimId
    this.claimService.deleteClaims(id).subscribe({
      next:(res)=>{
        this.toast.clear(loadingToast.toastId);

        this.toast.success('Claim deleted Successfully', 'Success', {
          progressBar: true,
          closeButton: true,
        });
      },

      error:(err)=>{
          console.log(err)
          this.toast.clear(loadingToast.toastId);
          this.toast.error('Delete Claim Failed', 'Error', {
           progressBar: true,
           closeButton: true,
         });
      }
    })
  }





  ngOnInit(): void {
  }

  ngOnDestroy() {
  }


}

