import { Injectable } from '@angular/core'
import { Observable, BehaviorSubject } from 'rxjs'
import { FormGroup, FormBuilder, FormArray } from '@angular/forms'
import { PolicyForm, Policy } from '../policy/_models';
import { BeneficiaryForm, beneficiary } from '../beneficiary/_models';

@Injectable({ providedIn: 'root' })
export class policyFormService  {
  todaydate: Date = new Date();
    policy: any = {
        effective: new Date(Date.now()),
        expiry: new Date(this.todaydate.getTime() + (1000 * 60 * 60 * 24)),
        police_No: null,
        beneficiaries: []
      }

  // Here were the magic happpens we subscribe to this to push forms or remove them
  private PolicyForm: BehaviorSubject<FormGroup | undefined> = new BehaviorSubject
    (this.fb.group(new PolicyForm(new Policy(null, this.policy.effective, this.policy.expiry))))

  policyForm$: Observable<FormGroup> = this.PolicyForm.asObservable()

  constructor(private fb: FormBuilder) { }

  // Remove All beneficiaries so we start fresh 
  clearBeneficiaries() {
    const currentPolicy = this.PolicyForm.getValue()
    const currentBeneficiaries = currentPolicy.get('beneficiaries') as FormArray
    for (var i = 0; i < currentBeneficiaries.length; i++) {
      currentBeneficiaries.removeAt(i);
    }
   
  }
  // Add a beneficiary form
  addBeneficiary(beneficiaries: beneficiary[]) {
    const currentPolicy = this.PolicyForm.getValue()
    const currentBeneficiaries = currentPolicy.get('beneficiaries') as FormArray

    for (var i = 0; i < beneficiaries.length; i++) {
      currentBeneficiaries.push(
        this.fb.group(
          new BeneficiaryForm(beneficiaries[i])
        )
      )
    }
    

    this.PolicyForm.next(currentPolicy)
  }

    // Delete a beneficiary form
  deleteBeneficiary(i: number) {
    const currentPolicy = this.PolicyForm.getValue()
    const currentBeneficiaries = currentPolicy.get('beneficiaries') as FormArray

    currentBeneficiaries.removeAt(i)

    this.PolicyForm.next(currentPolicy)
  }



}
