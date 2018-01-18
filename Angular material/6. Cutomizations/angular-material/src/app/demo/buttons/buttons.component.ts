import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buttons',
  template: `
    <button mat-raised-button color="primary">
    <mat-icon>home</mat-icon>
  Click me!
  </button>
  <mat-checkbox>Check me!</mat-checkbox>
  `,
  styles: []
})
export class ButtonsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
