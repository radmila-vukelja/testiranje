import { Component, OnInit } from '@angular/core';
import { Restoran } from '../model/restoran';
import { RestoranService } from '../service/restoran.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../shared/dialog/dialog.component';

@Component({
  selector: 'app-dodaj-restoran',
  templateUrl: './dodaj-restoran.component.html',
  styleUrls: ['./dodaj-restoran.component.css']
})
export class DodajRestoranComponent implements OnInit {

  naziv: string;

  constructor(
    private restoranService: RestoranService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  dodajRestoran() {
    if (!this.naziv || this.naziv === '') {
      this.openDialog('Morate uneti naziv restorana', '350px', '300px', false);
    } else {
      let restoran = new Restoran();
      restoran.naziv = this.naziv; 
      this.restoranService.dodajRestoran(restoran).subscribe(
        data =>{
          this.openDialog('Uspesno ste dodali restoran', '350px', '300px', false);
        },
        error =>{
          console.log(error);
          this.openDialog('Greska prilikom dodavanja restorana', '350px', '300px', false);
        }
      )
    }
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

}
