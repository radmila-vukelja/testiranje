import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Club } from '../model/club';
import { Contestant } from '../model/contestant';
import { Location } from '../model/location';
import { WeightCategory } from '../model/weight-category';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-club-page',
  templateUrl: './club-page.component.html',
  styleUrls: ['./club-page.component.css']
})
export class ClubPageComponent implements OnInit {
  locat = new Location();
  cat = new WeightCategory();
  //Kadet, junior, u21, senior
  MOCKED_TABLE_DATA: Contestant[] = [
    { id: 1, name: 'test-name', lastName: 'lastname', age: 12, location: this.locat, jmbg: 123123123, weightCategory: this.cat },
    { id: 2, name: 'test-name-2', lastName: 'lastname-2', age: 12, location: this.locat, jmbg: 123123123, weightCategory: this.cat },
    { id: 3, name: 'test-name-3', lastName: 'lastname-3', age: 12, location: this.locat, jmbg: 123123123, weightCategory: this.cat },
  ];

  displayedColumns: string[] = ['id', 'name', 'lastName', 'age', 'location', 'jmbg', 'category', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Contestant>();
  filterParametar: string;
  filterJeKliknut = false;
  oldDataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  club: Club;
  constructor(
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.loginService.isUserLoggedIn()) {
      this.router.navigate(['login']);
    }
    this.catchIdFromUrl();
    this.dataSource.data = this.MOCKED_TABLE_DATA;
    this.locat.id = 1;
    this.locat.name = "Novo Jebeno Milosevo"
    this.cat.id = 2;
    this.cat.weight = 62;
    this.cat.gender = "Female";
    this.cat.category = "Junior";
  }

  catchIdFromUrl() {
    this.activatedRoute.params.forEach((params: Params) => {
      let id = params['id'];
      this.fetchClubById(id);
    });
  }

  fetchClubById(id: number) {

  }

  edit(id) {

  }

  delete(id) {

  }

  filtriraj() {

  }

}
