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



@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SpeakersPage;
  tab3Root = SocialPage;
  tab4Root = NotificationsPage;


  n: number = 0;

  constructor(public fcm: FCM,
    public notifications: NotificationsProvider,
    public auth: AuthProvider,
    public alertCtrl: AlertController,
    public navCtrl: NavController,) {



        

        // this.fcm.onNotification().subscribe( data => {


    //       if (!data.wasTapped) {
    //       this.n++;
    // console.log("In tab notification le success")
          
    
    
    
    //       } 
    //     });


        this.fcm.onNotification().subscribe( data => {


          console.log("In notification");
          this.n++;
          

          notifications.saveNotificationToFirebase(this.auth.user.uid,data);


          if (data.wasTapped) {
            //Notification was received on device tray and tapped by the user.
            console.log(JSON.stringify(data));
    
    
            // let alert = this.alertCtrl.create({
            //   title: data.title,
            //   message: data.body,
            //   buttons: [
            //     {
            //       text: 'Open in Notifications',
            //       role: 'cancel'
            //     }
            //   ]
            // });
    
            // alert.present();
    
    
    
            // this.nav.setRoot(NotificationsPage);

            // if(data.type=="BCard"){
            //   // this.navCtrl.setRoot(BusinessCardsPage);

              this.navCtrl.push("NotificationsPage");

            // }else{
            //   this.navCtrl.setRoot(NotificationsPage);
            // }
            
          } else {
            //Notification was received in foreground. Maybe the user needs to be notified.
            console.log(JSON.stringify(data));
    
            let alert = this.alertCtrl.create({
              title: data.title,
              message: data.body,
              buttons: [
                {
                  text: 'Done',
                  role: 'cancel'
                }
              ]
            });
    
            alert.present();
    
    
            // this.nav.push('NotificationsPage', { profileId: data.profileId });
          }
        });

       
      }
  
  
}
