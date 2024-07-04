import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static dateEndAfterDateBeginning(dateBeginningControlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.parent) {
        return null;
      }

      const dateBeginning = control.parent.get(dateBeginningControlName)?.value;
      const date_end = control.value;

      if (dateBeginning && date_end && new Date(date_end) <= new Date(dateBeginning)) {
        return { dateEndBeforeDateBeginning: true };
      }

      return null;
    };
  }
}
