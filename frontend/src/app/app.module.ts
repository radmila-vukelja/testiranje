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
import { ClubComponent } from './components/club/club.component';
import { ClubPageComponent } from './components/club-page/club-page.component';
import { AddContestantComponent } from './components/add-contestant/add-contestant.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AddClubComponent } from './components/add-club/add-club.component';
import { AddContestantToAClubComponent } from './components/add-contestant-to-a-club/add-contestant-to-a-club.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EditClubComponent } from './components/edit-club/edit-club.component';
import { EditContestantComponent } from './components/edit-contestant/edit-contestant.component';
import { DeleteDialogComponent } from './components/shared/delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    DialogComponent,
    ClubComponent,
    ClubPageComponent,
    AddContestantComponent,
    MainPageComponent,
    AddClubComponent,
    AddContestantToAClubComponent,
    EditClubComponent,
    EditContestantComponent,
    DeleteDialogComponent
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
    MatDatepickerModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
