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

  korisnickoIme: string;
  sifra: string;
  ime: string;
  prezime: string;

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

  registrujSe() {
    if (!this.korisnickoIme || this.korisnickoIme === '') {
      this.openDialog('Morate uneti korisnicko ime', '350px', '300px', false);
    } else if (!this.sifra || this.sifra === '') {
      this.openDialog('Morate uneti sifru', '350px', '300px', false);
    } else if (!this.ime || this.ime === '') {
      this.openDialog('Morate uneti ime', '350px', '300px', false);
    } else if (!this.prezime || this.prezime === '') {
      this.openDialog('Morate uneti prezime', '350px', '300px', false);
    } else {
      this.register();
    }
  }

  register() {
    let korisnik = new Korisnik();
    korisnik.ime = this.ime;
    korisnik.korisnickoIme = this.korisnickoIme;
    korisnik.prezime = this.prezime;
    korisnik.sifra = this.sifra;

    this.loginService.register(korisnik).subscribe(
      data => {
        this.openDialog('Uspesno ste se registrovali! \n Ulogujte se! ', '350px', '300px', true);
      },
      error => {
        this.openDialog('Postoji greska pri registraciji!', '350px', '300px', false);
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
