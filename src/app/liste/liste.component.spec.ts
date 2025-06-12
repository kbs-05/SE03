import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LISTEComponent } from './liste.component';

describe('LISTEComponent', () => {
  let component: LISTEComponent;
  let fixture: ComponentFixture<LISTEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LISTEComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LISTEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
