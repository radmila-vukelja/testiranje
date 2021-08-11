import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Location } from '../model/location';
import { LocationService } from '../service/location.service';
import { LoginService } from '../service/login.service';
import { DialogComponent } from '../shared/dialog/dialog.component';

@Component({
  selector: 'app-add-club',
  templateUrl: './add-club.component.html',
  styleUrls: ['./add-club.component.css']
})
export class AddClubComponent implements OnInit {

  pictureURL;
  clubName;
  locations: Location[] = [];
  selectedLocation: Location;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private locationService: LocationService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllLocations();
  }

  getAllLocations() {
    this.locationService.getAll().subscribe(
      data => {
        this.locations = data;
      },
      error => {
        console.error("Error: ", error);
      }
    )
  }

  chooseLocation(value) {
    this.selectedLocation = value;
    console.log(value);
  }

  addNewClub() {
    if (
      !this.pictureURL ||
      !this.clubName ||
      !this.selectedLocation
    ) {
      return this.openDialog('Morate da popunite sva polja.', '350px', '300px', false);
    } else {
      
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
