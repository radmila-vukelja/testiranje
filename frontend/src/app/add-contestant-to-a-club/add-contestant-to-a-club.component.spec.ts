import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContestantToAClubComponent } from './add-contestant-to-a-club.component';

describe('AddContestantToAClubComponent', () => {
  let component: AddContestantToAClubComponent;
  let fixture: ComponentFixture<AddContestantToAClubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddContestantToAClubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContestantToAClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
