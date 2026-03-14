import { AbstractControl, ValidationErrors } from '@angular/forms';

export function futureDateValidator(
  control: AbstractControl,
): ValidationErrors | null {
  const selectedDate = new Date(control.value);
  const today = new Date();

  return selectedDate <= today ? { notFuture: true } : null;
}
