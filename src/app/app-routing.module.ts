import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClaimComponent } from './claim/claim.component';
import { ClaimListComponent } from './claim/claim-list/claim-list.component';
import { ClaimFormComponent } from './claim/claim-form/claim-form.component';
import { PolicyComponent } from './policy/policy.component';
import { PolicyListComponent } from './policy/policy-list/policy-list.component';
import { PolicyFormComponent } from './policy/policy-form/policy-form.component';




const routes: Routes = [
  {
    path: 'claim',
    component: ClaimComponent, // this is the component with the <router-outlet> in the template
    children: [
      {
        path: '', // child route path
        component: ClaimListComponent // child route component that the router renders
      },
      {
        path: 'new',
        component: ClaimFormComponent // another child route component that the router renders
      },
      {
        path: 'edit/:id',
        component: ClaimFormComponent
      }
    ]
  },
  {
    path: 'policy',
    component: PolicyComponent, // this is the component with the <router-outlet> in the template
    children: [
      {
        path: '', // child route path
        component: PolicyListComponent // child route component that the router renders
      },
      {
        path: 'new',
        component: PolicyFormComponent // another child route component that the router renders
      },
      {
        path: 'edit/:id',
        component: PolicyFormComponent
      }
    ]
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/policy/new"
  },

  // This is the WILDCARD CATCH-ALL route that is scoped to the entire application. It
  // will catch any request that is not matched by an earlier route definition.
  {
    path: "**",
    redirectTo: "/policy/new"
  }
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
