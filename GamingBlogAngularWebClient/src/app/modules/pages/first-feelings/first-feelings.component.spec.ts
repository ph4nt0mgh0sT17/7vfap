import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstFeelingsComponent } from './first-feelings.component';

describe('FirstFeelingsComponent', () => {
  let component: FirstFeelingsComponent;
  let fixture: ComponentFixture<FirstFeelingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstFeelingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstFeelingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
