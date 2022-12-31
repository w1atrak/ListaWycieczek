import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KoszykWycieczekComponent } from './koszyk-wycieczek.component';

describe('KoszykWycieczekComponent', () => {
  let component: KoszykWycieczekComponent;
  let fixture: ComponentFixture<KoszykWycieczekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KoszykWycieczekComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KoszykWycieczekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
