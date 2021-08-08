import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-add-contestant',
  templateUrl: './add-contestant.component.html',
  styleUrls: ['./add-contestant.component.css']
})
export class AddContestantComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

}
