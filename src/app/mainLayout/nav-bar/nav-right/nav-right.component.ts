// Angular import
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddPresentationDialogComponent } from 'src/app/admin/presentation/add-presentation-dialog/add-presentation-dialog.component';
import PresentationComponent from 'src/app/admin/presentation/presentation.component';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { InternshipService } from 'src/app/Services/internship.service';
import { DataRefreshService } from 'src/app/Services/refreshData.service';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
  //providers:[InternshipService],
})
export class NavRightComponent implements OnInit {
  notifList: any[] = [];
  nbrNotif: number = 0;
  @ViewChild(PresentationComponent) presentationComponent: PresentationComponent;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private internshipService: InternshipService,
    private dialog: MatDialog,
    private dataRefreshService: DataRefreshService

  ) {}
  ngOnInit(): void {
    let role = this.internshipService.getRole();
    if (role === 'ADMIN') {
      this.getAllNotif();
    }
  }

  logout() {
    this.authService.logout().subscribe((res) => {
      if (!res.success) {
        this.router.navigate(['auth/guest/login']);
        localStorage.clear();
      }
    });
  }

  getAllNotif() {
    this.internshipService.getAllNotif().subscribe({
      next: (res) => {
        let num = res?.data?.length;
        this.notifList = res?.data;
        this.nbrNotif = num < 10 ? '0' + num : num.toString();
      },

      error: (err) => {
        console.log(err);
      }
    });
  }
  redirectToPresentationUI(notif) {
    console.log(this.router);
    this.router.navigate(['app/admin/presentation'], { state: { internshipId: notif.internshipId,title: notif.title} });
    this.addPresentation(notif);
  }
  addPresentation(notif) {
    const dialogRef = this.dialog.open(AddPresentationDialogComponent, {
      width: '700px',
      data: { internshipId: notif.internshipId,title: notif.title}
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.dataRefreshService.requestRefresh();
    });
  }
}
