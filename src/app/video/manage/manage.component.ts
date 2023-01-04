import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

// import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent {

  videoOrder = '1'

  constructor(private router: Router, private route: ActivatedRoute){

  }

  ngOnInit() : void {
    this.route.queryParamMap.subscribe((params: Params) => {
      this.videoOrder = params['get']('sort') === '2' ? params['get']('sort') : '1'
    })
  }

  sort(event: Event) {

    const { value } = (event.target as HTMLSelectElement)
    // this.router.navigateByUrl(`/manage?sort=${value}`)
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        sort: value
      }
    })
  
  }

}
