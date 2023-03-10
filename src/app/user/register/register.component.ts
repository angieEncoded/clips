import { FormControl, FormGroup, Validators } from '@angular/forms'

import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';
import { EmailTaken } from '../validators/email-taken';
import IUser from 'src/app/models/user.model';
import { RegisterValidators } from '../validators/register-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})



export class RegisterComponent {

  constructor(private auth: AuthService, private emailTaken: EmailTaken){}

  inSubmission = false

  name = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ])
  email= new FormControl('', [
    Validators.required,
    Validators.email
  ],[this.emailTaken.validate])
  age= new FormControl<number | null>(null, [
    Validators.required,
    Validators.min(18),
    Validators.max(120)
  ])
  password= new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)

  ])
  confirmPassword= new FormControl('', [
    Validators.required
  ])
  phoneNumber= new FormControl('', [
    Validators.required,
    Validators.minLength(13),
    Validators.maxLength(13)
  ])

  showAlert = false
  alertMessage = "Please wait, your account is being created."
  alertColor = "blue"


registerForm = new FormGroup({
  name: this.name,
  email: this.email,
  age: this.age,
  password: this.password,
  confirmPassword: this.confirmPassword,
  phoneNumber: this.phoneNumber
}, [RegisterValidators.match('password', 'confirmPassword')])



// Handle the form submission
async register(){

  this.inSubmission = true
  // console.log("hit the event")
  this.showAlert = true; // show the alert
  this.alertMessage = "Please wait, your account is being created."
  this.alertColor = "blue"



  try {
    // Forms are now typed
    await this.auth.createUser(this.registerForm.value as IUser)



  } catch (error) {
    // console.error(error)
    this.alertMessage = "An unexpected error occured. Please try again later."
    this.alertColor = "red"
    this.inSubmission = false
    return
  }


  this.alertMessage = "Success, your account has been created!"
  this.alertColor = "green"



}




}
