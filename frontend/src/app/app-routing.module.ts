import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ClubPageComponent } from './club-page/club-page.component';
import { StranicaZaStampuComponent } from './staro/stranica-za-stampu/stranica-za-stampu.component';
import { AddContestantComponent } from './add-contestant/add-contestant.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AddClubComponent } from './add-club/add-club.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'club-full-info', component: ClubPageComponent },
  { path: 'club-full-info/:id', component: ClubPageComponent },
  { path: 'add-contestant', component: AddContestantComponent},
  { path: 'main-page', component: MainPageComponent},
  { path: 'add-club', component: AddClubComponent},
  { path: 'stampaj', component: StranicaZaStampuComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
