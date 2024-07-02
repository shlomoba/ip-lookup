import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appInputMarker]',
})
export class InputMarkerDirective {
  @Input() appInputMarker: any;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    let inputElement: HTMLInputElement;

    if (this.el.nativeElement.tagName === 'INPUT') {
      inputElement = this.el.nativeElement;
    } else {
      inputElement = this.el.nativeElement.querySelector('input');
    }

    if (inputElement) {
      inputElement.focus();
    }
  }
}
