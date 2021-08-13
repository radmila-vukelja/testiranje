import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-izbrisi-narudzbinu',
  templateUrl: './izbrisi-narudzbinu.component.html',
  styleUrls: ['./izbrisi-narudzbinu.component.css']
})
export class IzbrisiNarudzbinuComponent implements OnInit {

  text: string;

  constructor(
    public dialogRef: MatDialogRef<IzbrisiNarudzbinuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {
    this.text = data;
  }

  onOkay(): void {
    this.dialogRef.close('izbrisi');
  }

  onCancel(){
    this.dialogRef.close('odustani');
  }

  ngOnInit(): void {
  }

}
