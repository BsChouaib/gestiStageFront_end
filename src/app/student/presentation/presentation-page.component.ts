// angular import
import { HttpClientModule } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
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
import { AddDemandDialogComponent } from './add-demand-dialog/add-demand-dialog.component';
import { UniversityService } from 'src/app/Services/university.service';
import { DemandService } from 'src/app/Services/demand.service';
import { PresentaionService } from 'src/app/Services/presentation.service';

@Component({
  selector: 'app-presentation-student-page',
  standalone: true,
  imports: [SharedModule,MatTableModule,MatPaginator,MatMenuModule,MatIconModule,MatButtonModule,MatDialogModule,MatTooltipModule],
  templateUrl: './presentation-page.component.html',
  styleUrls: ['./presentation-page.component.scss'],
  providers:[PresentaionService],
  encapsulation: ViewEncapsulation.None
})
export default class PresentationStudentComponent implements AfterViewInit,OnInit,OnDestroy{
  
  displayedColumns: string[] = ['title', 'description', 'internshipType', 'teacher','action'];
  dataSource :MatTableDataSource<any>;
  length = 0;
  pageSize = 6;
  pageIndex = 0;
  Presentations: any[] = [];
  paginatedPresentations: any[] = [];
  
  constructor(private presentationService : PresentaionService, private dialog: MatDialog,  private toast: ToastrService,private univService:UniversityService,private demandService:DemandService
  ){

  }
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;


  ngOnInit() {
    this.getAllPresentations()
 
  }
  ngAfterViewInit() {
    /* this.dataSource = new MatTableDataSource([])
    this.dataSource.paginator= this.paginator */
  }

  getAllPresentations(){
    this.presentationService.getAllPresentations().subscribe({
      next: (res) => {
        this.Presentations = res.data;
        this.length = res.data.length;
        //this.paginatePresentations();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
 
   paginatePresentations() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedPresentations = this.Presentations.slice(start, end);
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.paginatePresentations();
  }
 
 /*  updatePresentation(presentation){
    console.log('activ')
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data:presentation,
      width:'700px'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
      this.getAllPresentations()
      }
    });
  }
  deletePresentation(presentation){
    const dialogRef = this.dialog.open(DeletePresentationDialogComponent, {
      data:presentation,
      width:'500px'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
      this.getAllPresentations()
      }
    });
  } */
  addDemand(presentation){
    const dialogRef = this.dialog.open(AddDemandDialogComponent, {
      width:'700px',
      data:presentation,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
      this.getAllPresentations()
      }
    });
  }
  ngOnDestroy() {
    this.toast.clear()  }

}
