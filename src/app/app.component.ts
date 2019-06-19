import { FCM } from '@ionic-native/fcm';
import { AuthProvider } from './../providers/auth/auth';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Events, AlertController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

import firebase from 'firebase';
import { AuthPage } from '../pages/auth/auth';

import { Storage } from '@ionic/storage';
import { Push } from '@ionic-native/push';
import { AppUpdate } from '@ionic-native/app-update';
import { NetworkProvider } from '../providers/network/network';
import { NotificationsProvider } from '../providers/notifications/notifications';


@Component({
  selector: 'page-menu',
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  // rootPage: any = AuthPage;
  loader: any;
  public pages: Array<{ title: string, component: any, icon: string }>;
  public pages1: Array<{ title: string, component: any, icon: string }>;
  @ViewChild(Nav) nav: Nav;

  public userProfile;
  initials;
  userToken;
  offline: boolean = false;
  public loading: any;
  data;
  
  dp:string = "assets/img/avatar-placeholder.png";
  firstname;
  lastname;
  // activitiesQuery = gql`
  // query activities {
  //   activities {
  //     Day

  //   }
  // }`;

  // sponsors: Observable<this.ysponsorsQuery>;





  constructor(public auth: AuthProvider,
    public platform: Platform,
    public statusBar: StatusBar,
    splashScreen: SplashScreen,
    public storage: Storage,
    public push: Push,
    public events: Events,
    public fcm: FCM,
    public alertCtrl: AlertController,
    private appUpdate: AppUpdate,
    public network: NetworkProvider,
    public loadingCtrl: LoadingController,
    public notifications: NotificationsProvider
     ) {






      if(network.isConnected()){
        this.offline = true;
      }



      


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need

      statusBar.styleDefault();
      setTimeout(() => {
        splashScreen.hide();
      }, 300);



      });

      this.appUpdate.checkAppUpdate('http://cdarh.org/abc.xml').then(() => {
        console.log('Update available');
        // this.fcm.subscribeToTopic('update');
      }).catch((error) => {

        console.log("Update Check failure: " + error);

      });


      firebase.auth().onAuthStateChanged(user => {
        if (user) {

          this.fcm.getToken().then(token => {
            // Your best bet is to here store the token on the user's profile on the
            // Firebase database, so that when you want to send notifications to this
            // specific user you can do it from Cloud Functions.

            var ref = firebase.database().ref().child("users");
              ref.child(user.uid).update({fcmtoken:token}).then(function (ref) {//use 'child' and 'set' combination to save data in your own generated key
                  console.log("Token Refreshed ");

                }, function (error) {
                  console.log(error);
                });


          });

          // this.fcm.onNotification().subscribe( data => {


          //   console.log("In notification");
            

          //   notifications.saveNotificationToFirebase(user.uid,data);


          //   if (data.wasTapped) {
          //     //Notification was received on device tray and tapped by the user.
          //     console.log(JSON.stringify(data));
      
      
          //     let alert = this.alertCtrl.create({
          //       title: data.title,
          //       message: data.body,
          //       buttons: [
          //         {
          //           text: 'Open in Notifications',
          //           role: 'cancel'
          //         }
          //       ]
          //     });
      
          //     alert.present();
      
      
      
          //     this.nav.setRoot(NotificationsPage);
          //   } else {
          //     //Notification was received in foreground. Maybe the user needs to be notified.
          //     console.log(JSON.stringify(data));
      
          //     let alert = this.alertCtrl.create({
          //       title: data.title,
          //       message: data.body,
          //       buttons: [
          //         {
          //           text: 'Done',
          //           role: 'cancel'
          //         }
          //       ]
          //     });
      
          //     alert.present();
      
      
          //     // this.nav.push('NotificationsPage', { profileId: data.profileId });
          //   }
          // });

          console.log(user);

          this.userProfile = auth.user;

          auth.getFirstName().then(data=>{
            this.firstname = data;
            console.log(this.firstname);
          });
          auth.getLastName().then(data=>{
            this.lastname = data;
            console.log(this.lastname);
          });
          auth.dp().then(data=>{
            this.dp = data;
            console.log(this.dp);
          });


          this.rootPage = TabsPage;

          // this.fcm.getToken().then(token => {
          //   var ref = firebase.database().ref().child("users");
          //   ref.child(user.uid).update({ fcmtoken: token }).then(function (ref) {//use 'child' and 'set' combination to save data in your own generated key
          //     console.log("Token Refreshed ");

          //   }, function (error) {
          //     console.log(error);
          //   });


          // });


        } else {



      // this.storage.get('introShown').then((result) => {
      //   if (!result) {
      //     this.storage.set('introShown', true);
      //     this.rootPage = StarterPage;
      //   }else{
      //     this.rootPage = AuthPage;
      //   }
      // });
      this.rootPage = AuthPage;

          console.log("There's no user here");
        }
      });



















      

      this.pages1 = [
        { title: 'Pro', component: 'ProfilerPage', icon: "ios-contacts" },


      ]
      this.pages = [
        { title: 'About', component: 'AboutPage', icon: "ios-information-circle-outline" },
        // { title: 'Agenda', component: 'HomePage', icon: "custom-event" },
        { title: 'Speakers', component: 'SpeakersPage', icon: "ios-contacts" },
        { title: 'Delegates', component: 'DelegatesPage', icon: "ios-people" },



        { title: 'Sponsors', component: 'SponsorsPage', icon: "ios-ribbon" },
        { title: 'Business Cards', component: 'BusinessCardsPage', icon: "ios-apps" },
        // { title: 'Send Feedback', component: 'FeedbackPage', icon: "ios-paper-plane" },
        { title: 'Feed', component: 'SocialPage', icon: "logo-twitter" },
        // { title: 'Notifications', component: 'NotificationsPage', icon: "custom-notification" },
        // { title: 'Settings', component: 'SettingsPage', icon: "ios-options" },




      ]



    












  }





  public openPage(a) {
     this.nav.push(a.component.toString());
  }

  public logout(){

    let alert = this.alertCtrl.create({
      title: 'Confirm Logout',
      message: 'Do you really want to log out?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            if(this.auth.user.providerData[0].providerId == "google.com"){
              this.auth.logoutGoogle();

            }else if(this.auth.user.providerData[0].providerId == "facebook.com"){
              this.auth.logoutFacebook();

            }else{
              firebase.auth().signOut();

            }



          }
        }
      ]
    });




    alert.present();

  }

}
