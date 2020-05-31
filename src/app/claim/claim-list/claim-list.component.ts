import { Component, OnInit } from '@angular/core';
import { dataService } from '../../Services/dataService';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../Shared/modal/modal.component';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from '../../Services/errorToatr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { customValidationService } from '../../Services/customValidation';

export interface Claim {
  id: string;
  policyNo: string;
  incuredDate: Date;
  ClaimedAmount: number;
}


@Component({
  selector: 'app-claim-list',
  templateUrl: './claim-list.component.html',
  styleUrls: ['./claim-list.component.css']
})
export class ClaimListComponent implements OnInit {
  claims: any = [];
  SearchForm: FormGroup;
  displayedColumns = ['id', 'policyNo', 'incuredDate', 'ClaimedAmount', 'update', 'delete'];
  dataSource = new MatTableDataSource<Claim>();

  constructor(private dataService: dataService,
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private errorService: ErrorService,
    private customValidator: customValidationService) { }

  ngOnInit(): void {
    this.init();
    this.GetAllClaims();
  }

  init() {
    // Initialize the Claim Reactive form
    this.SearchForm = new FormGroup({
      'Claimed_Amount_From': new FormControl(null, [this.customValidator.ClaimedAmountValidator ()]),
      'Claimed_Amount_To': new FormControl(null, [this.customValidator.ClaimedAmountValidator()]),
      'police_No': new FormControl(null, [this.customValidator.policyNoValidator()]),
    });
    
  }

  // Get the claims and inject them in our data source for the table
  GetAllClaims() {
    this.dataService.getFilteredClaims({}).subscribe((filterdClaims: any) => {
      this.claims = filterdClaims;
      this.dataSource.data = filterdClaims.filterdClaims;
    })
  }

  onSubmitClaim() {
    this.router.navigateByUrl("/claim/new");
  }

  redirectToUpdate = (id: string) => {
    this.router.navigateByUrl("/claim/edit/"+id);
  }

  redirectToDelete = (id: string) => {
    // Display modal asking user to confirm creating claim
    // let's call our modal window
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        title: "Are you sure?",
        message: "You are about to delete this claim"
      }
    });

    // listen to response if yes or no 
    dialogRef.afterClosed().subscribe(dialogResult => {
         //if yes Delete Than repopulate the claim list 
      if (dialogResult) {
        this.toastr.info('Success', 'Claim deleted');
        this.dataService.deleteClaim(id).subscribe(() => {
          this.GetAllClaims();
        }, (response) => {
          //Show toastr if ther is an error with our request
          this.errorService.ErrorToster(response);
        });
      }
    });  
  }// end on Delete

  onSubmit() {
    // Call Api and fetch filtered claim list
    this.dataService.getFilteredClaims(this.SearchForm.value).subscribe((filterdClaims:any) => {
      this.dataSource.data = filterdClaims.filterdClaims;
    })
  };

}

