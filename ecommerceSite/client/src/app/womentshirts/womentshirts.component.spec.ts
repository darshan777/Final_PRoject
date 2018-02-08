import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WomentshirtsComponent } from './womentshirts.component';

describe('WomentshirtsComponent', () => {
  let component: WomentshirtsComponent;
  let fixture: ComponentFixture<WomentshirtsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WomentshirtsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WomentshirtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
