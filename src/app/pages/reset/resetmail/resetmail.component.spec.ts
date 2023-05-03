import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetmailComponent } from './resetmail.component';

describe('ResetmailComponent', () => {
  let component: ResetmailComponent;
  let fixture: ComponentFixture<ResetmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
