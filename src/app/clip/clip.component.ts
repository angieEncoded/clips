import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.css']
})
export class ClipComponent {

  id = ''

  constructor(public route: ActivatedRoute) {

  }

  ngOnInit():void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
    })
  }

}
