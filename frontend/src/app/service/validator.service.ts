import { Injectable } from '@angular/core';
import { DialogComponent } from '../components/shared/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor(
    public dialog: MatDialog
  ) { }

  openDialog(text: string, height: string, width: string, action: boolean) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: width,
      height: height,
      data: text
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  validatePassword(password, charLength) {
    if (!password || password.length < charLength) {
      this.openDialog('Sifra mora biti duza od ' + (charLength - 1) + ' karaktera', '350px', '300px', false);
      return false;
    }
    return true;
  }

  validateUsername(username, charLength) {
    if (!username || username.length < charLength) {
      this.openDialog('Korisnicko ime mora biti duze od ' + (charLength - 1) + ' karaktera', '350px', '300px', false);
      return false;
    }
    return true;
  }

  validateRegularField(field, charLength, fieldName) {
    if (!field || field.length < charLength) {
      this.openDialog(fieldName + ' mora biti duze od ' + (charLength - 1) + ' karaktera', '350px', '300px', false);
      return false;
    }
    return true;
  }

  validateEmail(email, charLength) {
    if (!email || email.length < charLength || !/^\S+@\S+$/.test(email)) {
      this.openDialog('Email mora biti validan i duzi od ' + (charLength - 1) + ' karaktera', '350px', '300px', false);
      return false;
    }
    return true;
  }

  validatePasswordAndRepeatPassword(password, repeatPassword, charLength) {
    if (!password || password.length < charLength || !repeatPassword || repeatPassword.length < charLength || password !== repeatPassword) {
      this.openDialog('Sifre se moraju podudarati i moraju biti duze od ' + (charLength - 1) + ' karaktera', '350px', '300px', false);
      return false;
    }
    return true;
  }

}
