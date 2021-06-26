import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessCreditRiskComponent } from './assess-credit-risk.component';

describe('LoanScreenReportsComponent', () => {
  let component: AssessCreditRiskComponent;
  let fixture: ComponentFixture<AssessCreditRiskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessCreditRiskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessCreditRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
