import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { ValidatorService } from '../../service/validator.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../shared/dialog/dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: string;
  password: string;

  constructor(
    private loginService: LoginService,
    private router: Router,
    public dialog: MatDialog,
    private validationService: ValidatorService
  ) { }

  ngOnInit(): void {
    if (this.loginService.isUserLoggedIn()) {
      this.router.navigate(['login']);
    }
  }

  login() {
    if (
      this.validationService.validateUsername(this.userName, 5)
      && this.validationService.validatePassword(this.password, 5)
    ) {
      this.logIn();
    }
  }

  logIn() {
    this.loginService.login(this.userName, this.password);
  }

  registration() {
    this.router.navigate(['register']);
  }

  openDialog(text: string, height: string, width: string, action: boolean) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: width,
      height: height,
      data: text
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  redirectToRegister() {
    this.router.navigate(['register']);
  }

}
