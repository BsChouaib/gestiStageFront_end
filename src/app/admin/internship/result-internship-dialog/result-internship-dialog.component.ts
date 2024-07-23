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
  selector: 'app-result-internship-dialog',
  templateUrl: './result-internship-dialog.component.html',
  styleUrls: ['./result-internship-dialog.component.sass'],
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, FormsModule,
    ReactiveFormsModule, MatIconModule, MatDialogModule,MatFormFieldModule,CommonModule],
    providers:[]
})
export class ResultInternshipDialogComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

  /** internship that emits when the component has been destroyed. */


  internship: any;

  searchMeetingControl = new FormControl();
  internshipForm: FormGroup
  constructor(
    public dialogRef: MatDialogRef<ResultInternshipDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: UntypedFormBuilder,
    private toast :ToastrService

  ) {
    this.internship = data
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      email: [this.internship?.email, [Validators.required, Validators.email, Validators.minLength(5)]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['STUDENT'],
      city: [''],
      country: [''],
      dateofbirth: [''],
      firstname: [this.internship?.firstname,[Validators.required,Validators.minLength(3)]],
      gender: [''],
      lastname: [this.internship?.lastname,[Validators.required,Validators.minLength(3)]],
      nationality: [''],
      phonenumber: [this.internship?.phonenumber],
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
    this.internshipForm = this.createContactForm()
    console.log(this.internship)
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
  }


}

