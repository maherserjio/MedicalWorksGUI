import { FormArray, FormControl, Validators, FormGroup } from '@angular/forms'
import { Policy } from './policy.model'

export class PolicyForm {
 
  beneficiaries = new FormArray([])
  effective = new FormControl();
  expiry = new FormControl();
  police_No = new FormControl();

  constructor(policy: Policy) {

    if (policy.policyNo) {
      this.police_No.setValue(policy.policyNo)
      this.police_No.setValidators([Validators.required])
    }

    if (policy.effective) {
      this.effective.setValue(policy.effective)
      this.effective.setValidators([Validators.required])
    }

    if (policy.expiry) {
      this.expiry.setValue(policy.expiry)
      this.expiry.setValidators([Validators.required])
 
    }

    if (policy.beneficiaries) {
      this.beneficiaries.setValue(policy.beneficiaries)
 
    }
  }




}
