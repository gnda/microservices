import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCartsComponent } from './card-carts.component';

describe('CardCartsComponent', () => {
  let component: CardCartsComponent;
  let fixture: ComponentFixture<CardCartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardCartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
