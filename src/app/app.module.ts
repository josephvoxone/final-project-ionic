import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// New Import
import { HttpClientModule } from '@angular/common/http';
import { Md5 } from 'ts-md5';
import { PrasmananCartPageModule } from './prasmanan-cart/prasmanan-cart.module';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { Market } from '@ionic-native/market/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { MealboxCartPageModule } from './mealbox-cart/mealbox-cart.module';
import { CbreakCartPageModule } from './cbreak-cart/cbreak-cart.module';
import { Camera } from '@ionic-native/camera/ngx';
import { OrderOpsiPageModule } from './order-opsi/order-opsi.module';

// Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCji_-a3y--Cz7NLAjrChisCM_fa877Ows",
  authDomain: "katering-2d5e9.firebaseapp.com",
  databaseURL: "https://katering-2d5e9.firebaseio.com",
  projectId: "katering-2d5e9",
  storageBucket: "katering-2d5e9.appspot.com",
  messagingSenderId: "145696059093",
};

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { Firebase } from '@ionic-native/firebase/ngx';
import { AngularFireAuthModule } from '@angular/fire/auth';
// End Firebase

import { IonicRatingModule } from 'ionic4-rating';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, PrasmananCartPageModule, MealboxCartPageModule, CbreakCartPageModule, OrderOpsiPageModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, AngularFireAuthModule, IonicRatingModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Clipboard, PhotoViewer, Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: FirestoreSettingsToken, useValue: {} },
    HttpClientModule, Md5, Market, CallNumber,
    Firebase
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
