import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { dataService } from './dataService';

@Injectable({
  providedIn: 'root'
})
export class customValidationService {
  constructor(private dataService: dataService) { }

  ValidPolicyNo: any = [];

  // Policy no(textfield – should have a validator which verifies
  //that the input value is a valid policy# No in the database once the field loses focus)
  policyNoValidator(): ValidatorFn {
    // get list of available policies No #
    this.dataService.getPolicies().subscribe((policies: any) => {
      this.ValidPolicyNo = policies.map((policy) => {
        return policy.police_No;
      })
    });

    //  validate policy number input againt our list of available policies numbers
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.IsPolicyValid(control.value))
        return null;
      else {
        return { 'InValidPolicyNo': { value: control.value } }
      }
    };
  }

  IsPolicyValid(policeNo: string) {
    let policyExists: boolean = false;
    for (var i = 0; i < this.ValidPolicyNo.length; i++) {
      if (policeNo === this.ValidPolicyNo[i])
        policyExists = true;
    }
    return (policyExists);
  }
  
  // validate Claimed Amount must be more than 0 
  ClaimedAmountValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value >= 1 || !control.dirty)
        return null;
      else {
        return { 'InValidClaimedAmount': { value: control.value } }
      }
    };
  }
}
