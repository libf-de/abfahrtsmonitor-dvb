import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartureViewComponent } from './departure-view.component';

describe('DepartureViewComponent', () => {
  let component: DepartureViewComponent;
  let fixture: ComponentFixture<DepartureViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartureViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartureViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
