import { FormControl, Validators } from '@angular/forms'
import { beneficiary } from './beneficiary.model'

export class BeneficiaryForm {
  name = new FormControl()
  relationshipId = new FormControl()
  genderId = new FormControl()
  date_Of_Birth = new FormControl()

  constructor(
    beneficiary: beneficiary
  ) {
    this.name.setValue(beneficiary.name)
    this.name.setValidators([Validators.required])

    this.relationshipId.setValue(beneficiary.relationshipId)
    this.relationshipId.setValidators([Validators.required])

    this.genderId.setValue(beneficiary.genderId)
    this.genderId.setValidators([Validators.required])
      
    this.date_Of_Birth.setValue(beneficiary.date_Of_Birth)
    this.date_Of_Birth.setValidators([Validators.required])
  }
}
