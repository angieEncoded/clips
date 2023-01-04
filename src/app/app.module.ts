import { AboutComponent } from './about/about.component'
import { AngularFireAuthModule } from "@angular/fire/compat/auth"
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { ClipComponent } from './clip/clip.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserModule } from './user/user.module';
import { VideoModule } from './video/video.module';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    AboutComponent,
    ClipComponent,
    NotFoundComponent,

  ],
  imports: [
    BrowserModule,
    UserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    VideoModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }