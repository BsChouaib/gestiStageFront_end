import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToastrService } from 'ngx-toastr';

import { UpdateInternshipDialogComponent } from './update-internship-dialog/update-internship-dialog.component';
import { DetailsInternshipDialogComponent } from './details-internship-dialog/details-internship-dialog.component';
import { AddInternshipDialogComponent } from './add-internship-dialog/add-internship-dialog.component';
import { UniversityService } from 'src/app/Services/university.service';
import { ResultInternshipDialogComponent } from './result-internship-dialog/result-internship-dialog.component';
import { InternshipService } from 'src/app/Services/internship.service';
import { DeleteInternshipDialogComponent } from './delete-internship-dialog/delete-internship-dialog.component';

@Component({
  selector: 'app-internship',
  standalone: true,
  imports: [SharedModule, MatTableModule, MatPaginator, MatMenuModule, MatIconModule, MatButtonModule, MatDialogModule, MatTooltipModule],
  templateUrl: './internship.component.html',
  styleUrl: './internship.component.scss',
  providers: [InternshipService, UniversityService]

})
export default class InternshipComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['internshipTitle', 'internshipStartTime', 'internshipEndTime', 'studentName', 'encadrant', 'result', 'action'];
  dataSource: MatTableDataSource<any>;
  studyFieldsList: any
  role = this.internshipService.getRole()
  constructor(private internshipService: InternshipService, private dialog: MatDialog, private toast: ToastrService, private univService: UniversityService
  ) {

  }
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;


  ngOnInit() {
    this.getAllInternship();

    if (this.role !== 'ADMIN')
      this.displayedColumns = ['internshipTitle', 'internshipStartTime', 'internshipEndTime', 'studentName', 'result', 'action']
  }

  ngAfterViewInit() {
    /* this.dataSource = new MatTableDataSource([])
    this.dataSource.paginator= this.paginator */
  }

  getAllInternship() {
    this.internshipService.getAllInternships().subscribe({
      next: (res) => {

        this.dataSource = new MatTableDataSource(res.data)
        this.dataSource.paginator = this.paginator
      },

      error: (err) => {
        console.log(err)
      }
    })
    /*   let res = this.internshipService.getAllInternships()
  
      this.dataSource = new MatTableDataSource(res)
         this.dataSource.paginator = this.paginator */
  }
  updateInternship(Internship) {
    const dialogRef = this.dialog.open(UpdateInternshipDialogComponent, {
      data: Internship,
      width: '700px'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.getAllInternship()
      }
    });
  } //DetailsInternshipDialogComponent
  onResultCheck(Internship) {
    const dialogRef = this.dialog.open(ResultInternshipDialogComponent, {
      data: Internship,
      width: '700px'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.getAllInternship()
      }
    });
  }
  detailsInternship(Internship) {
    const dialogRef = this.dialog.open(DetailsInternshipDialogComponent, {
      data: Internship,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.getAllInternship()
      }
    });
  }
  deleteInternship(Internship) {
    const dialogRef = this.dialog.open(DeleteInternshipDialogComponent, {
      width: '400px',
      data: Internship
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.getAllInternship()
      }
    });
  }
  updateInternshipStatus(Internship) {
    const loadingToast = this.toast.info('Loading...', 'Please wait', {
      closeButton: true,
    });
    let id = Internship.internshipId;
    let status = Internship.state === 'Done' ? 'InProgress' : 'Done';
    this.internshipService.updateInternshipStatus(id, status).subscribe({
      next: (res) => {
        this.toast.clear(loadingToast.toastId);

        this.toast.success(`Internship Status changed Successfully`, 'Success', {
          progressBar: true,
          closeButton: true,
        });
        this.getAllInternship()
      },

      error: (err) => {
        console.log(err)
        this.toast.clear(loadingToast.toastId);
        this.toast.error('Change Internship Status Failed', 'Error', {
          progressBar: true,
          closeButton: true,
        });
      }
    })
  }

  ngOnDestroy() {
    this.toast.clear()
  }

} 