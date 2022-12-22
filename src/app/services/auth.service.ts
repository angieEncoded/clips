import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore"

import { AngularFireAuth } from '@angular/fire/compat/auth'
import IUser from '../models/user.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersCollection: AngularFirestoreCollection<IUser>

  constructor(private auth: AngularFireAuth, private db: AngularFirestore) { 
    this.usersCollection = db.collection('users')
  }

  // We created a model and used it to describe the contents of userData so we can 'type' it for typescript
  public async createUser(userData: IUser) {
    const userCredential = await this.auth.createUserWithEmailAndPassword(
      userData.email as string, userData.password as string
    )

    // Add this guard statement in case the userCredential is null otherwise the insertion command below will throw an error
    if(!userCredential.user){
      throw new Error("User can't be found.")
    }


    await this.usersCollection.doc(userCredential.user.uid).set({
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phoneNumber: userData.phoneNumber
    }) 
    
    await userCredential.user.updateProfile({
      displayName: userData.name
    })

    
  
  }



}
