import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Club } from '../../model/club';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { ClubService } from '../../service/club.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  
  clubs: Club[] = [];

  constructor(
    private loginService: LoginService,
    private router: Router,
    public dialog: MatDialog,
    private clubService: ClubService
  ) { }

  ngAfterViewInit() {
  }

  ngOnInit(): void {
    if (!this.loginService.isUserLoggedIn()) {
      this.router.navigate(['login']);
    }
   
    this.getAllClubs();
  }

  getAllClubs(){
    this.clubService.getAll().subscribe(
      data =>{
        this.clubs = data;
      },
      error =>{
        console.error("Error: ", error);
      }
    )
  }

  opetDeleteDialog(text: string, height: string, width: string, id: number) {
    const dialogRef = this.dialog.open(null, {
      width: width,
      height: height,
      data: text
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'izbrisi') {
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
