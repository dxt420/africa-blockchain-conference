import { NotificationsPage } from './../notifications/notifications';
import { Component } from '@angular/core';

// import { AboutPage } from '../about/about';
// import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
// import { DelegatesPage } from '../delegates/delegates';
import { SocialPage } from '../social/social';
import { SpeakersPage } from '../speakers/speakers';
import { FCM } from '@ionic-native/fcm';
import { NotificationsProvider } from '../../providers/notifications/notifications';
import { AuthProvider } from '../../providers/auth/auth';
import { AlertController, NavController } from 'ionic-angular';
// import * as myGlobals from '../../app/globals'; 


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SpeakersPage;
  tab3Root = SocialPage;
  tab4Root = NotificationsPage;


  // n: number = myGlobals.notificationsCount;

  constructor(public fcm: FCM,
    
    public auth: AuthProvider,
    public alertCtrl: AlertController,
    public navCtrl: NavController,) {


      


        // this.fcm.onNotification().subscribe( data => {


        //   console.log("In notification");
        //   this.n++;
       
        // });
       
      }
  
  
}
