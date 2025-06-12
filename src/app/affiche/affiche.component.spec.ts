import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AFFICHEComponent } from './affiche.component';

describe('AFFICHEComponent', () => {
  let component: AFFICHEComponent;
  let fixture: ComponentFixture<AFFICHEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AFFICHEComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AFFICHEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
