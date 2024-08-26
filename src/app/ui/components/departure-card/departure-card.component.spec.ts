import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartureCardComponent } from './departure-card.component';

describe('DepartureCardComponent', () => {
  let component: DepartureCardComponent;
  let fixture: ComponentFixture<DepartureCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartureCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartureCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
