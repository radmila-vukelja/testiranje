import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClubService } from '../../service/club.service';
import { Club } from '../../model/club';
import { DeleteDialogComponent } from '../shared/delete-dialog/delete-dialog.component';
import { DialogComponent } from '../shared/dialog/dialog.component';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent implements OnInit {

  @Input("club") club: Club;
  constructor(
    private router: Router,
    private clubService: ClubService,
    public dialog: MatDialog,
  ) { }


  ngOnInit(): void {
  }

  redirectToClubDetails() {
    this.router.navigate(['club-full-info/' + this.club.id]);
  }

  redirectToEditClub() {
    this.router.navigate(['edit-club/' + this.club.id]);
  }

  // return this.openDialog(error.message, '350px', '300px', false);

  openDeleteDialog(text: string, height: string, width: string, action: boolean) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: width,
      height: height,
      data: text
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === "delete") {
        this.dialog.closeAll();
        this.deleteClub();
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
      if (action) {
        this.dialog.closeAll();
        this.router.navigate(['main-page'])
      }
    });
  }

  delete() {
    this.openDeleteDialog("Da li ste sigurni da zelite da izbrisete klub?", '350px', '300px', false);
  }

  deleteClub() {
    this.clubService.deleteClub(this.club.id).subscribe(
      data => {
        this.openDialog("Uspesno ste izbrisali klub", '350px', '300px', true);
      },
      error => {
        console.error("ERROR: ", error);
      }
    )
  }

}
