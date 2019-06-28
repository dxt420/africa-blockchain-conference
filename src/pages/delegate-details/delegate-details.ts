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

    this.auth.getCards().then(data=>{

      console.log(data);

      
      if( data != ' '){
      for (var key in data) {
        console.log(data);
        console.log(data[key].userID);
        console.log(this.xx.id);
        if(this.xx.id == data[key].userID ) {

          if(data[key].exchanged=="false"){
            this.requestPending = "pending";
          }

          if(data[key].exchanged=="true"){
            this.requestPending = "approved";
          }


        }
        
      }
      }
    });
 
  }


  requestCard(requestedUser){
    console.log(requestedUser);
    console.log(this.requestPending);


      if(this.requestPending == "pending"){
   

                  Swal.fire({
                    title: 'Done Here',
                    text: "Business card request already sent",
                    type: 'info',
          
                    confirmButtonColor: '#3085d6',
          
                    confirmButtonText: 'Done'
                  }).then((result) => {
                    if (result.value) {
                      
              
                    }
                  })



      }else{
        var time = new Date().toLocaleString() + ""
        // var time = new Date()
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
