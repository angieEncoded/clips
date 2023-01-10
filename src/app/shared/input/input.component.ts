import { Component, Input } from '@angular/core';

import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {

  @Input() control: FormControl = new FormControl;
  @Input() type = 'text' // default value if the parent component doesn't supply one
  @Input() placeholder = ''
  @Input() format = '' // Defaulting it to an empty string makes it optional for the ngx-mask module




}

