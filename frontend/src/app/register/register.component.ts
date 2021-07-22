import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { Korisnik } from '../model/korisnik';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userName: string;
  password: string;
  name: string;
  lastName: string;

  constructor(
    private loginService: LoginService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (this.loginService.isUserLoggedIn()) {
      this.router.navigate(['home']);
    }
  }

  register() {
    if (!this.userName || this.userName === '') {
      this.openDialog('Korisnicko ime je obavezno', '350px', '300px', false);
    } else if (!this.password || this.password === '') {
      this.openDialog('Sifra je obavezna', '350px', '300px', false);
    } else if (!this.name || this.name === '') {
      this.openDialog('Ime je obavezno', '350px', '300px', false);
    } else if (!this.lastName || this.lastName === '') {
      this.openDialog('Prezime je obavezno', '350px', '300px', false);
    } else {
      this.register();
    }
  }

  registration() {
    let korisnik = new Korisnik();
    korisnik.name = this.name;
    korisnik.userName = this.userName;
    korisnik.lastName = this.lastName;
    korisnik.password = this.password;

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
