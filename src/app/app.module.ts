import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NavComponent } from './nav/nav.component';
import { NgModule } from '@angular/core';
import { UserModule } from './user/user.module';
import {AngularFireModule} from '@angular/fire/compat'
import { environment } from 'src/environments/environment'
import { AngularFireAuthModule } from "@angular/fire/compat/auth"
import { AngularFirestoreModule} from "@angular/fire/compat/firestore";
import { HomeComponent } from './home/home.component'

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }