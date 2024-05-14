// angular import
import { HttpClientModule } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SubjectAdminService } from 'src/app/Services/admin/subject-admin.service';
import {MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog,MatDialogModule} from '@angular/material/dialog';

import {MatTooltipModule} from '@angular/material/tooltip';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subject-student-page',
  standalone: true,
  imports: [SharedModule,MatTableModule,MatPaginator,MatMenuModule,MatIconModule,MatButtonModule,MatDialogModule,MatTooltipModule],
  templateUrl: './subject-page.component.html',
  styleUrls: ['./subject-page.component.scss'],
  providers:[SubjectAdminService],
  encapsulation: ViewEncapsulation.None
})
export default class SubjectStudentComponent implements AfterViewInit,OnInit,OnDestroy{
  
  displayedColumns: string[] = ['title', 'description', 'internshipType', 'teacher','action'];
  dataSource :MatTableDataSource<any>;
  length = 0;
  pageSize = 6;
  pageIndex = 0;
  Subjects: any[] = [];
  paginatedSubjects: any[] = [];

  constructor(private subjectService : SubjectAdminService, private dialog: MatDialog,  private toast: ToastrService
  ){

  }
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;


  ngOnInit() {
    this.getAllSubjects()
  }
  ngAfterViewInit() {
    /* this.dataSource = new MatTableDataSource([])
    this.dataSource.paginator= this.paginator */
  }

  getAllSubjects(){
    this.subjectService.getAllSubject().subscribe({
      next: (res) => {
        this.Subjects = res.data;
        this.length = res.data.length;
        this.paginateSubjects();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
   paginateSubjects() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedSubjects = this.Subjects.slice(start, end);
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.paginateSubjects();
  }
 /*  updateSubject(subject){
    console.log('activ')
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data:subject,
      width:'700px'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
      this.getAllSubjects()
      }
    });
  }
  deleteSubject(subject){
    const dialogRef = this.dialog.open(DeleteSubjectDialogComponent, {
      data:subject,
      width:'500px'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
      this.getAllSubjects()
      }
    });
  } 
  addSubject(){
    const dialogRef = this.dialog.open(AddSubjectDialogComponent, {
      width:'700px'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
      this.getAllSubjects()
      }
    });
  }*/
  ngOnDestroy() {
    this.toast.clear()  }

}
