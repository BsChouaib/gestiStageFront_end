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
import { AddClaimDialogComponent } from './add-claims-dialog/add-claims-dialog.component';
import { DeleteClaimDialogComponent } from './delete-claim-dialog/delete-claim-dialog.component';
import { UpdateClaimDialogComponent } from './update-claims-dialog/update-claims-dialog.component';


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
    this.ClaimService.getAllClaimsST().subscribe({
      next: (res) => {

        this.dataSource = new MatTableDataSource(res.data)
        this.dataSource.paginator = this.paginator
      },

      error: (err) => {
        console.log(err)
      }
    })
  }
  addClaims() {
    const dialogRef = this.dialog.open(AddClaimDialogComponent, {
      width:'700px'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
      this.getAllClaims()
      }
    });
  }

  deleteClaim(claim) {
    const dialogRef = this.dialog.open(DeleteClaimDialogComponent, {
      data:claim,
      width:'500px'    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
      this.getAllClaims()
      }
    });
  }
  updateClaim(claim) {
    const dialogRef = this.dialog.open(UpdateClaimDialogComponent, {
      data:claim,
      width:'700px'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
      this.getAllClaims()
      }
    });
  }
}
