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

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.sass'],
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, FormsModule,
    ReactiveFormsModule, MatIconModule, MatDialogModule],
    providers:[SubjectAdminService]
})
export class FormDialogComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */


  subject: any;

  searchMeetingControl = new FormControl();
  subjectForm: FormGroup
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: UntypedFormBuilder,
    private subjectService : SubjectAdminService,
    private toast :ToastrService

  ) {
    this.subject = data
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      subjectId: [this.subject?.subjectId],
      title: [this.subject?.title],
      description: [this.subject?.description],
      internshipType: [this.subject?.internshipType],
      teacherEmail: [this.subject?.temail]
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
    let id =this.subjectForm.value.subjectId
    delete data.subjectId;
    this.subjectService.updateSubject(id,data).subscribe({
      next:(res)=>{
        this.toast.clear(loadingToast.toastId);

        this.toast.success('Subject updated Successfully', 'Success', {
          progressBar: true,
          closeButton: true,
        });
      },

      error:(err)=>{
          console.log(err)
          this.toast.clear(loadingToast.toastId);
          this.toast.error('Update Subject Failed', 'Error', {
           progressBar: true,
           closeButton: true,
         });
      }
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

