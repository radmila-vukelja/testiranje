import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

/** Dialog component */
import { DialogComponent } from './components/shared/dialog/dialog.component';

/** Import services */
import { GuardService } from './service/guard.service';
import { LoginService } from './service/login.service';
import { RestoranService } from './service/restoran.service';

/** Angular material imports  */
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { CdkTreeModule } from '@angular/cdk/tree';

/** Regular components  */
import { IzbrisiNarudzbinuComponent } from './components/shared/izbrisi-narudzbinu/izbrisi-narudzbinu.component';
import { StranicaZaStampuComponent } from './components/shared/stranica-za-stampu/stranica-za-stampu.component';
import { ClubComponent } from './components/ui-components/club/club.component';
import { ClubPageComponent } from './components/club-page/club-page.component';
import { AddContestantComponent } from './components/add-contestant/add-contestant.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AddClubComponent } from './components/add-club/add-club.component';
import { AddContestantToAClubComponent } from './components/add-contestant-to-a-club/add-contestant-to-a-club.component';
import { HomeComponent } from './components/shared/home/home.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EditClubComponent } from './edit-club/edit-club.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    DialogComponent,
    StranicaZaStampuComponent,
    ClubComponent,
    ClubPageComponent,
    AddContestantComponent,
    MainPageComponent,
    AddClubComponent,
    AddContestantToAClubComponent,
    EditClubComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    HttpClientModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    CdkTreeModule
  ],
  providers: [
    GuardService,
    LoginService,
    HttpClient,
    DialogComponent,
    IzbrisiNarudzbinuComponent,
    MatDatepickerModule,
    RestoranService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
