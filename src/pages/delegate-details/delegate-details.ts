import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NotificationsProvider } from '../../providers/notifications/notifications';
import { AuthProvider } from '../../providers/auth/auth';
import Swal from 'sweetalert2'

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

  meEmail;

  firstname;
  lastname;
  dp;

  constructor(public navCtrl: NavController, 
              public notifications: NotificationsProvider,
              public auth: AuthProvider,
              public alertCtrl: AlertController,
              public navParams: NavParams) {
        this.xx = navParams.get('delegate');

       

        console.log(this.xx);

        


        


        auth.getFirstName().then(data=>{
          this.firstname = data;
        });

        auth.dp().then(data=>{
          this.dp = data;
        });
    
      
    
        auth.getLastName().then(data=>{
          this.lastname = data;
        });

      
       
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DelegateDetailsPage');

    this.auth.getPendingCards().then(data=>{

      console.log(data);

      
      if( data != ' '){
      for (var key in data) {
        if( this.xx.key == data[key].userID ) {
          // do something

          this.requestPending = "pending";
        }
       
    }
  }

      

    });


    this.auth.getApprovedCards().then(data=>{



      console.log(data);

      
      if( data != ' '){
      for (var key in data) {
        if( this.xx.key == data[key].userID ) {
          // do something

          this.requestPending = "approved";
        }
       
    }
  }


   
      

    });
  }


  requestCard(requestedUser){
    console.log(requestedUser);
    console.log(this.requestPending);


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
        var time = new Date().toLocaleString() + ""
        console.log(time)
        this.notifications.requestCard(this.auth.user, this.firstname + " " + this.lastname,requestedUser.id,requestedUser.fcmtoken,this.dp,time) 
        Swal.fire({
          title: 'Request Sent',
          text: "Your business card request has been sent successfully.",
          type: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Done'
        }).then((result) => {
          if (result.value) {
            this.ionViewDidLoad();
    
          }
        })
      }



     

  }



}
