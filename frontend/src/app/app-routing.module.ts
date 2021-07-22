import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NaruciHranuComponent } from './naruci-hranu/naruci-hranu.component';
import { DodajRestoranComponent } from './dodaj-restoran/dodaj-restoran.component';
import { IzmeniNarudzbinuComponent } from './izmeni-narudzbinu/izmeni-narudzbinu.component';
import { StranicaZaStampuComponent } from './stranica-za-stampu/stranica-za-stampu.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'naruci-hranu', component: NaruciHranuComponent },
  { path: 'dodaj-restoran', component: DodajRestoranComponent },
  { path: 'izmeni-narudzbinu/:id', component: IzmeniNarudzbinuComponent },
  { path: 'stampaj', component: StranicaZaStampuComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
