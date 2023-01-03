import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{

  // isAuthenticated = false


  constructor(
    public modal: ModalService, 
    public authentication: AuthService,
    private afAuth: AngularFireAuth
    ) {
      // this.authentication.isAuthenticated$.subscribe(status => {
      //   this.isAuthenticated = status
      }
    

  async logout($event: Event){
    $event.preventDefault()
    await this.afAuth.signOut() // Firebase will handle this automatically
  }



  openModal($event: Event){
    $event.preventDefault()
    this.modal.toggleModal("auth")
  }




  ngOnInit(): void {

  }


}
