import { Directive } from '@angular/core';

@Directive({
  selector: '[playIsInvalidForm]',
  standalone: true
})
export class IsInvalidFormDirective {

  constructor() { }

}
