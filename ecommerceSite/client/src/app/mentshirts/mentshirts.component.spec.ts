import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentshirtsComponent } from './mentshirts.component';

describe('MentshirtsComponent', () => {
  let component: MentshirtsComponent;
  let fixture: ComponentFixture<MentshirtsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentshirtsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentshirtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
