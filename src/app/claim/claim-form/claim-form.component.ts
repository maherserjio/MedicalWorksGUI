import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { dataService } from '../../Services/dataService';
import { ModalComponent } from '../../Shared/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from '../../Services/errorToatr';
import { customValidationService } from '../../Services/customValidation';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

  @Component({
    selector: 'app-claim-form',
    templateUrl: './claim-form.component.html',
    styleUrls: ['./claim-form.component.css']
  })



export class ClaimFormComponent implements OnInit {
    editMode: boolean;
    ClaimBeingEditedId: number;
    title: string;
    ClaimForm: FormGroup;
    claim: any = {
          police_No: "",
          incurredDate: new Date(),
          ClaimedAmount:  1
        };

  constructor(private route: ActivatedRoute,
    private dataService: dataService,
    private router: Router,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private errorService: ErrorService,
    private customValidator: customValidationService
  ) { }

  ngOnInit(): void {
    this.editMode = this.route.snapshot.params['id'] != null;
    this.ClaimBeingEditedId = this.route.snapshot.params['id'];

    if (!this.editMode) {
      this.title = "Add Claim";
    }
    else {
      this.title = "Edit Claim";
    }

    this.init();
  }

    init() {
    // Initialize the Claim Reactive form
    this.ClaimForm = new FormGroup({
      'police_No': new FormControl(this.claim.police_No, [Validators.required,
      this.customValidator.policyNoValidator()]),
      'Incured_Date': new FormControl(this.claim.incurredDate, [Validators.required]),
      'Claimed_Amount': new FormControl(this.claim.ClaimedAmount, [Validators.required,
        this.customValidator.ClaimedAmountValidator()]   
      )
    });
      // if we are in edit mode patch the value of the claim being edited
    if (this.editMode) {
      this.dataService.getClaim(this.ClaimBeingEditedId).subscribe((claim: any) => {
        this.claim = claim;
        this.ClaimForm.patchValue({
          police_No: claim.police_No,
          Incured_Date: claim.incured_Date,
          Claimed_Amount: claim.claimed_Amount
        });
      });
    }
  }// end init

  onSubmit() {
    let claimToCreate = this.ClaimForm.value;
    // Display modal asking user to confirm creating claim
    // let's call our modal window
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        title: "Are you sure?",
        message: "You are about to submit the claim"
      }
    });

    // listen to response if yes or no 
    dialogRef.afterClosed().subscribe(dialogResult => {
      // if yes 
      if (dialogResult) {
        this.dataService.createClaim(claimToCreate).subscribe((res) => {
          //Show toastr
          this.toastr.success('Success', 'Claim created');
          // Redirect user to claim route
          this.router.navigateByUrl('/claim');
        }, (response) => {
          //Show toastr if ther is an error with our request
          this.errorService.ErrorToster(response);
        });      
      }
    });
    }//end on submit

}//end class
