import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayProductComponent } from './play-product.component';

describe('PlayProductComponent', () => {
  let component: PlayProductComponent;
  let fixture: ComponentFixture<PlayProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
