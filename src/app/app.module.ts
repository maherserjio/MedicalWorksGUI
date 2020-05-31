import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ToastrModule } from 'ngx-toastr';


import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ClaimComponent } from './claim/claim.component';
import { ClaimListComponent } from './claim/claim-list/claim-list.component';
import { ClaimFormComponent } from './claim/claim-form/claim-form.component';
import { PolicyComponent } from './policy/policy.component';
import { PolicyListComponent } from './policy/policy-list/policy-list.component';
import { PolicyFormComponent } from './policy/policy-form/policy-form.component';
import { BeneficiaryFormComponent } from './beneficiary/beneficiary-form/beneficiary-form.component';
import { ModalComponent } from './Shared/modal/modal.component';


import { HttpClientModule } from '@angular/common/http';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';






@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    ClaimComponent,
    ClaimListComponent,
    ClaimFormComponent,
    PolicyComponent,
    PolicyListComponent,
    PolicyFormComponent,
    BeneficiaryFormComponent,
    ModalComponent
  ],
  imports: [
    HttpClientModule ,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),// ToastrModule added
    FlexLayoutModule,
    MaterialModule
   
  ],
  providers: [{ provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule { }
