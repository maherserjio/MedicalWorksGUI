import { beneficiary } from '../../beneficiary/_models/beneficiary.model'

export class Policy {

    policyNo: string
    effective: Date
    expiry: Date
    beneficiaries: beneficiary[]

  constructor(policyNo?: string, effective?: Date, expiry?: Date, beneficiaries?: beneficiary[]) {
    this.policyNo = policyNo
    this.effective = effective
    this.expiry = expiry
    this.beneficiaries = beneficiaries
    }
} 
