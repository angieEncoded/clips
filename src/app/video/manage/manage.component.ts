import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
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
  activeClip: IClip | null = null
  sort$: BehaviorSubject<string>

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private clipService: ClipService,
    private modal: ModalService
    ){
      // instantiate the class
      this.sort$ = new BehaviorSubject(this.videoOrder)
      // this.sort$.subscribe(console.log)
      // this.sort$.next('test') // we can push a value from the observer
  }

  ngOnInit() : void {
    this.route.queryParamMap.subscribe((params: Params) => {
      this.videoOrder = params['get']('sort') === '2' ? params['get']('sort') : '1'
      this.sort$.next(this.videoOrder)
    })
    
    this.clipService.getUserClips(this.sort$).subscribe(docs => {
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
    this.activeClip = clip
    this.modal.toggleModal('editClip')
  }
  update($event: IClip){
    this.clips.forEach((element, index) => {
      if(element.docId == $event.docId){
        this.clips[index].title = $event.title
      }
    })
  }

  deleteClip($event:Event, clip:IClip) {
    $event.preventDefault()

    this.clipService.deleteClip(clip)

    this.clips.forEach((element, index) => {
      if(element.docId == clip.docId){
        this.clips.splice(index, 1)
      }
    })


  }

}
