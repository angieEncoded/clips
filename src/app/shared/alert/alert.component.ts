import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {

  @Input() color = "blue"

  // treats this function as a 'getter' function
  get bgColor(){
    console.log(`bg-${this.color}-400`)
    return `bg-${this.color}-400`

  }


}
