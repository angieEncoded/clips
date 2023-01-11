import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ClipService } from 'src/app/services/clip.service';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app'
import {last} from 'rxjs/operators'
import { switchMap } from 'rxjs/operators';
import {v4 as uuid} from 'uuid'

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})



export class UploadComponent implements OnDestroy{

  isDragOver = false;
  file: File | null = null;
  nextStep = false;
  showAlert = false;
  alertColor = 'blue';
  alertMessage = "Please wait, your clip is being uploaded.";
  inSubmission = false;
  percentage = 0;
  showPercentage = false;
  user: firebase.User | null = null;
  task?: AngularFireUploadTask

  title = new FormControl('', {
    validators: [
      Validators.required, 
      Validators.minLength(3)
    ],
    nonNullable: true
  })

  uploadForm = new FormGroup({
    title: this.title
  })

  constructor(
    private storage: AngularFireStorage, 
    private auth: AngularFireAuth,
    private clipService: ClipService,
    private router: Router
  ){
    // grab the user
    auth.user.subscribe(user => this.user = user)
  }




  ngOnDestroy(): void {
    // Cancel the task if the user navigates away from the page
    this.task?.cancel()
  }



  storeFile($event: Event) {
    // console.log($event)
    this.isDragOver = false
                // Assert the type so the compiler doesn't have to
                // Also make it optional because typescript cannot ensure it won't be null

                // Determine if it's coming from the drag event or it's coming from the file upload button
    this.file = ($event as DragEvent).dataTransfer ? ($event as DragEvent).dataTransfer?.files.item(0) ?? null : 
                ($event.target as HTMLInputElement).files?.item(0) ?? null
 
    // console.log(this.file)

    if(!this.file || this.file.type !== 'video/mp4'){
      // console.error("wrong kind of file")
      return
    }
    this.title.setValue(
      // Replace the filename extension with an empty string
      this.file.name.replace(/\.[^/.]+$/, '')
    )
    this.nextStep = true
  }


  uploadFile() {

    // This will shut down the form as we upload.
    // Available on all groups and controls
    this.uploadForm.disable()
    
    this.showAlert = true;
    this.alertColor = "blue"
    this.alertMessage = "Please wait, your clip is being uploaded."
    this.inSubmission = true
    this.showPercentage = true;


    const clipFileName = uuid()
    // const clipPath = `clips/${this.file?.name}` // Using the file name is not recommended
    const clipPath = `clips/${clipFileName}.mp4`


    this.task = this.storage.upload(clipPath, this.file)
    const clipRef = this.storage.ref(clipPath) // create a reference to this file

    this.task .percentageChanges().subscribe(progress => {
      this.percentage = progress as number / 100
    })

    // This will give us the bytes transferred, an alternate way to look at the progess
    // task.snapshotChanges().subscribe(console.log)

    // Ignore all except the last value from the observable
    this.task.snapshotChanges().pipe(
      last(),
      switchMap(() => clipRef.getDownloadURL())
    ).subscribe({
      next: async (url) => {
        const clip = {
          uid: this.user?.uid as string,
          displayName: this.user?.displayName as string,
          title: this.title.value,
          fileName: `${clipFileName}.mp4`,
          url: url,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }
        // console.log(clip)
        const clipDocumentReference = await this.clipService.createClip(clip)

        console.log(clip)


        this.alertColor = "green"
        this.alertMessage = "Success! Your clip is now ready to share with the world!"
        this.showPercentage = false;

        // redirect the user to the clip that was uploaded
        setTimeout(() => {
          this.router.navigate([
            'clip', clipDocumentReference.id
          ])
        }, 1000);

      },

      error: (error) => {
        
        this.uploadForm.enable()

        this.alertColor = "red"
        this.alertMessage = "Upload Failed! Please try again later."
        this.inSubmission = true
        this.showPercentage = false
        console.error(error)
      }
    })


    

    
  }

}
