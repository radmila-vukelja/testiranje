import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { Narudzbina } from '../model/narudzbina';
import { NarudzbinaService } from '../service/narudzbina.service';
import { LoginService } from '../service/login.service';
import { RestoranService } from '../service/restoran.service';
import { Restoran } from '../model/restoran';

@Component({
  selector: 'app-izmeni-narudzbinu',
  templateUrl: './izmeni-narudzbinu.component.html',
  styleUrls: ['./izmeni-narudzbinu.component.css']
})
export class IzmeniNarudzbinuComponent implements OnInit {


  constructor(
    private router: Router,
    public dialog: MatDialog,
    private narudzbinaService: NarudzbinaService,
    private loginService: LoginService,
    private restoranService: RestoranService,
    private activatedRoute: ActivatedRoute
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
    this.activatedRoute.params.forEach((params: Params) => {
      let id = params['id'];
      this.dajNarudzbinuPoId(id);
    });
  }

  dajNarudzbinuPoId(id: number) {
    this.narudzbinaService.getOne(id).subscribe(
      data => {
        console.log(data);
        this.nazivRestorana = data.nazivRestorana;
        this.nazivHrane = data.nazivHrane;
        this.komentar = data.komentar;
        this.iznosZaNaplatu = data.iznosZaNaplatu;
        this.datumDostave = data.datumDostave;
      },
      error => {
        console.log(error)
      })
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

  izmeniNarudzbinu() {
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
    this.izmeni(narudzbina);
  }

  izmeni(narudzbina: Narudzbina) {
    this.narudzbinaService.izmeniNarudzbinu(narudzbina).subscribe(
      data => {
        if (data.moguceIsporuciti) {
          this.openDialog('Uspesno ste izmenili narudzbinu', '350px', '300px', true);
        } else {
          this.openDialog('Iznos mora biti veci od 1000 dinara.', '350px', '300px', true);
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
        this.router.navigate(['home']);
      }
    });
  }


}
