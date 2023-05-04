import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterContactByDateComponent } from './filter-contact-by-date.component';

describe('FilterContactByDateComponent', () => {
  let component: FilterContactByDateComponent;
  let fixture: ComponentFixture<FilterContactByDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterContactByDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterContactByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
