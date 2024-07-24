import { MAT_DIALOG_DATA, MatDialogRef, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { AfterViewInit, Component, Inject, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup,  FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatSelect } from "@angular/material/select";

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, DatePipe } from '@angular/common';
import { InternshipService } from 'src/app/Services/internship.service';

@Component({
  selector: 'app-update-internship-dialog',
  templateUrl: './update-internship-dialog.component.html',
  styleUrls: ['./update-internship-dialog.component.sass'],
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, FormsModule,
    ReactiveFormsModule, MatIconModule, MatDialogModule,MatFormFieldModule,CommonModule],
    providers:[InternshipService,DatePipe]
})
export class UpdateInternshipDialogComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

  /** internship that emits when the component has been destroyed. */


  internship: any;

  searchMeetingControl = new FormControl();
  internshipForm: FormGroup

  constructor(
    public dialogRef: MatDialogRef<UpdateInternshipDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: UntypedFormBuilder,
    private internshipService : InternshipService,
    private toast :ToastrService,
    private datePipe: DatePipe

  ) {
    this.internship = data
    console.log(this.internship )
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.internship?.internshipId],
      dateDebut: [this.formatDate(this.internship?.dateDebut), Validators.required],
      dateFin: [this.formatDate(this.internship?.dateFin), Validators.required],
      internshipJournal: [this.internship?.internshipJournal],
      internshipReport: [this.internship?.internshipReport],
      state: [this.internship?.state, Validators.required],
      titre: [this.internship?.titre, [Validators.required, Validators.minLength(5)]]
    });
  }
  fermer(): void {
    this.dialogRef.close();
  }

/* 
2023-07-23T15:30:00
  */
  submit() {
    console.log(this.internshipForm)
      const loadingToast = this.toast.info('Loading...', 'Please wait', {
      closeButton: true,
    });    
    let data = this.internshipForm.value
   // Format the dates before submitting
  data.dateDebut = this.formatDateForSubmission(data.dateDebut);
  data.dateFin = this.formatDateForSubmission(data.dateFin);
  
     const formData = new FormData();
    
    formData.append("internshipReport", data.internshipReport);
    formData.append("internshipJournal", data.internshipJournal); 
 
    this.internshipService.updateInternship(data,formData).subscribe({
      next:(res)=>{
        this.toast.clear(loadingToast.toastId);

        this.toast.success('internship updated Successfully', 'Success', {
          progressBar: true,
          closeButton: true,
        });
      },

      error:(err)=>{
          console.log(err)
          this.toast.clear(loadingToast.toastId);
          this.toast.error('Update internship Failed', 'Error', {
           progressBar: true,
           closeButton: true,
         });
      }
    })  
  }

  onChangeReport(event: any) {
   // console.log(event)
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.internship.patchValue({
        internshipReport: file
      });
    }
  }
  onChangeJournal(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.internship.patchValue({
        internshipJournal: file
      });
    }
  }
  removeReport() {
    this.internship.patchValue({
      internshipReport: null
    });
    (document.getElementById('cvInput') as HTMLInputElement).value = '';
  }
  removeJournal() {
    this.internship.patchValue({
      internshipJournal: null
    });
    (document.getElementById('clInput') as HTMLInputElement).value = '';
  }



  ngOnInit(): void {
    this.internshipForm = this.createContactForm()
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
  }

  formatDate(dateString: string): string | null {
    if (!dateString) return null;
    return this.datePipe.transform(dateString, 'yyyy-MM-dd');
  }
  formatDateForSubmission(date: Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    const hours = ('0' + d.getHours()).slice(-2);
    const minutes = ('0' + d.getMinutes()).slice(-2);
    const seconds = ('0' + d.getSeconds()).slice(-2);
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }
}

