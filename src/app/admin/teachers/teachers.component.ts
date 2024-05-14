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
import { UpdateTeacherDialogComponent } from './update-teacher-dialog/update-teacher-dialog.component';
import { DeleteTeacherDialogComponent } from './delete-teacher-dialog/delete-teacher-dialog.component';
import { AddTeacherDialogComponent } from './add-teacher-dialog/add-teacher-dialog.component';
import { TeachersService } from 'src/app/Services/teachers.service';
@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [SharedModule,MatTableModule,MatPaginator,MatMenuModule,MatIconModule,MatButtonModule,MatDialogModule,MatTooltipModule],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.scss',
  providers:[TeachersService]

})
export default class TeachersComponent implements OnInit,OnDestroy{

  displayedColumns: string[] = ['fname', 'lname', 'email','action'];
  dataSource :MatTableDataSource<any>;

  constructor(private teacherService : TeachersService, private dialog: MatDialog,  private toast: ToastrService
  ){

  }
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;


  ngOnInit() {
    this.getAllTeachers()
  }
  ngAfterViewInit() {
    /* this.dataSource = new MatTableDataSource([])
    this.dataSource.paginator= this.paginator */
  }

  getAllTeachers(){
    this.teacherService.getAllTeachers().subscribe({
      next:(res)=>{

       this.dataSource = new MatTableDataSource(res.data)
       this.dataSource.paginator = this.paginator
      },

      error:(err)=>{
          console.log(err)
      }
    })
  }
  updateTeacher(teacher){
    console.log('activ')
    const dialogRef = this.dialog.open(UpdateTeacherDialogComponent, {
      data:teacher,
      width:'700px'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
      this.getAllTeachers()
      }
    });
  }
  deleteTeacher(teacher){
    const dialogRef = this.dialog.open(DeleteTeacherDialogComponent, {
      data:teacher,
      width:'500px'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
      this.getAllTeachers()
      }
    });
  }
  addTeacher(){
    const dialogRef = this.dialog.open(AddTeacherDialogComponent, {
      width:'700px'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
      this.getAllTeachers()
      }
    });
  }
  ngOnDestroy() {
    this.toast.clear()  }

}
