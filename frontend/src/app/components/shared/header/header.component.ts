import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public userIsLoggedIn = false;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.loginService.isUserLoggedIn()) {
      this.userIsLoggedIn = true;
      this.router.navigate(['home']);
    } else {
      this.userIsLoggedIn = false;
    }
    this.routeWatcher();
  }

  routeWatcher() {
    setInterval(() => {
      this.router.events.subscribe(() => {
        this.userIsLoggedIn = this.loginService.isUserLoggedIn();
      });
    }, 2500)

  }

  logIn() {
    this.router.navigate(['login']);
  }

  logOut() {
    this.loginService.logout();
  }

  redirectToHome() {
    this.loginService.redirectHome();
  }


  addContestant() {
    this.loginService.addContestant();
  }
  
  addNewClub() {
    this.loginService.addNewClub();
  }

}
