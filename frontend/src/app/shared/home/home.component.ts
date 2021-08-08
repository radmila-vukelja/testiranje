import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { IzbrisiNarudzbinuComponent } from '../izbrisi-narudzbinu/izbrisi-narudzbinu.component';
import { Club } from 'src/app/model/club';
import { Location } from 'src/app/model/location';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  clubs: Club[] = [];

  constructor(
    private loginService: LoginService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngAfterViewInit() {
  }

  ngOnInit(): void {
    if (!this.loginService.isUserLoggedIn()) {
      this.router.navigate(['login']);
    }
    this.fillClubWithMockedData();
    console.log("Home component is instantiated.")
  }

  fillClubWithMockedData() {
    let location = new Location();
    location.id = 1;
    location.name = "Jebeni Beograd";

    let club = new Club();
    club.id = 1;
    club.name = "Neki Tamo Klub";
    club.location = location;
    club.pictureURL = "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80";
    this.clubs.push(club);
    this.clubs.push(club);
    this.clubs.push(club);
    this.clubs.push(club);
    this.clubs.push(club);
    this.clubs.push(club);
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
        // this.narudzbinaService.delete(id).subscribe(
        //   data => {
        //     this.openDialog('Uspesno ste izbrisali narudzbinu', '350px', '300px', true);
        //   },
        //   error => {
        //     this.openDialog('Desila se greska prilikom brisanja narudzbine', '350px', '300px', false);
        //   }
        // )
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

}
