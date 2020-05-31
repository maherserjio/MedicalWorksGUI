import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  constructor(private toaster: ToastrService) { }

  // this to concatenate our error we get if we have multiple errors
  ErrorToster(Error: any) {
    const serverError = Error.error.errors;
    let Errors = '';
    if (serverError && typeof serverError === 'object') {
      for (const key in serverError) {
        if (serverError[key]) {
          Errors += serverError[key] + "\n";
        }
      }
      this.toaster.error(Errors, 'Error');
    }
    else {
      this.toaster.error(Error.error, 'Error');
    }
  }


}
