import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators, FormArray, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ReplaySubject, Subject, take, takeUntil, finalize, Subscription, Observable } from "rxjs";
import { MatSelect } from "@angular/material/select";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { InternshipService } from 'src/app/Services/internship.service';

@Component({
  selector: 'app-delete-internship-dialog',
  templateUrl: './delete-internship-dialog.component.html',
  styleUrls: ['./delete-internship-dialog.component.sass'],
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, FormsModule,
    ReactiveFormsModule, MatIconModule, MatDialogModule],
    providers:[InternshipService]
})
export class DeleteInternshipDialogComponent implements OnInit, OnDestroy {

  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */


  internship: any;

  searchMeetingControl = new FormControl();
  subjectForm: FormGroup
  constructor(
    public dialogRef: MatDialogRef<DeleteInternshipDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toast :ToastrService,
    private internshipService: InternshipService

  ) {
    this.internship = data
  }
 

  fermer(): void {
    this.dialogRef.close();
  }


  submit() {
    const loadingToast = this.toast.info('Loading...', 'Please wait', {
      closeButton: true,
    });    
    let id =this.internship.internshipId
    this.internshipService.deleteInternship(id).subscribe({
      next:(res)=>{
        this.toast.clear(loadingToast.toastId);

        this.toast.success('Internship deleted Successfully', 'Success', {
          progressBar: true,
          closeButton: true,
        });
      },

      error:(err)=>{
          console.log(err)
          this.toast.clear(loadingToast.toastId);
          this.toast.error('Delete Internship Failed', 'Error', {
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

