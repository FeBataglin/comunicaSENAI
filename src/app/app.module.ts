import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { IonicModule } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ThfModule } from '@totvs/thf-ui';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { UserService } from '../app/providers/user/user.service';
import { NewsService } from './providers/news/news.service';

import { Camera } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { SafePipe } from './pipe/youtube.pipe';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    CommonModule,
    ThfModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBRPIf82ebIzcPdH0VGy8qdxKlgtN2h46U",
      authDomain: "comunicasenai-93a8e.firebaseapp.com",
      databaseURL: "https://comunicasenai-93a8e.firebaseio.com",
      projectId: "comunicasenai-93a8e",
      storageBucket: "comunicasenai-93a8e.appspot.com",
      messagingSenderId: "960900674537",
      appId: "1:960900674537:web:c1c9c7027e169b96"
    }),
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
  ],
  providers: [
    StatusBar,
    ImagePicker,
    WebView,
    SplashScreen,
    Camera,
    { provide: ErrorHandler, useClass: ErrorHandler },
    UserService,
    NewsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }