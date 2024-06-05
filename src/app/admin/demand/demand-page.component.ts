// angular import
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DemandService } from 'src/app/Services/demand.service';
import { DeleteDemandDialogComponent } from './delete-demand-dialog/delete-demand-dialog.component';
import { UpdateDemandDialogComponent } from './update-demand-dialog/update-demand-dialog.component';
import { Router, RouterModule } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-demand-page',
  standalone: true,
  imports: [SharedModule, MatTableModule, MatPaginator, MatMenuModule, MatIconModule, MatButtonModule, MatDialogModule,MatTooltipModule],
  templateUrl: './demand-page.component.html',
  styleUrls: ['./demand-page.component.sass'],
  providers: [DemandService],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export default class DemandAdminComponent implements AfterViewInit, OnInit,OnDestroy {

  displayedColumns: string[] = ['demandeDate', 'subject', 'status', 'resume', 'cover_letter', 'action'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  dataSource: MatTableDataSource<any>;
  expandedElement: any | null;

  constructor(private demandService: DemandService, private dialog: MatDialog, private toast: ToastrService

  ) {

  }
  ngOnDestroy() {
this.toast.clear()  }
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;


  ngOnInit() {
    this.getAlldemands()
  }
  ngAfterViewInit() {
    /* this.dataSource = new MatTableDataSource([])
    this.dataSource.paginator= this.paginator */
  }

  getAlldemands() {
    this.demandService.getAllDemand().subscribe({
      next: (res) => {

        this.dataSource = new MatTableDataSource(res.data.demands)
        this.dataSource.paginator = this.paginator
      },

      error: (err) => {
        console.log(err)
      }
    })
  }
 
  deleteDemand(demand) {
    const dialogRef = this.dialog.open(DeleteDemandDialogComponent, {
      data:demand,
      width:'500px'    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
      this.getAlldemands()
      }
    });
  }
  updateDemand(demand) {
    const dialogRef = this.dialog.open(UpdateDemandDialogComponent, {
      data:demand,
      width:'700px'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
      this.getAlldemands()
      }
    });
  }
  approveDemand(Demand) {
    let data = Demand

    const loadingToast = this.toast.info('Loading...', 'Please wait', {
      closeButton: true,
    });
    this.demandService.approveDemand(Demand.demandId).subscribe({
      next: (res) => {
        this.getAlldemands()
        this.toast.clear(loadingToast.toastId);

        this.toast.success('Demand approved Successfully', 'Success', {
          progressBar: true,
          closeButton: true,
        });
      },

      error: (err) => {
        console.log(err)
        this.toast.clear(loadingToast.toastId);
        this.toast.error('Approve Demand Failed', 'Error', {
          progressBar: true,
          closeButton: true,
        });
      }
    })
  }
  rejectDemand(Demand) {
    let data = Demand
    
    const loadingToast = this.toast.info('Loading...', 'Please wait', {
      closeButton: true,
    });
    this.demandService.rejectDemand(Demand.demandId).subscribe({
      next: (res) => {
        this.getAlldemands()
        this.toast.clear(loadingToast.toastId);

        this.toast.success('Demand rejected Successfully', 'Success', {
          progressBar: true,
          closeButton: true,
        });
      },

      error: (err) => {
        console.log(err)
        this.toast.clear(loadingToast.toastId);
        this.toast.error('Reject Demand Failed', 'Error', {
          progressBar: true,
          closeButton: true,
        });
      }
    })
  }
  downloadResume(demand) {
    const loadingToast = this.toast.info('Loading...', 'Please wait', {
      closeButton: true,
    });
    this.demandService.downloadResume(demand.demandId).subscribe({
      next: (response) => {
        // Extract filename (optional, see below)

        const downloadLink = document.createElement('a');
        const url = window.URL.createObjectURL(response);
        downloadLink.href = url;
        downloadLink.download = 'resume.pdf'; // Set a default filename

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink); // Remove the link to avoid memory leaks

        window.URL.revokeObjectURL(url); // Clean up the temporary URL

        this.toast.clear(loadingToast.toastId);
        this.toast.success('Resume Downloaded Successfully', 'Success', {
          progressBar: true,
          closeButton: true,
        });
      },

      error: (err) => {
        console.log(err)
        this.toast.clear(loadingToast.toastId);
        this.toast.error('Download Resume Failed', 'Error', {
          progressBar: true,
          closeButton: true,
        });
      }
    })
  }

  downloadCoverLetter(demand) {
    const loadingToast = this.toast.info('Loading...', 'Please wait', {
      closeButton: true,
    });
    this.demandService.downloadCoverLetter(demand.demandId).subscribe({
      next: (response) => {
        const downloadLink = document.createElement('a');
        const url = window.URL.createObjectURL(response);
        downloadLink.href = url;
        downloadLink.download = 'cover letter.pdf'; // Set a default filename

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink); // Remove the link to avoid memory leaks

        window.URL.revokeObjectURL(url); // Clean up the temporary URL

        this.toast.clear(loadingToast.toastId);

        this.toast.success('Cover Letter Downloaded Successfully', 'Success', {
          progressBar: true,
          closeButton: true,
        });
      },

      error: (err) => {
        console.log(err)
        this.toast.clear(loadingToast.toastId);
        this.toast.error('Download Cover Letter Failed', 'Error', {
          progressBar: true,
          closeButton: true,
        });
      }
    })
  }
}
