// Angular import
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent implements OnInit{

  constructor(private authService: AuthenticationService, private router:Router){

  }
  ngOnInit(): void {
  }
  
  logout() {
    this.authService.logout().subscribe((res) => {
      if (!res.success) {
        this.router.navigate(['/guest/login']);
        sessionStorage.clear();
      }
    });
  }

}
