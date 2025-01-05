import { AbstractControl } from '@angular/forms';

export function trimmedRequired() {
  return (control: AbstractControl) => {
    return control.value.trim() === '' ? { required: true } : null;
  };
}
