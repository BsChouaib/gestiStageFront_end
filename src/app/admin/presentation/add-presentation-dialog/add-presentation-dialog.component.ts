import {  MatDialogRef, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AfterViewInit, Component, EventEmitter, Inject, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelect } from "@angular/material/select";

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PresentaionService } from 'src/app/Services/presentation.service';

@Component({
  selector: 'app-add-presentation-dialog',
  templateUrl: './add-presentation-dialog.component.html',
  styleUrls: ['./add-presentation-dialog.component.sass'],
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, FormsModule,
    ReactiveFormsModule, MatIconModule, MatDialogModule,CommonModule,MatFormFieldModule],
    providers:[PresentaionService]
})
export class AddPresentationDialogComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

  /** presentation that emits when the component has been destroyed. */


  presentation: any;

  searchMeetingControl = new FormControl();
  presentationForm: FormGroup
  constructor(
    public dialogRef: MatDialogRef<AddPresentationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: UntypedFormBuilder,
    private toast :ToastrService,
    private presService : PresentaionService

  ) {
    console.log(data)
  }

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      presentationTitle: [this.data?.title, [Validators.required, Validators.minLength(5)]],
      presentationStartTime: ['', Validators.required],
      presentationEndTime: ['', Validators.required],
      presentationDate: ['', Validators.required],
      location: ['', Validators.required],
      external: [false],
    });
  }

  fermer(): void {
    this.dialogRef.close();
  }


  submit() {
    //this.presentationAdded.emit();
    this.dialogRef.close();
    const loadingToast = this.toast.info('Loading...', 'Please wait', {
      closeButton: true,
    }); 
   
    this.presService.createPresentation(this.data?.internshipId,this.presentationForm.value).subscribe({
      next:(res)=>{
        this.toast.clear(loadingToast.toastId);

        this.toast.success('Presentation added Successfully', 'Success', {
          progressBar: true,
          closeButton: true,
        });
      },

      error:(err)=>{
        console.log(err)
        this.toast.clear(loadingToast.toastId);
        this.toast.error('Add Presentation Failed', 'Error', {
         progressBar: true,
         closeButton: true,
       });      }
    }) 
  }





  ngOnInit(): void {
    this.presentationForm = this.createContactForm()
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
  }


}

