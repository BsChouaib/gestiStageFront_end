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
import { ClaimsService } from 'src/app/Services/claims.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-claims-page',
  standalone: true,
  imports: [SharedModule, MatTableModule, MatPaginator, MatMenuModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './claims-page.component.html',
  styleUrls: ['./claims-page.component.scss'],
  providers: [ClaimsService]
})
export default class SamplePageComponent implements AfterViewInit, OnInit,OnDestroy {

  displayedColumns: string[] = ['sender', 'description', 'status', 'action'];
  dataSource: MatTableDataSource<any>;

  constructor(private ClaimService: ClaimsService, private dialog: MatDialog, private toast: ToastrService

  ) {

  }
  ngOnDestroy() {
this.toast.clear()  }
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;


  ngOnInit() {
    this.getAllClaims()
  }
  ngAfterViewInit() {
    /* this.dataSource = new MatTableDataSource([])
    this.dataSource.paginator= this.paginator */
  }

  getAllClaims() {
    this.ClaimService.getAllClaims().subscribe({
      next: (res) => {

        this.dataSource = new MatTableDataSource(res.data)
        this.dataSource.paginator = this.paginator
      },

      error: (err) => {
        console.log(err)
      }
    })
  }

  approveClaim(claim) {
    let data = claim
    let id = claim.claimId
    delete data.claimId;
    const loadingToast = this.toast.info('Loading...', 'Please wait', {
      closeButton: true,
    });
    this.ClaimService.approveClaim(data, id).subscribe({
      next: (res) => {
        this.getAllClaims()
        this.toast.clear(loadingToast.toastId);

        this.toast.success('Claim approved Successfully', 'Success', {
          progressBar: true,
          closeButton: true,
        });
      },

      error: (err) => {
        console.log(err)
        this.toast.clear(loadingToast.toastId);
        this.toast.error('Approve Claim Failed', 'Error', {
          progressBar: true,
          closeButton: true,
        });
      }
    })
  }
  rejectClaim(claim) {
    let data = claim
    let id = claim.claimId
    delete data.claimId;
    const loadingToast = this.toast.info('Loading...', 'Please wait', {
      closeButton: true,
    });
    this.ClaimService.rejectClaim(data, id).subscribe({
      next: (res) => {
        this.getAllClaims()
        this.toast.clear(loadingToast.toastId);

        this.toast.success('Claim rejected Successfully', 'Success', {
          progressBar: true,
          closeButton: true,
        });
      },

      error: (err) => {
        console.log(err)
        this.toast.clear(loadingToast.toastId);
        this.toast.error('Reject Claim Failed', 'Error', {
          progressBar: true,
          closeButton: true,
        });
      }
    })
  }
}
