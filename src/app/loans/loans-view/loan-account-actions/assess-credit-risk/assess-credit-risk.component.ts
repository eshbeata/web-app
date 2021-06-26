/** Angular Imports */
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

/** Custom Services */
import { LoansService } from 'app/loans/loans.service';
import { SettingsService } from 'app/settings/settings.service';

/**
 * Loans Screen Reports Component.
 */
@Component({
  selector: 'mifosx-assess-credit-risk',
  templateUrl: './assess-credit-risk.component.html',
  styleUrls: ['./assess-credit-risk.component.scss']
})
export class AssessCreditRiskComponent implements OnInit {

  /** Loan Screen Reportform. */
  creditRiskForm: FormGroup;
  /** Loan Id */
  loanId: any;
  /** Template Data */
  templateData: {
    age: number,
    sex: string,
    job: string,
    housing: string
    creditAmount: number,
    duration: number,
    purpose: string,
    risk: string,
    genderOptions: {
      id: any,
      name: string
    }[],
    housingOptions: {
      id: any,
      name: string
    }[],
  };

  /**
   * Fetches Loan Action Data from `resolve`
   * @param {FormBuilder} formBuilder Form Builder
   * @param {LoansService} loansService Loans Service
   * @param {ActivatedRoute} route Activated Route
   * @param {Router} router Router for navigation.
   * @param {SettingsService} settingsService Settings Service
   */
  constructor(private formBuilder: FormBuilder,
    private loansService: LoansService,
    private route: ActivatedRoute,
    private router: Router,
    private settingsService: SettingsService) {
    this.route.data.subscribe((data: { actionButtonData: any }) => {
      this.templateData = data.actionButtonData;
    });
    this.loanId = this.route.parent.snapshot.params['loanId'];
  }

  /**
   * Creates the loan screen report form.
   */
  ngOnInit() {
    console.log(this);
    this.createCreditRiskForm();
  }

  /**
   * Creates the loan screen report form.
   */
  createCreditRiskForm() {
    this.creditRiskForm = this.formBuilder.group({
      'age': [this.templateData.age, Validators.required],
      'sex': ['', Validators.required],
      'job': [this.templateData.job, Validators.required],
      'housing': ['', Validators.required],
      'creditAmount': [this.templateData.creditAmount, Validators.required],
      'duration': [this.templateData.duration, Validators.required],
      'purpose': [this.templateData.purpose, Validators.required]
    });
  }

  submit() {
    const scorecardData = this.creditRiskForm.value;
    scorecardData.locale = this.settingsService.language.code;
    scorecardData.dateFormat = this.settingsService.dateFormat;

    console.log(scorecardData);

    this.loansService.assessCreditRisk(this.loanId, scorecardData).subscribe(res => {
      this.router.navigate(['../../general'], { relativeTo: this.route });
    });
  }

}
