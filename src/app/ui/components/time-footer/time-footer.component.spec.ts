import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeFooterComponent } from './time-footer.component';

describe('TimeFooterComponent', () => {
  let component: TimeFooterComponent;
  let fixture: ComponentFixture<TimeFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
