import { MAT_DIALOG_DATA, MatDialogRef, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup,  FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatSelect } from "@angular/material/select";

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details-presentation-dialog',
  templateUrl: './details-presentation-dialog.component.html',
  styleUrls: ['./details-presentation-dialog.component.sass'],
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, FormsModule,
    ReactiveFormsModule, MatIconModule, MatDialogModule,MatFormFieldModule,CommonModule],
    providers:[]
})
export class DetailsPresentationDialogComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

  /** presentation that emits when the component has been destroyed. */


  presentation: any;

  searchMeetingControl = new FormControl();
  presentationForm: FormGroup
  constructor(
    public dialogRef: MatDialogRef<DetailsPresentationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: UntypedFormBuilder,
    private toast :ToastrService

  ) {
    this.presentation = data
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      email: [this.presentation?.email, [Validators.required, Validators.email, Validators.minLength(5)]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['STUDENT'],
      city: [''],
      country: [''],
      dateofbirth: [''],
      firstname: [this.presentation?.firstname,[Validators.required,Validators.minLength(3)]],
      gender: [''],
      lastname: [this.presentation?.lastname,[Validators.required,Validators.minLength(3)]],
      nationality: [''],
      phonenumber: [this.presentation?.phonenumber],
      postaladdress: [''],
      postalcode: [''],
      currentInstitution: [''],
      currentStudyLevel: [''],
      enrollmentYear: [''],
      studyField: ['']
    });
  }

  fermer(): void {
    this.dialogRef.close();
  }


  submit() {
   
  }





  ngOnInit(): void {
    this.presentationForm = this.createContactForm()
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
  }


}

