import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './shared/home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { NaruciHranuComponent } from './naruci-hranu/naruci-hranu.component';

/** Dialog component */
import { DialogComponent } from './shared/dialog/dialog.component';

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
import { DodajRestoranComponent } from './dodaj-restoran/dodaj-restoran.component';
import { IzmeniNarudzbinuComponent } from './izmeni-narudzbinu/izmeni-narudzbinu.component';
import { MatSelectModule, MatSelect } from '@angular/material/select';
import { IzbrisiNarudzbinuComponent } from './shared/izbrisi-narudzbinu/izbrisi-narudzbinu.component';
import { StranicaZaStampuComponent } from './stranica-za-stampu/stranica-za-stampu.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    DialogComponent,
    NaruciHranuComponent,
    DodajRestoranComponent,
    IzmeniNarudzbinuComponent,
    IzbrisiNarudzbinuComponent,
    StranicaZaStampuComponent
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
    MatSelectModule
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
