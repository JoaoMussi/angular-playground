import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[highlightColor]',
  standalone: true,
})
export class HighlightColorDirective {
  @Input() highlightColor: string = 'green';

  @HostListener('mouseenter') onMouseEnter(): void {
    this.highlight(this.highlightColor);
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.highlight('');
  }

  constructor(private el: ElementRef) {}

  highlight(color: string): void {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
