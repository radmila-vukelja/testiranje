import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';
import { NarudzbinaService } from 'src/app/service/narudzbina.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Narudzbina } from 'src/app/model/narudzbina';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { IzbrisiNarudzbinuComponent } from '../izbrisi-narudzbinu/izbrisi-narudzbinu.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['nazivRestorana', 'datumDostave', 'nazivHrane', 'komentar', 'iznosZaNaplatu', 'moguceIsporuciti', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Narudzbina>();
  filterParametar: string;
  filterJeKliknut = false;
  oldDataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private narudzbinaService: NarudzbinaService,
    public dialog: MatDialog
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    if (!this.loginService.isUserLoggedIn()) {
      this.router.navigate(['login']);
    }
    this.dajNarudzbinePoIdKorisnika();
  }

  dajNarudzbinePoIdKorisnika() {
    this.narudzbinaService.dajNarudzbinePoIdKorisnika(this.loginService.dajKorisnika().id).subscribe(
      data => {
        this.dataSource.data = data;
        this.oldDataSource = data;
      },
      error => {
        console.log(error)
      }
    )
  }

  naruciHranu() {
    this.router.navigate(['naruci-hranu'])
  }

  dodajRestoran() {
    this.router.navigate(['dodaj-restoran'])
  }

  edit(id: number) {
    this.router.navigate(['izmeni-narudzbinu/' + id]);
  }

  delete(id: number) {
    this.opetDeleteDialog('Da li sigurno zelite da izbrisete narudzbinu?', '350px', '300px', id);
  }

  filtriraj() {
    if (!this.filterParametar || this.filterParametar === '' || this.filterParametar === ' ') {
      return;
    }
    this.filterJeKliknut = !this.filterJeKliknut;
    if (this.filterJeKliknut) {
      this.dataSource.data = this.filtrirajPoImenu(this.filterParametar);
    } else {
      this.dataSource.data = this.oldDataSource;
    }
  }

  filtrirajPoImenu(imeRestorana: string) {
    let data = [];
    let regex = new RegExp(imeRestorana.toLowerCase());
    for (let narudzbina of this.oldDataSource) {
      if (regex.test(narudzbina.nazivRestorana.toLowerCase())) {
        data.push(narudzbina);
      }
    }
    return data;
  }

  opetDeleteDialog(text: string, height: string, width: string, id: number) {
    const dialogRef = this.dialog.open(IzbrisiNarudzbinuComponent, {
      width: width,
      height: height,
      data: text
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('result: ', result);
      if (result === 'izbrisi') {
        this.narudzbinaService.delete(id).subscribe(
          data => {
            this.dataSource.data = data;
            this.openDialog('Uspesno ste izbrisali narudzbinu', '350px', '300px', true);
          },
          error => {
            this.openDialog('Desila se greska prilikom brisanja narudzbine', '350px', '300px', false);
          }
        )
      }

    });
  }

  openDialog(text: string, height: string, width: string, action: boolean) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: width,
      height: height,
      data: text
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['home']);
    });
  }

  stampaj() {
    localStorage.setItem('stampa', JSON.stringify(this.dataSource.data));
    setTimeout(() => {
      this.router.navigate(['stampaj'])
    }, 1000);
  }

}
