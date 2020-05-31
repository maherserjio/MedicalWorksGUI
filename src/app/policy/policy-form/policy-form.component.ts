import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { policyFormService } from '../../Services/policyForm.service';
import { dataService } from '../../Services/dataService';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from '../../Services/errorToatr';


@Component({
  selector: 'app-policy-form',
  templateUrl: './policy-form.component.html',
  styleUrls: ['./policy-form.component.css']
})
export class PolicyFormComponent implements OnInit {
  editMode: boolean;
  PolicyBeingEditedId: number;
  title: string;
  policyForm: FormGroup;
  policyFormSub: Subscription
  beneficiaries: FormArray;
  policyToCreate: any;

  constructor(private route: ActivatedRoute,
    private policyFormService: policyFormService,
    private dataService: dataService,
    private router: Router,
    private toastr: ToastrService,
    private errorService: ErrorService
  ) { }

  ngOnInit(): void {
    this.editMode = this.route.snapshot.params['id'] != null;

    if (!this.editMode) {
      this.title = "Create Policy";
    } else {
      this.title = "Edit Policy";
      this.PolicyBeingEditedId = this.route.snapshot.params['id'];
    }

    this.policyFormSub = this.policyFormService.policyForm$
      .subscribe(policy => {
        this.policyForm = policy     
        this.beneficiaries = this.policyForm.get('beneficiaries') as FormArray
      })

    this.initForm();
    this.policyFormService.clearBeneficiaries();

  }

  initForm() {
    // If we are in edit Mode get the policy being editet and patch the form Values
    if (this.editMode) { 
      this.dataService.getPolicy(this.PolicyBeingEditedId).subscribe((policy: any) => {
        this.policyForm.patchValue({
          police_No: policy.police_No,
          effective: policy.effective,
          expiry: policy.expiry,
        });
        this.policyFormService.addBeneficiary(policy.beneficiaries);
      });
    }
  }
  // Remove Subscription we dont want to cause memory leaks
  ngOnDestroy() {
    this.policyFormSub.unsubscribe()
  }

  // Inject another Beneficiary form 
  addBeneficiary() {
    this.policyFormService.addBeneficiary
      ([{ name: null, relationshipId: null, genderId: null, date_Of_Birth: null }])
  }
    // Remove a Beneficiary form 
  deleteBeneficiary(index: number) {
    this.policyFormService.deleteBeneficiary(index)
  }

  onSubmit() {
    this.policyToCreate =  { ...this.policyForm.value };

    for (var i = 0; i < this.policyForm.value.beneficiaries.length; i++) {
      const currentYear: any = (new Date()).getFullYear();
      // Calculate the beneficiary age.
      this.policyToCreate.beneficiaries[i].Age =
        currentYear - new Date(this.policyForm.value.beneficiaries[i].date_Of_Birth).getFullYear();
    }

    if (!this.editMode) { 
      // Create policy 
      this.dataService.createPolicy(this.policyToCreate).subscribe((res) => {
        //show toaster
        this.toastr.success('Success', 'Policy created');
       // Then Navigate to policy List
        this.router.navigateByUrl('/policy');
      }, (response) => {
          //Show toastr if ther is an error with our request
          this.errorService.ErrorToster(response);
      });

    } else {
      // Update Policy 
      this.dataService.updatePolicy(this.policyToCreate, this.PolicyBeingEditedId).subscribe((res) => {
        //show toaster
        this.toastr.success('Success', 'Policy updated');
     //   then Navigate to policy List
        this.router.navigateByUrl('/policy');
      }, (response) => {
        //Show toastr if ther is an error with our request
          this.errorService.ErrorToster(response);
      });
    }

  }// end on submit

}// end class
