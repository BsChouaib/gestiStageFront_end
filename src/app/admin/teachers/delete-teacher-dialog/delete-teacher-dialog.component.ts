import { MAT_DIALOG_DATA, MatDialogRef, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelect } from "@angular/material/select";

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { TeachersService } from 'src/app/Services/teachers.service';

@Component({
  selector: 'app-delete-teacher-dialog',
  templateUrl: './delete-teacher-dialog.component.html',
  styleUrls: ['./delete-teacher-dialog.component.sass'],
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, FormsModule,
    ReactiveFormsModule, MatIconModule, MatDialogModule],
    providers:[TeachersService]
})
export class DeleteTeacherDialogComponent implements OnInit, OnDestroy {

  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

  /** teacher that emits when the component has been destroyed. */


  teacher: any;

  searchMeetingControl = new FormControl();
  teacherForm: FormGroup
  constructor(
    public dialogRef: MatDialogRef<DeleteTeacherDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private teacherService : TeachersService,
    private toast :ToastrService


  ) {
    this.teacher = data
  }
 

  fermer(): void {
    this.dialogRef.close();
  }


  submit() {
    const loadingToast = this.toast.info('Loading...', 'Please wait', {
      closeButton: true,
    });    
    let id =this.teacher.id
    this.teacherService.deleteTeacher(id).subscribe({
      next:(res)=>{
        this.toast.clear(loadingToast.toastId);

        this.toast.success('Teacher deleted Successfully', 'Success', {
          progressBar: true,
          closeButton: true,
        });
      },

      error:(err)=>{
          console.log(err)
          this.toast.clear(loadingToast.toastId);
          this.toast.error('Delete Teacher Failed', 'Error', {
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

