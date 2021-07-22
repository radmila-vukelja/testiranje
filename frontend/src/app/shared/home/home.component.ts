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
    club.pictureURL = "https://scontent.fath4-2.fna.fbcdn.net/v/t1.6435-9/61803290_2366961270013373_8195401116687532032_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=973b4a&_nc_ohc=lpfj4qkw9tkAX8YwexN&_nc_ht=scontent.fath4-2.fna&oh=ef0b8b77ecd862ce78c850b7aee39a62&oe=60FEA14C";
    this.clubs.push(club);
    // this.clubs.push(club);
    // this.clubs.push(club);
    // this.clubs.push(club);
    // this.clubs.push(club);
    // this.clubs.push(club);
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
