"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var toolbar_1 = require("@angular/material/toolbar");
var icon_1 = require("@angular/material/icon");
var sidenav_1 = require("@angular/material/sidenav");
var list_1 = require("@angular/material/list");
var input_1 = require("@angular/material/input");
var button_1 = require("@angular/material/button");
var card_1 = require("@angular/material/card");
var form_field_1 = require("@angular/material/form-field");
var checkbox_1 = require("@angular/material/checkbox");
var datepicker_1 = require("@angular/material/datepicker");
var radio_1 = require("@angular/material/radio");
var select_1 = require("@angular/material/select");
var core_2 = require("@angular/material/core");
var dialog_1 = require("@angular/material/dialog");
var table_1 = require("@angular/material/table");
var paginator_1 = require("@angular/material/paginator");
var MaterialModule = /** @class */ (function () {
    function MaterialModule() {
    }
    MaterialModule = __decorate([
        core_1.NgModule({
            imports: [
                paginator_1.MatPaginatorModule,
                table_1.MatTableModule,
                dialog_1.MatDialogModule,
                core_2.MatNativeDateModule,
                select_1.MatSelectModule,
                radio_1.MatRadioModule,
                checkbox_1.MatCheckboxModule,
                card_1.MatCardModule,
                form_field_1.MatFormFieldModule,
                datepicker_1.MatDatepickerModule,
                toolbar_1.MatToolbarModule,
                icon_1.MatIconModule,
                sidenav_1.MatSidenavModule,
                list_1.MatListModule,
                button_1.MatButtonModule,
                input_1.MatInputModule
            ],
            exports: [
                paginator_1.MatPaginatorModule,
                table_1.MatTableModule,
                dialog_1.MatDialogModule,
                core_2.MatNativeDateModule,
                select_1.MatSelectModule,
                radio_1.MatRadioModule,
                checkbox_1.MatCheckboxModule,
                card_1.MatCardModule,
                form_field_1.MatFormFieldModule,
                datepicker_1.MatDatepickerModule,
                toolbar_1.MatToolbarModule,
                icon_1.MatIconModule,
                sidenav_1.MatSidenavModule,
                list_1.MatListModule,
                button_1.MatButtonModule,
                input_1.MatInputModule
            ]
        })
    ], MaterialModule);
    return MaterialModule;
}());
exports.MaterialModule = MaterialModule;
//# sourceMappingURL=material.module.js.map