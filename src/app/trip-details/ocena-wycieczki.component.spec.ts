import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcenaWycieczkiComponent } from './ocena-wycieczki.component';

describe('OcenaWycieczkiComponent', () => {
  let component: OcenaWycieczkiComponent;
  let fixture: ComponentFixture<OcenaWycieczkiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OcenaWycieczkiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OcenaWycieczkiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
