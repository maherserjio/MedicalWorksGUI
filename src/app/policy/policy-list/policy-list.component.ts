import { Component, OnInit } from '@angular/core';
import { dataService } from '../../Services/dataService';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

export interface Policy {
  effective: Date
  expiry: Date
  id: string
  isValid: boolean
  police_No: string
  premium: number
}

@Component({
  selector: 'app-policy-list',
  templateUrl: './policy-list.component.html',
  styleUrls: ['./policy-list.component.css']
})
export class PolicyListComponent implements OnInit {
  policies: any = [];
  displayedColumns = ['id', 'police_No', 'effective', 'expiry', 'premium', 'isValid', 'update'];
  dataSource = new MatTableDataSource<Policy>();

  constructor(private dataService: dataService,
    private router: Router) { }

  ngOnInit(): void {
    this.GetAllPolicies();
  }

  GetAllPolicies() {
    this.dataService.getPolicies().subscribe((policies: any) => {
      this.policies = policies;
      this.dataSource.data = policies;
    })
  }

  onSubmitPolicy() {
    this.router.navigateByUrl("/policy/new");
  }

  redirectToUpdate = (id: string) => {
    this.router.navigateByUrl("/policy/edit/" + id);
  }

  

}
