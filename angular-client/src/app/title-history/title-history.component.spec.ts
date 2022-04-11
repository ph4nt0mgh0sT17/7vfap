import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleHistoryComponent } from './title-history.component';

describe('TitleHistoryComponent', () => {
  let component: TitleHistoryComponent;
  let fixture: ComponentFixture<TitleHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitleHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
