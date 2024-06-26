// angular import
import { HttpClientModule } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SubjectAdminService } from 'src/app/Services/admin/subject-admin.service';
import {MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog,MatDialogModule} from '@angular/material/dialog';
import { FormDialogComponent } from './update-dialog/update-dialog.component';
import { DeleteSubjectDialogComponent } from './delete-dialog/delete-dialog.component';
import { AddSubjectDialogComponent } from './add-dialog/add-dialog.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sample-page',
  standalone: true,
  imports: [SharedModule,MatTableModule,MatPaginator,MatMenuModule,MatIconModule,MatButtonModule,MatDialogModule,MatTooltipModule],
  templateUrl: './sample-page.component.html',
  styleUrls: ['./sample-page.component.scss'],
  providers:[SubjectAdminService]
})
export default class SamplePageComponent implements AfterViewInit,OnInit,OnDestroy{
  
  displayedColumns: string[] = ['title', 'description', 'internshipType', 'teacher','action'];
  dataSource :MatTableDataSource<any>;

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
      next:(res)=>{

       this.dataSource = new MatTableDataSource(res.data)
       this.dataSource.paginator = this.paginator
      },

      error:(err)=>{
          console.log(err)
      }
    })
  }
  updateSubject(subject){
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
  }
  ngOnDestroy() {
    this.toast.clear()  }

}
