import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { Club } from '../../model/club';
import { ClubService } from '../../service/club.service';
import { LocationService } from '../../service/location.service';
import { Location } from '../../model/location';

@Component({
  selector: 'app-edit-club',
  templateUrl: './edit-club.component.html',
  styleUrls: ['./edit-club.component.css']
})
export class EditClubComponent implements OnInit {

  club: Club;
  clubId;
  pictureURL;
  clubName;
  locations: Location[] = [];
  defaultLocation: Location;
  selectedLocation: Location;

  constructor(
    private clubService: ClubService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private locationService: LocationService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllLocations();
    this.catchIdFromUrl();
  }

  catchIdFromUrl() {
    this.activatedRoute.params.forEach((params: Params) => {
      let id = params['id'];
      this.clubId = id;
      this.fetchClubById(id);
    });
  }

  fetchClubById(id) {
    this.clubService.getOne(id).subscribe(
      data => {
        this.club = data;
        this.defaultLocation = data.location;
        this.club.doNotShowEditClub = true;
        this.club.doNotShowContestants = true;
        this.club.doNotShowDelete = true;
        this.clubName = this.club.name;
        this.pictureURL = this.club.pictureURL;
        this.selectedLocation = this.club.location;
      },
      error => {
        console.error("ERROR: ", error);
      }
    )
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
  }

  editClub() {
    if (
      !this.pictureURL ||
      !this.clubName ||
      !this.selectedLocation
    ) {
      return this.openDialog('Morate da popunite sva polja.', '350px', '300px', false);
    } else {
      
      this.club.location = this.selectedLocation;
      this.club.name = this.clubName;
      this.club.pictureURL = this.pictureURL;
      this.saveNewClub(this.club);
    }
  }

  saveNewClub(club: Club) {
    this.clubService.save(club).subscribe(
      data => {
        return this.openDialog('Uspesno ste izmenili klub', '350px', '300px', true);
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
      if(action){
        this.router.navigate(['main-page']);
      }
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
      this.club.doNotShowEditClub = true;
      this.club.doNotShowDelete = true;
    }else {
      return this.openDialog('Morate popuniti sva polja!', '350px', '300px', false);
    }
  }

}
