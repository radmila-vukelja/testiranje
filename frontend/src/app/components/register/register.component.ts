import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { Korisnik } from '../../model/korisnik';
import { ValidatorService } from '../../service/validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userName: string;
  password: string;
  email: string;
  name: string;
  lastName: string;
  repeatPassword: string;

  constructor(
    private loginService: LoginService,
    private router: Router,
    public dialog: MatDialog,
    private validationService: ValidatorService
  ) { }

  ngOnInit(): void {
    if (this.loginService.isUserLoggedIn()) {
      this.router.navigate(['home']);
    }
  }

  register() {
    if (
      this.validationService.validateUsername(this.userName, 5) &&
      this.validationService.validateRegularField(this.name, 2, 'Ime') &&
      this.validationService.validateRegularField(this.lastName, 6, 'Prezime') &&
      this.validationService.validateEmail(this.email, 6) &&
      this.validationService.validatePasswordAndRepeatPassword(this.password, this.repeatPassword, 5)
    ) {
      this.registration();
    }
  }

  registration() {
    let korisnik = new Korisnik();
    korisnik.name = this.name;
    korisnik.userName = this.userName;
    korisnik.lastName = this.lastName;
    korisnik.password = this.password;
    korisnik.email = this.email;

    this.loginService.register(korisnik).subscribe(
      data => {
        this.openDialog('Registracija je uspesna! \n Mozete se ulogovati. ', '350px', '300px', true);
      },
      error => {
        this.openDialog('Desila se greska prilikom registracije. Pokusajte ponovo.', '350px', '300px', false);
      }
    );
  }

  openDialog(text: string, height: string, width: string, action: boolean) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: width,
      height: height,
      data: text
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['login']);
    });
  }

}
