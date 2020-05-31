import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { dataService } from '../../Services/dataService';

//changeDetection: ChangeDetectionStrategy.OnPush

@Component({
  selector: 'app-beneficiary-form',
  templateUrl: './beneficiary-form.component.html',
  styleUrls: ['./beneficiary-form.component.css']
})
export class BeneficiaryFormComponent implements OnInit {

  @Input() beneficiaryForm: FormGroup
  @Input() index: number
  @Output() deleteBeneficiary: EventEmitter<number> = new EventEmitter()
  Genders: any;
  Relationships: any;
  SelectedRelationshipId: number;
  SelectedGenderId: number;
   

  constructor(private dataService: dataService) { }



  ngOnInit(): void {

    this.SelectedRelationshipId = this.beneficiaryForm.value.relationshipId;
    this.SelectedGenderId = this.beneficiaryForm.value.genderId;

    this.Genders = this.dataService.getGenders();
    this.Relationships = this.dataService.getRelationships();

  
  }

  delete() {
    this.deleteBeneficiary.emit(this.index)
  }

}
