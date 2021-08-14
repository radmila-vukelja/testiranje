import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { ArrayDataSource } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree'
import { MatPaginator } from '@angular/material/paginator';
import { Category } from '../../model/category';
import { MatTableDataSource } from '@angular/material/table';
import { Contestant } from '../../model/contestant';
import { Club } from '../../model/club';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContestantService } from '../../service/contestant.service';
import { ClubService } from '../../service/club.service';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-contestant-to-a-club',
  templateUrl: './add-contestant-to-a-club.component.html',
  styleUrls: ['./add-contestant-to-a-club.component.css']
})
export class AddContestantToAClubComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['id', 'name', 'lastName', 'age', 'location', 'jmbg', 'category', 'add'];
  dataSource = new MatTableDataSource<Contestant>();
  club: Club;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private contestantService: ContestantService,
    private clubService: ClubService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllContestantsWithoutClub();
    this.getClubById(this.data);
  }

  getClubById(id) {
    this.clubService.getOne(id).subscribe(
      data => {
        this.club = data;
      },
      error => {
        console.error("ERROR: ", error);
      }
    )
  }

  getAllContestantsWithoutClub() {
    this.contestantService.getAllContestantsWithoutClub().subscribe(
      data => {
        this.dataSource.data = data;
      },
      error => {
        console.error("ERROR: ", error);
      }
    )
  }

  addContestant(contestant) {
    this.clubService.addContestantToAClub(this.club.id, contestant.id).subscribe(
      data => {
        return this.openDialog('Uspesno ste dodali takmicara u ovaj klub.', '350px', '300px', true);
      },
      error => {
        console.error("ERROR: ", error);
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
        this.dialog.closeAll();
        this.router.navigate(['main-page']);
      }
    });
  }

}
