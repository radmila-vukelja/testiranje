import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
import { DeleteDialogComponent } from '../shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-edit-contestant',
  templateUrl: './edit-contestant.component.html',
  styleUrls: ['./edit-contestant.component.css']
})
export class EditContestantComponent implements OnInit {

  genders: Genders[] = [
    { key: 'm', value: "M" },
    { key: 'z', value: "Z" }
  ]

  age = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]

  genderIsChoosen = false; categoryIsChoosen = false; weightCategoryIsChoosen = false; ageIsChoosen = false;
  selectedCategory; selectedGender; selectedWeight; weightCategory; selectedAge; selectedLocation; name; lastName; location; jmbg;
  selectedWeightCategory;

  defaultLocation; defaultAge; defaultGender; defaultCategory; defaultWeight;

  weightCategories: Category[] = [];
  allCategories: Category[] = [];
  categories: Category[] = [];
  locations: Location[] = [];
  contestant: Contestant;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private locationService: LocationService,
    private contestantService: ContestantService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllCategories();
    this.getDisctinctCategories();
    this.getAllLocations();
    this.catchIdFromUrl();
  }

  catchIdFromUrl() {
    this.activatedRoute.params.forEach((params: Params) => {
      let id = params['id'];
      this.fetchContestantById(id);
    });
  }

  fetchContestantById(id) {
    this.contestantService.getOne(id).subscribe(
      data => {
        this.contestant = data;
        this.setContestantDefaultData(data);
      },
      error => {
        console.error("ERROR: ", error);
      }
    )
  }

  setContestantDefaultData(contestant: Contestant) {
    this.genderIsChoosen = true;
    this.categoryIsChoosen = true;
    this.weightCategoryIsChoosen = true;
    this.defaultLocation = contestant.location;
    this.defaultAge = contestant.age;
    this.defaultGender = contestant.weightCategory.gender === 'Male' ? { key: 'M' } : { key: 'Z' }
    this.defaultCategory = contestant.weightCategory;
    this.selectedCategory = contestant.weightCategory.category;
    this.selectedGender = contestant.weightCategory.gender;
    this.selectedLocation = contestant.location;
    this.selectedWeight = contestant.weightCategory.weight;
    this.selectedAge = contestant.age;
    if (this.categoryIsChoosen && this.genderIsChoosen) {
      this.findAllByGenderAndCategory(this.defaultGender.key === 'M' ? 'Male' : 'Female', this.defaultCategory.category)
    }
    this.ageIsChoosen = true;
    this.name = contestant.name;
    this.lastName = contestant.lastName;
    this.location = contestant.location;
    this.jmbg = contestant.jmbg;

    this.defaultWeight = contestant.weightCategory;
  }

  getAllCategories() {
    this.categoryService.getAll().subscribe(
      data => {
        this.allCategories = data;
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
    this.weightCategoryIsChoosen = true;
    this.selectedWeight = value;
  }

  chooseAge(value) {
    this.ageIsChoosen = true;
    this.selectedAge = value;
  }

  chooseLocation(value) {
    this.selectedLocation = value;
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

  editContestant() {
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


    this.contestant.name = this.name;
    this.contestant.lastName = this.lastName;
    this.contestant.age = this.selectedAge;
    this.contestant.jmbg = this.jmbg;
    this.contestant.location = this.selectedLocation;
    this.contestant.isAddedToAClub = false;
    let category = new Category();
    category.weight = this.selectedWeight;
    category.gender = this.selectedGender;
    category.category = this.selectedCategory;
    this.contestant.weightCategory = category;
    this.createNewContestant(this.contestant);
  }

  createNewContestant(contestant: Contestant) {
    this.contestantService.save(contestant).subscribe(
      data => {
        this.openDialog('Uspesno ste izmenili takmicara', '350px', '300px', true);
      },
      error => {
        console.error("Error: ", error);
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
      if(action){
        this.router.navigate(['main-page']);
      }
    });
  }

  delete() {
    this.openDeleteDialog("Da li ste sigurni da zelite da izbrisete takmicara?", '350px', '300px', false);
  }

  deleteContestant() {
    this.contestantService.delete(this.contestant.id).subscribe(
      data => {
        this.openDialog('Uspesno ste izbrisali takmicara', '350px', '300px', false);
      },
      error => {
        console.error("ERROR: ", error);
      }
    )
  }

  openDeleteDialog(text: string, height: string, width: string, action: boolean) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: width,
      height: height,
      data: text
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === "delete") {
        this.dialog.closeAll();
        this.deleteContestant();
      }
    });
  }

}
