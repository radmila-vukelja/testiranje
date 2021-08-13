import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { CategoryService } from '../../service/category.service';
import { LocationService } from '../../service/location.service';
import { ContestantService } from '../../service/contestant.service';
import { Genders } from '../../model/genders';
import { Category } from '../../model/category';
import { Location } from '../../model/location';
import { Contestant } from '../../model/contestant';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-contestant',
  templateUrl: './add-contestant.component.html',
  styleUrls: ['./add-contestant.component.css']
})
export class AddContestantComponent implements OnInit {

  genders: Genders[] = [
    { key: 'm', value: "M" },
    { key: 'z', value: "Z" }
  ]

  age = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]

  genderIsChoosen = false; categoryIsChoosen = false; weightCategoryIsChoosen = false; ageIsChoosen = false;
  selectedCategory; selectedGender; selectedWeight; weightCategory; selectedAge; selectedLocation;  name; lastName; location; jmbg;

  weightCategories: Category[] = [];
  allCategories: Category[] = [];
  categories: Category[] = [];
  locations: Location[] = [];

  constructor(
    private loginService: LoginService,
    private router: Router,
    private categoryService: CategoryService,
    private locationService: LocationService,
    private contestantService: ContestantService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllCategories();
    this.getDisctinctCategories();
    this.getAllLocations();
  }

  getAllCategories() {
    this.categoryService.getAll().subscribe(
      data => {
        this.allCategories = data;
        console.log(JSON.stringify(data, null, 2));
      },
      error => {
        console.error('Error: ', error);
      }
    )
  }

  findAllByGenderAndCategory(gender: string, category: string) {
    this.categoryService.findAllByGenderAndCategory(gender, category).subscribe(
      data => {
        this.weightCategories = data;
        console.log("\n\n\ncategories by gender: ", data);
      },
      error => {
        console.error("Error: ", error);
      }
    )
  }

  chooseGender(value) {
    this.genderIsChoosen = true;
    this.selectedGender = value;
  }

  chooseCategory(value) {
    this.categoryIsChoosen = true;
    this.selectedCategory = value;

    if (this.categoryIsChoosen && this.genderIsChoosen) {
      this.findAllByGenderAndCategory(this.selectedGender, this.selectedCategory)
    }
  }

  chooseWeightCategory(value) {
    console.log("weight: ", value);
    this.weightCategoryIsChoosen = true;
    this.selectedWeight = value;
  }

  chooseAge(value) {
    this.ageIsChoosen = true;
    this.selectedAge = value;
    console.log(value);
  }

  chooseLocation(value) {
    this.selectedLocation = value;
    console.log(value);
  }

  getDisctinctCategories() {
    this.categoryService.getDistinctCategories().subscribe(
      data => {
        for (let category of data) {
          let cat = new Category();
          cat.category = category;
          this.categories.push(cat)
        }

      },
      error => {
        console.error('Error: ', error);
      }
    )
  }

  addContestant() {
    if (
      !this.selectedCategory
      || !this.selectedGender
      || !this.selectedWeight
      || !this.name
      || !this.lastName
      || !this.jmbg
    ) {
      return this.openDialog('Morate da popunite sva polja.', '350px', '300px', false);
    } else if (this.name.length < 6) {
      return this.openDialog('Ime mora biti duze od 6 karaktera.', '350px', '300px', false);
    } else if (this.lastName.length < 6) {
      return this.openDialog('Prezime mora biti duze od 6 karaktera.', '350px', '300px', false);
    } else if (this.jmbg.length < 13) {
      return this.openDialog('Jmbg mora biti duzi od 13 karaktera.', '350px', '300px', false);
    }

    let contestant = new Contestant();
    contestant.name = this.name;
    contestant.lastName = this.lastName;
    contestant.age = this.selectedAge;
    contestant.jmbg = this.jmbg;
    contestant.location = this.selectedLocation;
    let category = new Category();
    category.weight = this.selectedWeight;
    category.gender = this.selectedGender;
    category.category = this.selectedCategory;
    contestant.weightCategory = category;
    this.createNewContestant(contestant);
  }

  createNewContestant(contestant: Contestant) {
    this.contestantService.save(contestant).subscribe(
      data => {
        console.log('\n\n\n ', data);
        this.openDialog('Uspesno ste dodali takmicara', '350px', '300px', false);
      },
      error => {
        console.log("Error: ", error);
        this.openDialog(error.message, '350px', '300px', false);
      }
    )
  }

  getAllLocations() {
    this.locationService.getAll().subscribe(
      data => {
        this.locations = data;
      },
      error => {
        console.error("Error: ", error);
      }
    )
  }

  openDialog(text: string, height: string, width: string, action: boolean) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: width,
      height: height,
      data: text
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
