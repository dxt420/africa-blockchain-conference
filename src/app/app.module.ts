import { SignupPageModule } from './../pages/signup/signup.module';
import { SignupPage } from './../pages/signup/signup';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from "@angular/common/http";
import { CacheModule } from 'ionic-cache-observable';
import { AuthPage } from '../pages/auth/auth';
import { IonicStorageModule } from '@ionic/storage';
import { StarterPage } from '../pages/starter/starter';
import { SocialPage } from '../pages/social/social';
import { NotificationsPage } from '../pages/notifications/notifications';
// import { DelegatesPage } from '../pages/delegates/delegates';


import {AppUpdate} from "@ionic-native/app-update";

import { Push } from '@ionic-native/push';
import { GooglePlus } from '@ionic-native/google-plus';
import { AuthProvider } from '../providers/auth/auth';


import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';

import { FCM } from '@ionic-native/fcm';
import { NetworkProvider } from '../providers/network/network';
import { Network } from '@ionic-native/network';

// import { IonTextAvatar } from 'ionic-text-avatar';

import { ApolloModule,Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';

import { InMemoryCache } from 'apollo-cache-inmemory';
import { DataProvider } from '../providers/data/data';

import { Crop } from '@ionic-native/crop';
import { ImagePicker } from '@ionic-native/image-picker';
import { SpeakersPage } from '../pages/speakers/speakers';
import { SpeakersPageModule } from '../pages/speakers/speakers.module';
import { NotificationsPageModule } from '../pages/notifications/notifications.module';
import { SocialPageModule } from '../pages/social/social.module';
import { AuthPageModule } from '../pages/auth/auth.module';
import { StarterPageModule } from '../pages/starter/starter.module';
// import { AuthPageModule } from '../pages/auth/auth.module';
// import { HomePageModule } from '../pages/home/home.module';





firebase.initializeApp({
  apiKey: "AIzaSyBt3djOIaAUZE4_BXNvCabeYKccywp5dk8",
  authDomain: "africa-blockchain.firebaseapp.com",
  databaseURL: "https://africa-blockchain.firebaseio.com",
  projectId: "africa-blockchain",
  storageBucket: "africa-blockchain.appspot.com",
  messagingSenderId: "228396331551",
  appId: "1:228396331551:web:3aace5c4b1c1a985"
});

@NgModule({
  declarations: [
    MyApp,

    ContactPage,
    HomePage,
    TabsPage,
    // AuthPage,
    // StarterPage,
    // SocialPage,
    // NotificationsPage,

    // SignupPage,
    // SpeakersPage




  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    CacheModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    ApolloModule,
    HttpLinkModule,
    SpeakersPageModule,
    NotificationsPageModule,
    SocialPageModule,
    AuthPageModule,
    SignupPageModule,
    StarterPageModule





  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

    ContactPage,
    HomePage,
    TabsPage,
    AuthPage,
    StarterPage,
    SocialPage,
    NotificationsPage,
    // DelegatesPage,
    SignupPage,
    SpeakersPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    Push,GooglePlus,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    Facebook,
    FCM,
    AppUpdate,
    NetworkProvider,
    Network,
    DataProvider,
    Crop,
    ImagePicker
  ]
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({uri: 'https://africanblockchain.org/graphql'}),
      cache: new InMemoryCache()
    });
  }
}

