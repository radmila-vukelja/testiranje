import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/shared/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ClubPageComponent } from './components/club-page/club-page.component';
import { AddContestantComponent } from './components/add-contestant/add-contestant.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AddClubComponent } from './components/add-club/add-club.component';
import { EditClubComponent } from './components/edit-club/edit-club.component';
import { EditContestantComponent } from './components/edit-contestant/edit-contestant.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'home', component: MainPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'club-full-info', component: ClubPageComponent },
  { path: 'club-full-info/:id', component: ClubPageComponent },
  { path: 'edit-club', component: EditClubComponent },
  { path: 'edit-club/:id', component: EditClubComponent },
  { path: 'edit-contestant', component: EditContestantComponent },
  { path: 'edit-contestant/:id', component: EditContestantComponent },
  { path: 'add-contestant', component: AddContestantComponent },
  { path: 'main-page', component: MainPageComponent },
  { path: 'add-club', component: AddClubComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
