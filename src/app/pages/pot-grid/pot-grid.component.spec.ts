import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotGridComponent } from './pot-grid.component';

describe('PotGridComponent', () => {
  let component: PotGridComponent;
  let fixture: ComponentFixture<PotGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PotGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PotGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
