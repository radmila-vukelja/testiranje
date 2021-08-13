import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Club } from '../../model/club';
import { Contestant } from '../../model/contestant';
import { Location } from '../../model/location';
import { LoginService } from '../../service/login.service';
import { ClubService } from '../../service/club.service';
import { CategoryService } from '../../service/category.service';
import { MatDialog } from '@angular/material/dialog';
import { AddContestantToAClubComponent } from '../add-contestant-to-a-club/add-contestant-to-a-club.component';
import { DialogComponent } from '../shared/dialog/dialog.component';

@Component({
  selector: 'app-club-page',
  templateUrl: './club-page.component.html',
  styleUrls: ['./club-page.component.css']
})
export class ClubPageComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  locations: Location[] = [];

  displayedColumns: string[] = ['id', 'name', 'lastName', 'age', 'location', 'jmbg', 'weightCategory', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Contestant>();
  filterParametar: string;
  filterJeKliknut = false;
  oldDataSource = new MatTableDataSource<Contestant>();
  categories: string[] = [];
  club: Club;
  clubId;

  constructor(
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService,
    private clubService: ClubService,
    private categoryService: CategoryService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.loginService.isUserLoggedIn()) {
      this.router.navigate(['login']);
    }
    this.catchIdFromUrl();
    this.getDistinctCategories();
  }

  catchIdFromUrl() {
    this.activatedRoute.params.forEach((params: Params) => {
      let id = params['id'];
      this.clubId = id;
      this.fetchClubById(id);
    });
  }

  fetchClubById(id: number) {
    this.clubService.getOne(id).subscribe(
      data => {
        this.dataSource.data = data.contestantList;
        this.oldDataSource.data = data.contestantList;
      },
      error => {
        console.error("Error: ", error);
      }
    )
  }

  edit(id) {
    this.router.navigate(['edit-contestant/' + id]);
  }

  delete(contestant) {
    this.clubService.removeContenstantFromClub(this.clubId, contestant.id).subscribe(
      data => {
        this.openDialog('Uspesno ste uklonili takmicara iz kluba', '350px', '300px', true);
      },
      error => {
        console.error("ERROR: ", error);
      }
    )
  }

  filter(parameter) {
    if (parameter === 'Ukloni filter') {
      this.dataSource.data = this.oldDataSource.data;
    } else {
      let contestants : Contestant[] = [];
      for(let contestant of this.oldDataSource.data){
        if(contestant.weightCategory.category === parameter){
          contestants.push(contestant);
        }
      }
      this.dataSource.data = contestants;
    }
  }

  openDialog(text: string, height: string, width: string, action: boolean) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: width,
      height: height,
      data: text
    });

    dialogRef.afterClosed().subscribe(result => {
      if (action) {
        this.router.navigate(['main-page']);
      }
    });
  }

  openAddContestantDialog() {
    const dialogRef = this.dialog.open(AddContestantToAClubComponent, {
      width: '1000px',
      height: '400px',
      data: this.clubId
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getDistinctCategories() {
    this.categoryService.getDistinctCategories().subscribe(
      data => {
        this.categories = data;
        this.categories.push("Ukloni filter");
      },
      error => {
        console.error("Error: ", error);
      }
    )
  }

}
