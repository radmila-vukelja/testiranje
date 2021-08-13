import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Club } from '../model/club';
import { Location } from '../model/location';
import { LocationService } from '../service/location.service';
import { ClubService } from '../service/club.service';
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
  club;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private locationService: LocationService,
    public dialog: MatDialog,
    private clubService: ClubService
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
      let club = new Club();
      club.location = this.selectedLocation;
      club.name = this.clubName;
      club.pictureURL = this.pictureURL;
      this.saveNewClub(club);
    }
  }

  saveNewClub(club: Club) {
    this.clubService.save(club).subscribe(
      data => {
        return this.openDialog('Uspesno ste dodali klub', '350px', '300px', false);
      },
      error => {
        return this.openDialog(error.message, '350px', '300px', false);
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
    });
  }

  createClubMock() {
    if (
      this.pictureURL && this.clubName && this.selectedLocation
    ) {
      this.club = new Club();
      this.club.pictureURL = this.pictureURL;
      this.club.name = this.clubName;
      this.club.location = this.selectedLocation;
      this.club.doNotShowContestants = true;
    }else {
      return this.openDialog('Morate popuniti sva polja!', '350px', '300px', false);
    }
  }
}
