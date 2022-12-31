import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrowanieWycieczekComponent } from './filtrowanie-wycieczek.component';

describe('FiltrowanieWycieczekComponent', () => {
  let component: FiltrowanieWycieczekComponent;
  let fixture: ComponentFixture<FiltrowanieWycieczekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltrowanieWycieczekComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltrowanieWycieczekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
