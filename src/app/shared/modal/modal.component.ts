import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  // providers: [ModalService]
})
export class ModalComponent implements OnInit, OnDestroy{

  @Input() modalID = ""

  constructor(public modal: ModalService,
              public element: ElementRef){
    // console.log(this.modal.visible)
    // console.log(element)
  } 

  closeModal($event: Event){
    $event.preventDefault()
    this.modal.toggleModal(this.modalID)
  }



    ngOnInit(): void {
      // move a 
      document.body.appendChild(this.element.nativeElement)
    }

    // Remove the modal from the dom
    ngOnDestroy(): void {
      document.body.removeChild(this.element.nativeElement)
    }
}
