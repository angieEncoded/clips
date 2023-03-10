import { ActivatedRoute, NavigationEnd } from "@angular/router";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore"
import { Observable, of } from "rxjs";
import { delay, filter, map, switchMap } from 'rxjs/operators'

import { AngularFireAuth } from '@angular/fire/compat/auth'
import IUser from '../models/user.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  private usersCollection: AngularFirestoreCollection<IUser>
  public isAuthenticated$: Observable<boolean> // The $ is a convention to denote that this holds the value from an observable
  public isAuthenticatedWithDelay$: Observable<boolean>
  private redirect = false


  constructor(
    private auth: AngularFireAuth, 
    private db: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute
    
    ) { 
    this.usersCollection = db.collection('users')

    // auth.user.subscribe(console.log) // Watch the observable for user auth

    this.isAuthenticated$ = auth.user.pipe(
      map(user => !!user) // typecast the user into a boolean value so we can use it in the templates
    )

    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(delay(1000))
  
    // Listen for only the NavigationEnd
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(e => this.route.firstChild),
      switchMap(route => route?.data ?? of({}))
    ).subscribe(data => {
      this.redirect = data['authOnly'] ?? false
    })


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

  public async logout($event?: Event){
    if ($event){
      $event.preventDefault()
    }

    await this.auth.signOut() // Firebase will handle this automatically
    if(this.redirect){
      await this.router.navigateByUrl('/') // redirect the user when the logout is pressed
    }

  }



}
