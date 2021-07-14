import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Iuser } from 'src/app/interface/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: Iuser
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.getCurrentUser()
  }

  getCurrentUser(): void {
    this.currentUser = this.authService.getCurrentUser()
  }

  logoutUser(): void {
    this.authService.logoutUser();
    this.router.navigate(['/']).then(_ => {
      location.reload()
    })
  }

}
