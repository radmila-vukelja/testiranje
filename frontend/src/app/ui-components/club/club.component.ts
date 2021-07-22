import { Component, Input, OnInit } from '@angular/core';
import { Club } from '../../model/club';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent implements OnInit {

  @Input("club") club: Club;
  constructor() { }

  ngOnInit(): void {
    console.log(this.club)
  }

}
