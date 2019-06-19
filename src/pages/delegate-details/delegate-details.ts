import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NotificationsProvider } from '../../providers/notifications/notifications';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the DelegateDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-delegate-details',
  templateUrl: 'delegate-details.html',
})
export class DelegateDetailsPage {

  xx;
  receiverToken;
  requestPending;
  requestApproved;

  firstname;
  lastname;

  constructor(public navCtrl: NavController, 
              public notifications: NotificationsProvider,
              public auth: AuthProvider,
              public alertCtrl: AlertController,
              public navParams: NavParams) {
        this.xx = navParams.get('delegate');

        auth.getFirstName().then(data=>{
          this.firstname = data;
        });
    
      
    
        auth.getLastName().then(data=>{
          this.lastname = data;
        });

        auth.getPendingCards().then(data=>{

          console.log(data);


          if( data && this.xx in data ) {
            // do something
            this.requestPending = "pending";
          }
          
    
        });


        auth.getApprovedCards().then(data=>{

          console.log(data);


          if( data && this.xx in data ) {
            // do something
            this.requestApproved = "approved";
          }
          
    
        });
       
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DelegateDetailsPage');
  }


  requestCard(requestedUser){
    console.log(requestedUser);
if(this.requestPending == "pending"){
 let alert = this.alertCtrl.create({
              title: "Done Here",
              message: "Business card request already sent",
              buttons: [
                {
                  text: 'Okay',
                  role: 'cancel'
                }
              ]
            });
    
            alert.present();
}else if(this.requestApproved == "approved"){
  let alert = this.alertCtrl.create({
    title: "Done Here",
    message: "You already have this business card",
    buttons: [
      {
        text: 'Okay',
        role: 'cancel'
      }
    ]
  });

  alert.present();
}
else{
  this.notifications.requestCard(this.auth.user, this.firstname + " " + this.lastname,requestedUser.id,requestedUser.fcmtoken,requestedUser.imgurl) 

}
  }

  getReceiverToken(id){
    this.auth.getReceiverToken(id).then(data=>{
      return data;
    });

  }


}
