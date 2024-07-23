import { MAT_DIALOG_DATA, MatDialogRef, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup,  FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatSelect } from "@angular/material/select";

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, DatePipe } from '@angular/common';
import { PresentaionService } from 'src/app/Services/presentation.service';

@Component({
  selector: 'app-update-presentation-dialog',
  templateUrl: './update-presentation-dialog.component.html',
  styleUrls: ['./update-presentation-dialog.component.sass'],
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, FormsModule,
    ReactiveFormsModule, MatIconModule, MatDialogModule,MatFormFieldModule,CommonModule],
    providers:[PresentaionService,DatePipe]
})
export class UpdatePresentationDialogComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

  /** presentation that emits when the component has been destroyed. */


  presentation: any;

  searchMeetingControl = new FormControl();
  presentationForm: FormGroup
  constructor(
    public dialogRef: MatDialogRef<UpdatePresentationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: UntypedFormBuilder,
    private presentationService : PresentaionService,
    private toast :ToastrService,
    private datePipe: DatePipe

  ) {
    this.presentation = data
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      presentationTitle: [this.presentation?.presentationTitle, [Validators.required, Validators.minLength(5)]],
      presentationStartTime: [this.formatDateTime(this.presentation?.presentationStartTime), Validators.required],
      presentationEndTime: [this.formatDateTime(this.presentation?.presentationEndTime), Validators.required],
      presentationDate: [this.formatDate(this.presentation?.presentationDate), Validators.required],
      location: [this.presentation?.location, Validators.required],
      external: [this.presentation?.external],

    });
  }

  fermer(): void {
    this.dialogRef.close();
  }


  submit() {
    const loadingToast = this.toast.info('Loading...', 'Please wait', {
      closeButton: true,
    });    
    this.presentationService.updatePresentation(this.presentation?.presentationId,this.presentationForm.value).subscribe({
      next:(res)=>{
        this.toast.clear(loadingToast.toastId);

        this.toast.success('Presentation updated Successfully', 'Success', {
          progressBar: true,
          closeButton: true,
        });
      },

      error:(err)=>{
          console.log(err)
          this.toast.clear(loadingToast.toastId);
          this.toast.error('Update presentation Failed', 'Error', {
           progressBar: true,
           closeButton: true,
         });
      }
    })
  }

  formatDate(dateString: string): string | null {
    if (!dateString) return null;
    return this.datePipe.transform(dateString, 'yyyy-MM-dd');
  }
  formatDateTime(dateString: string): string | null {
    if (!dateString) return null;
    return this.datePipe.transform(dateString, 'yyyy-MM-dd hh:mm');
  }


  ngOnInit(): void {
    this.presentationForm = this.createContactForm()
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
  }


}

