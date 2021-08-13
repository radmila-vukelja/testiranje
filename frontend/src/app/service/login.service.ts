import { Injectable } from '@angular/core';
import { Korisnik } from '../model/korisnik';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../shared/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public korisnik: Korisnik;
  private userIsLoggedIn = false;
  public headers;

  apiUrl = 'http://localhost:8080/';

  constructor(
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog
  ) { }


  getHeaders() {
    if (this.headers) {
      return this.headers;
    } else {
      let credentials = localStorage.getItem('credentials');
      if (credentials && credentials !== null) {
          const headers = new HttpHeaders({ authorization: 'Basic ' + credentials });
        this.headers = headers
        return this.headers;
      }
    }
  }

  dajKorisnika(): Korisnik {
    if (this.korisnik) {
      return this.korisnik;
    } else {
      let item = localStorage.getItem('korisnik');
      if (item) {
        this.korisnik = JSON.parse(item);
        return this.korisnik;
      }
    }
  }

  login(korisnickoIme: string, sifra: string) {
    this.korisnik = new Korisnik();
    const base64Kredencijali = btoa(korisnickoIme + ':' + sifra);
    localStorage.setItem('credentials', btoa(korisnickoIme + ':' + sifra));
    const headers = new HttpHeaders({ authorization: 'Basic ' + base64Kredencijali });
    return this.http.get<any>(this.apiUrl + 'auth/user', { headers: headers }).subscribe(data => {
      this.korisnik = data;
      localStorage.setItem('korisnik', JSON.stringify(this.korisnik));
      this.headers = headers;
      this.userIsLoggedIn = true;
      this.router.navigate(['home']);
    },
      error => {
        this.openDialog('Ne postoji korisnik sa tim kredencijalima', '350px', '300px', false);
      });
  }

  register(korisnik: Korisnik) {
    return this.http.post(this.apiUrl + 'korisnik/registruj-se', korisnik)
  }

  logout() {
    this.userIsLoggedIn = false;
    this.korisnik = null;
    this.headers = null;
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  public dajUlogovanogKorisnika() {
    return this.korisnik;
  }

  public isUserLoggedIn() {
    return this.getHeaders();
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

  redirectHome(){
    this.router.navigate(['home'])
  }

}
