import { AngularFirestore, AngularFirestoreCollection, DocumentReference, QuerySnapshot } from '@angular/fire/compat/firestore'
import {BehaviorSubject, combineLatest, of} from 'rxjs'
import { map, switchMap } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage'
import  IClip  from '../models/clip.model'
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClipService {

  public clipsCollection: AngularFirestoreCollection<IClip>

  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth,
    private storage: AngularFireStorage
  ) { 
    this.clipsCollection = db.collection('clips')
  }


  // Insert a document into the clips collection
  createClip(data: IClip):Promise<DocumentReference<IClip>>{
    return this.clipsCollection.add(data)
  }

  getUserClips(sort$: BehaviorSubject<string>) {
    // combineLatest will allow us to watch both subscriptions
    return combineLatest([this.auth.user, sort$]).pipe(
      switchMap(values => {

        const [user, sort] = values


        // push an empty observable if there is no user, switchmap expects an observable back
        if (!user){
          return of([])
        }

        // Check if the uid matches the currently logged in user
        const query = this.clipsCollection.ref.where(
          'uid', '==', user.uid
        ).orderBy(
          'timestamp',
          sort === '1' ? 'desc' : 'asc'
        )

        return query.get()
      }),
      map(snapshot => (snapshot as QuerySnapshot<IClip>).docs)
    )
  }

  
  updateClip(id: string, title: string){
    return this.clipsCollection.doc(id).update({
      title
    })
  }

  
  async deleteClip(clip: IClip){

    try {
      
      const clipRef = this.storage.ref(`clips/${clip.fileName}`)

      await clipRef.delete()

      await this.clipsCollection.doc(clip.docId).delete()


    } catch (error) {
      
    }


  }
}
