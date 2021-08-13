import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Narudzbina } from 'src/app/model/narudzbina';

@Component({
  selector: 'app-stranica-za-stampu',
  templateUrl: './stranica-za-stampu.component.html',
  styleUrls: ['./stranica-za-stampu.component.css']
})
export class StranicaZaStampuComponent implements OnInit {

  displayedColumns: string[] = ['nazivRestorana', 'datumDostave', 'nazivHrane', 'komentar', 'iznosZaNaplatu', 'moguceIsporuciti'];
  dataSource = new MatTableDataSource<Narudzbina>();
  
  constructor() { }

  ngOnInit(): void {
    let items = localStorage.getItem('stampa');
    this.dataSource.data = JSON.parse(items);
    setTimeout( ()=>{
      window.print();
    }, 500)
  }
}
