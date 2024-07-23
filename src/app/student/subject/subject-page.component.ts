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
import { AddDemandDialogComponent } from './add-demand-dialog/add-demand-dialog.component';
import { AddSubjectDialogComponent } from './add-dialog/add-subject-dialog.component';
import { UniversityService } from 'src/app/Services/university.service';
import { DemandService } from 'src/app/Services/demand.service';

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
  studyFieldsList:any
  hasDemand :boolean=false
  constructor(private subjectService : SubjectAdminService, private dialog: MatDialog,  private toast: ToastrService,private univService:UniversityService,private demandService:DemandService
  ){

  }
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;


  ngOnInit() {
    this.getAllSubjects()
    this.getAllStudyFields()
    this.getAlldemands()
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
  getAlldemands() {
    this.demandService.getAllDemand().subscribe({
      next: (res) => {

        let demands = res.data.demands
        this.hasDemand = demands.some(x => x.status === "Pending")
      },

      error: (err) => {
        console.log(err)
      }
    })
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
  addSubject(){
    const dialogRef = this.dialog.open(AddSubjectDialogComponent, {
      width:'700px',
      data:this.studyFieldsList
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
      this.getAllSubjects()
      }
    });
  }
  getAllStudyFields() {
    this.univService.getAllStudyFields().subscribe({
      next: (res) => {
        this.studyFieldsList = res?.data.StudyField;
      },

      error: (err) => {
        console.log(err);
      }
    });
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
  } */
  addDemand(subject){
    const dialogRef = this.dialog.open(AddDemandDialogComponent, {
      width:'700px',
      data:subject,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
      this.getAllSubjects()
      }
    });
  }
  ngOnDestroy() {
    this.toast.clear()  }

}
