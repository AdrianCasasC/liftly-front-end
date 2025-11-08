import { AbstractControl, ValidationErrors } from '@angular/forms';

export function minLengthArray(min: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control instanceof Array || !('controls' in control)) {
      return null;
    }

    const array = control as any;
    return array.length >= min ? null : { minLengthArray: { requiredLength: min, actualLength: array.length } };
  };
}
