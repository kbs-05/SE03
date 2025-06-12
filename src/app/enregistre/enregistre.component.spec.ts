import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ENREGISTREComponent } from './enregistre.component';

describe('ENREGISTREComponent', () => {
  let component: ENREGISTREComponent;
  let fixture: ComponentFixture<ENREGISTREComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ENREGISTREComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ENREGISTREComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
