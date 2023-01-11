import { AngularFirestore, AngularFirestoreCollection, DocumentReference, QuerySnapshot } from '@angular/fire/compat/firestore'
import { map, switchMap } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import  IClip  from '../models/clip.model'
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClipService {

  public clipsCollection: AngularFirestoreCollection<IClip>

  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth
  ) { 
    this.clipsCollection = db.collection('clips')
  }


  // Insert a document into the clips collection
  createClip(data: IClip):Promise<DocumentReference<IClip>>{
    return this.clipsCollection.add(data)
  }

  getUserClips() {
    return this.auth.user.pipe(
      switchMap(user => {
        // push an empty observable if there is no user, switchmap expects an observable back
        if (!user){
          return of([])
        }

        // Check if the uid matches the currently logged in user
        const query = this.clipsCollection.ref.where(
          'uid', '==', user.uid
        )

        return query.get()
      }),
      map(snapshot => (snapshot as QuerySnapshot<IClip>).docs)
    )
  }

}
