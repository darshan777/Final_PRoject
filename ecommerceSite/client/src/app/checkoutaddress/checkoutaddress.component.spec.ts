import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutaddressComponent } from './checkoutaddress.component';

describe('CheckoutaddressComponent', () => {
  let component: CheckoutaddressComponent;
  let fixture: ComponentFixture<CheckoutaddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutaddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutaddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
