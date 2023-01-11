import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ClipService } from 'src/app/services/clip.service';
import  IClip  from '../../models/clip.model'
import { ModalService } from 'src/app/services/modal.service';

// import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent {

  videoOrder = '1'
  clips: IClip[] = []

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private clipService: ClipService,
    private modal: ModalService
    ){

  }

  ngOnInit() : void {
    this.route.queryParamMap.subscribe((params: Params) => {
      this.videoOrder = params['get']('sort') === '2' ? params['get']('sort') : '1'
    })
    this.clipService.getUserClips().subscribe(docs => {
      this.clips = []
      docs.forEach(doc => {
        this.clips.push({
          docId: doc.id,
          ...doc.data()
        })
      })
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


  openModal($event: Event, clip: IClip){
    $event.preventDefault()
    this.modal.toggleModal('editClip')
  }


}
