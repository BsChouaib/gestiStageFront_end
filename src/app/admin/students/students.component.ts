import {  Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog,MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ToastrService } from 'ngx-toastr';

import { StudentsService } from 'src/app/Services/students.service';
import { UpdateStudentDialogComponent } from './update-student-dialog/update-student-dialog.component';
import { DeleteStudentDialogComponent } from './delete-teacher-dialog/delete-student-dialog.component';
import { AddStudentDialogComponent } from './add-teacher-dialog/add-student-dialog.component';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [SharedModule,MatTableModule,MatPaginator,MatMenuModule,MatIconModule,MatButtonModule,MatDialogModule,MatTooltipModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
  providers:[StudentsService]

})
export default class StudentsComponent implements OnInit,OnDestroy{

  displayedColumns: string[] = ['fname', 'lname', 'email','action'];
  dataSource :MatTableDataSource<any>;

  constructor(private studentService : StudentsService, private dialog: MatDialog,  private toast: ToastrService
  ){

  }
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;


  ngOnInit() {
    this.getAllStudents()
  }
  ngAfterViewInit() {
    /* this.dataSource = new MatTableDataSource([])
    this.dataSource.paginator= this.paginator */
  }

  getAllStudents(){
    this.studentService.getAllStudents().subscribe({
      next:(res)=>{

       this.dataSource = new MatTableDataSource(res.data)
       this.dataSource.paginator = this.paginator
      },

      error:(err)=>{
          console.log(err)
      }
    })
  }
  updateStudent(Student){
    console.log('activ')
    const dialogRef = this.dialog.open(UpdateStudentDialogComponent, {
      data:Student,
      width:'700px'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
      this.getAllStudents()
      }
    });
  }
  deleteStudent(Student){
    const dialogRef = this.dialog.open(DeleteStudentDialogComponent, {
      data:Student,
      width:'500px'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
      this.getAllStudents()
      }
    });
  }
  addStudent(){
    const dialogRef = this.dialog.open(AddStudentDialogComponent, {
      width:'700px'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
      this.getAllStudents()
      }
    });
  }
  ngOnDestroy() {
    this.toast.clear()  }

}
