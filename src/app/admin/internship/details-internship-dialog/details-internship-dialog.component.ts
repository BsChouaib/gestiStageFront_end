import { MAT_DIALOG_DATA, MatDialogRef, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelect } from "@angular/material/select";

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details-internship-dialog',
  templateUrl: './details-internship-dialog.component.html',
  styleUrls: ['./details-internship-dialog.component.sass'],
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, FormsModule,
    ReactiveFormsModule, MatIconModule, MatDialogModule,CommonModule],
    providers:[]
})
export class DetailsInternshipDialogComponent implements OnInit, OnDestroy {

  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

  /** internship that emits when the component has been destroyed. */


  internship: any;

  searchMeetingControl = new FormControl();
  internshipForm: FormGroup
  constructor(
    public dialogRef: MatDialogRef<DetailsInternshipDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toast :ToastrService


  ) {
    this.internship = data
  }
 

  fermer(): void {
    this.dialogRef.close();
  }


  submit() {
   /*  const loadingToast = this.toast.info('Loading...', 'Please wait', {
      closeButton: true,
    });    
    let id =this.internship.id
    this.internshipService.deleteStudent(id).subscribe({
      next:(res)=>{
        this.toast.clear(loadingToast.toastId);

        this.toast.success('Student deleted Successfully', 'Success', {
          progressBar: true,
          closeButton: true,
        });
      },

      error:(err)=>{
          console.log(err)
          this.toast.clear(loadingToast.toastId);
          this.toast.error('Delete internship Failed', 'Error', {
           progressBar: true,
           closeButton: true,
         });
      }
    }) */
  }





  ngOnInit(): void {
  }

  ngOnDestroy() {
  }


}

