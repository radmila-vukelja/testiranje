import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { Narudzbina } from '../model/narudzbina';
import { NarudzbinaService } from '../service/narudzbina.service';
import { LoginService } from '../service/login.service';
import { RestoranService } from '../service/restoran.service';
import { Restoran } from '../model/restoran';

@Component({
  selector: 'app-naruci-hranu',
  templateUrl: './naruci-hranu.component.html',
  styleUrls: ['./naruci-hranu.component.css']
})
export class NaruciHranuComponent implements OnInit {

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private narudzbinaService: NarudzbinaService,
    private loginService: LoginService,
    private restoranService: RestoranService
  ) { }

  datumDostave: Date;
  nazivRestorana: string;
  nazivHrane: string;
  komentar: string;
  iznosZaNaplatu: number;
  minimalniDatum: Date;

  restorani: Restoran[];

  ngOnInit(): void {
    if (!this.loginService.getHeaders()) {
      this.router.navigate(['home']);
      return;
    }
    this.dajSveRestorane();
    this.postaviMinimalniDatum();
  }

  dajSveRestorane() {
    this.restoranService.dajSveRestorane().subscribe(
      data => {
        this.restorani = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }

  postaviMinimalniDatum() {
    this.minimalniDatum = new Date();
  }

  naruci() {
    if (!this.datumDostave) {
      this.openDialog('Morate uneti datum dostave', '350px', '300px', false);
      return;
    } else if (!this.nazivHrane || this.nazivHrane === '') {
      this.openDialog('Morate uneti naziv hrane', '350px', '300px', false);
      return;
    } else if (!this.nazivRestorana || this.nazivRestorana === '') {
      this.openDialog('Morate uneti naziv restorana', '350px', '300px', false);
      return;
    } else if (!this.komentar || this.komentar === '') {
      this.openDialog('Morate uneti komtenar', '350px', '300px', false);
      return;
    } else if (!this.iznosZaNaplatu || this.iznosZaNaplatu < 1) {
      this.openDialog('Morate uneti iznos za naplatu', '350px', '300px', false);
      return;
    }
    let narudzbina = new Narudzbina();
    narudzbina.datumDostave = this.datumDostave;
    narudzbina.nazivHrane = this.nazivHrane;
    narudzbina.nazivRestorana = this.nazivRestorana;
    narudzbina.komentar = this.komentar;
    narudzbina.iznosZaNaplatu = this.iznosZaNaplatu;
    narudzbina.idNarucioca = this.loginService.dajKorisnika().id;
    console.log(JSON.stringify(narudzbina));
    this.naruciHranu(narudzbina);
  }

  naruciHranu(narudzbina: Narudzbina) {
    this.narudzbinaService.save(narudzbina).subscribe(
      data => {
        if (data.moguceIsporuciti) {
          this.openDialog('Uspesno ste narucili hranu', '350px', '300px', false);
          this.router.navigate(['home']);
        } else {
          this.openDialog('Iznos mora biti veci od 1000 dinara.', '350px', '300px', false);
          this.router.navigate(['home']);
        }
      },
      error => {
        this.openDialog('Doslo je do greske', '350px', '300px', false);
      }
    )
  }

  openDialog(text: string, height: string, width: string, action: boolean) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: width,
      height: height,
      data: text
    });

    dialogRef.afterClosed().subscribe(result => {
      if (action) {
        this.router.navigate(['login']);
      }
    });
  }

}
