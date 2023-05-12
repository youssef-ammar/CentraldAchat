import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PomotionComponent } from './pomotion.component';

describe('PomotionComponent', () => {
  let component: PomotionComponent;
  let fixture: ComponentFixture<PomotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PomotionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PomotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
