import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Club } from '../../../model/club';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent implements OnInit {

  @Input("club") club: Club;
  constructor(private router: Router) { }


  ngOnInit(): void {
    console.log(this.club);
  }

  redirectToClubDetails() {
    this.router.navigate(['club-full-info/' + this.club.id]);
  }

  redirectToEditClub() {
    this.router.navigate(['edit-club/' + this.club.id]);
  }

}
