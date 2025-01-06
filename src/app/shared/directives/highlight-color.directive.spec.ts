import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HighlightColorDirective } from './highlight-color.directive';

@Component({
  template: `<div highlightColor="green"></div>`,
})
class HostComponent {}

describe('HighlightColorDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let directive: HighlightColorDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    directive = new HighlightColorDirective(fixture.elementRef);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should highlight the element', () => {
    directive.onMouseEnter();
    expect(fixture.elementRef.nativeElement.style.backgroundColor).toBe(
      directive.playHighlightColor
    );
  });

  it('should remove element highlight', () => {
    directive.onMouseLeave();
    expect(fixture.elementRef.nativeElement.style.backgroundColor).toBe('');
  });
});
