import { MAT_DIALOG_DATA, MatDialogRef, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelect } from "@angular/material/select";

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { StudentsService } from 'src/app/Services/students.service';

@Component({
  selector: 'app-delete-student-dialog',
  templateUrl: './delete-student-dialog.component.html',
  styleUrls: ['./delete-student-dialog.component.sass'],
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, FormsModule,
    ReactiveFormsModule, MatIconModule, MatDialogModule],
    providers:[StudentsService]
})
export class DeleteStudentDialogComponent implements OnInit, OnDestroy {

  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

  /** student that emits when the component has been destroyed. */


  student: any;

  searchMeetingControl = new FormControl();
  studentForm: FormGroup
  constructor(
    public dialogRef: MatDialogRef<DeleteStudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private studentService : StudentsService,
    private toast :ToastrService


  ) {
    this.student = data
  }
 

  fermer(): void {
    this.dialogRef.close();
  }


  submit() {
    const loadingToast = this.toast.info('Loading...', 'Please wait', {
      closeButton: true,
    });    
    let id =this.student.id
    this.studentService.deleteStudent(id).subscribe({
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
          this.toast.error('Delete student Failed', 'Error', {
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

