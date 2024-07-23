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
import { DemandService } from 'src/app/Services/demand.service';
import { InternshipService } from 'src/app/Services/internship.service';

@Component({
  selector: 'app-internship-student-page',
  standalone: true,
  imports: [SharedModule,MatTableModule,MatPaginator,MatMenuModule,MatIconModule,MatButtonModule,MatDialogModule,MatTooltipModule],
  templateUrl: './internship-page.component.html',
  styleUrls: ['./internship-page.component.scss'],
  providers:[InternshipService],
  encapsulation: ViewEncapsulation.None
})
export default class InternshipStudentComponent implements AfterViewInit,OnInit,OnDestroy{
  
  displayedColumns: string[] = ['title', 'description', 'internshipType', 'teacher','action'];
  dataSource :MatTableDataSource<any>;
  length = 0;
  pageSize = 6;
  pageIndex = 0;
  Internships: any[] = [];
  paginatedInternships: any[] = [];
  
  constructor( private dialog: MatDialog,  private toast: ToastrService,private internshipService:InternshipService,private demandService:DemandService
  ){

  }
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;


  ngOnInit() {
    this.getAllInternships()
  
  }
  ngAfterViewInit() {
    /* this.dataSource = new MatTableDataSource([])
    this.dataSource.paginator= this.paginator */
  }

  getAllInternships(){
    this.internshipService.getAllInternships().subscribe({
      next: (res) => {
        this.Internships = res.data;
        this.length = res.data.length;
        //this.paginateInternships();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  
   paginateInternships() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedInternships = this.Internships.slice(start, end);
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.paginateInternships();
  }

  ngOnDestroy() {
    this.toast.clear()  }

}
