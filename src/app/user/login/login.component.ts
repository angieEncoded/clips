import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  credentials = {
    email: "",
    password: ""
  }

  showAlert = false;
  alertMessage = "Please wait, we are logging you in!"
  alertColor = "blue"
  inSubmission = false;

  constructor(private auth: AngularFireAuth) {}


  ngOnInit(): void {
    
  }

  async login(){

    this.showAlert = true;
    this.alertMessage = "Please wait, we are logging you in!"
    this.alertColor = "blue"
    this.inSubmission = true;

    try {
      await this.auth.signInWithEmailAndPassword(
        this.credentials.email, this.credentials.password
      )

    } catch (error) {
      this.inSubmission = false
      this.alertMessage = "An unexpected error occurred, please try again later."
      this.alertColor = "red"
      console.error(error)
      return;
    }

        this.alertMessage = "Success, you are now logged in!"
    this.alertColor = "green"


  }





}
