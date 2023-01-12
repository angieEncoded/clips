import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ClipService } from 'src/app/services/clip.service';
import IClip from 'src/app/models/clip.model';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})



export class EditComponent implements OnInit, OnDestroy, OnChanges {

  @Input() activeClip: IClip | null = null

  inSubmission = false;
  showAlert = false;
  alertColor = 'blue'
  alertMessage = 'Please wait, updating clip!'
  @Output() update = new EventEmitter()

  clipId = new FormControl('', {
      nonNullable: true
    })

  title = new FormControl('', {
    validators: [
      Validators.required, 
      Validators.minLength(3)
    ],
    nonNullable: true
  })

  editForm = new FormGroup({
    title: this.title,
    id: this.clipId
  })




  constructor(
    private modal: ModalService,
    private clipservice: ClipService
    ) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!this.activeClip){
      return
    }
    this.inSubmission = false
    this.showAlert = false

    this.clipId.setValue(this.activeClip.docId as string)
    this.title.setValue(this.activeClip.title)



  }


  ngOnInit(): void {
    this.modal.register('editClip')
  }

  ngOnDestroy():void {
    this.modal.unregister('editClip')
  }

  async submit(){
    // Make sure it's not empty
    if(!this.activeClip){
      return
    }

    // update the properties for alert
    this.inSubmission = true;
    this.showAlert = true;
    this.alertColor = 'blue'
    this.alertMessage = 'Please wait, updating clip!'

    try {
      // send the data to firebase - run this method from the clip.service.ts
      await this.clipservice.updateClip(this.clipId.value, this.title.value)
    } catch (error) {
      this.inSubmission = false;
      this.alertColor = 'red'
      this.alertMessage = 'Something happened, please try again later.'
      return;
    }

    this.activeClip.title = this.title.value
    this.update.emit(this.activeClip)
    this.inSubmission = false;
    this.alertColor = 'green'
    this.alertMessage = 'Success!'



  }



}
