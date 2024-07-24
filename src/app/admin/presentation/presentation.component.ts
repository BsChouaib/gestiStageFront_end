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

import { PresentaionService } from 'src/app/Services/presentation.service';
import { UpdatePresentationDialogComponent } from './update-presentation-dialog/update-presentation-dialog.component';
import { DeletePresentationDialogComponent } from './delete-presentation-dialog/delete-presentation-dialog.component';
import { AddPresentationDialogComponent } from './add-presentation-dialog/add-presentation-dialog.component';
import { UniversityService } from 'src/app/Services/university.service';
import { DetailsPresentationDialogComponent } from './details-presentation-dialog/details-presentation-dialog.component';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataRefreshService } from 'src/app/Services/refreshData.service';

@Component({
  selector: 'app-presentation',
  standalone: true,
  imports: [
    SharedModule,
    MatTableModule,
    MatPaginator,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
    RouterModule
  ],
  templateUrl: './presentation.component.html',
  styleUrl: './presentation.component.scss',
  providers: [PresentaionService, UniversityService]
})
export default class PresentationComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'presentationTitle',
    'presentationDate',
    'presentationStartTime',
    'presentationEndTime',
    'location',
    'result',
    'action'
  ];/*     
  */
  dataSource: MatTableDataSource<any>;
  studyFieldsList: any;
  internshipId: number;
  private subscription: Subscription; // Subscription for event emitter

  constructor(
    private presentationService: PresentaionService,
    private dialog: MatDialog,
    private toast: ToastrService,
    private univService: UniversityService,
    private router: Router,
    private dataRefreshService: DataRefreshService
  ) {}
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

  ngOnInit() {
    this.getAllPresentation();
    this.getAllStudyFields();
    this.getIdGromNotif();
    this.dataRefreshService.refreshNeeded$.subscribe(() => {
      console.log('activ')
      this.getAllPresentation();
    });
  }
  ngAfterViewInit() {
    /* this.dataSource = new MatTableDataSource([])
    this.dataSource.paginator= this.paginator */
  }
  getIdGromNotif() {
    this.internshipId = history.state;

    console.log(this.internshipId);
  }
  getAllPresentation() {
    /* let res = this.presentationService.getAllPresentations();

    this.dataSource = new MatTableDataSource(res);
    this.dataSource.paginator = this.paginator; */
    this.presentationService.getAllPresentations().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator;      
      },

      error: (err) => {
        console.log(err);
      }
    });
    //console.log('activ5')

  }
  updatePresentation(Presentation) {
    console.log('activ');
    const dialogRef = this.dialog.open(UpdatePresentationDialogComponent, {
      data: Presentation,
      width: '700px'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.getAllPresentation();
      }
    });
  }
  DetailsPresentationDialogComponent;
  onResultCheck(Presentation) {
    const dialogRef = this.dialog.open(DetailsPresentationDialogComponent, {
      data: Presentation,
      width: '700px'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.getAllPresentation();
      }
    });
  }
  deletePresentation(Presentation) {
    const dialogRef = this.dialog.open(DeletePresentationDialogComponent, {
      data: Presentation
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.getAllPresentation();
      }
    });
  }
  addPresentation() {
    const dialogRef = this.dialog.open(AddPresentationDialogComponent, {
      width: '700px',
      data: this.studyFieldsList
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.getAllPresentation();
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
  updatePresentationStatus(element: any, newState: string) {
    const loadingToast = this.toast.info('Loading...', 'Please wait', {
      closeButton: true,
    });
    this.presentationService.updatePresentationStatus(element.presentationId,newState).subscribe({
      next: (res) => {
        this.toast.clear(loadingToast.toastId);

        this.toast.success(`Presentation Status changed Successfully`, 'Success', {
          progressBar: true,
          closeButton: true,
        });

      this.getAllPresentation()      },

      error: (err) => {
        console.log(err);
        this.toast.clear(loadingToast.toastId);
        this.toast.error('Change Presentation Status Failed', 'Error', {
          progressBar: true,
          closeButton: true,
        });
      }
    });
  }
  ngOnDestroy() {
    this.toast.clear();
    if (this.subscription) {
      this.subscription.unsubscribe(); // Unsubscribe to prevent memory leaks
    }
  }
}
