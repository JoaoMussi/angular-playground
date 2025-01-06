import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[playHighlightColor]',
  standalone: true,
})
export class HighlightColorDirective {
  @Input() playHighlightColor = 'green';

  @HostListener('mouseenter') onMouseEnter(): void {
    this.highlight(this.playHighlightColor);
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.highlight('');
  }

  constructor(private el: ElementRef) {}

  highlight(color: string): void {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
