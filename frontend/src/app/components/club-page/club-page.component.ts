import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Club } from '../../model/club';
import { Contestant } from '../../model/contestant';
import { Location } from '../../model/location';
import { Category } from '../../model/category';
import { LoginService } from '../../service/login.service';
import { ClubService } from '../../service/club.service';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-club-page',
  templateUrl: './club-page.component.html',
  styleUrls: ['./club-page.component.css']
})
export class ClubPageComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  locat = new Location();
  cat = new Category();
  locations: Location[] = [];

  displayedColumns: string[] = ['id', 'name', 'lastName', 'age', 'location', 'jmbg', 'category', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Contestant>();
  filterParametar: string;
  filterJeKliknut = false;
  oldDataSource;
  categories: string[] = [];
  club: Club;

  constructor(
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService,
    private clubService: ClubService,
    private categoryService: CategoryService,
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
      this.fetchClubById(id);
    });
  }

  fetchClubById(id: number) {
    this.clubService.getOne(id).subscribe(
      data => {
        this.dataSource.data = data.contenstantList;
      },
      error => {
        console.error("Error: ", error);
      }
    )
  }

  edit(id) {

  }

  delete(id) {

  }

  filter() {

  }

  getDistinctCategories(){
    this.categoryService.getDistinctCategories().subscribe(
      data => {
        this.categories = data;
        console.log(data);
      },
      error =>{
        console.error("Error: ", error);
      }
    )
  }

}
