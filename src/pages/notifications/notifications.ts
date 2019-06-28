import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';




import Swal from 'sweetalert2'
import { NotificationsProvider } from '../../providers/notifications/notifications';



/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})
export class NotificationsPage {

  public data: any[] = []; // DECLARE A NEW EMPTY ARRAY IN THE TOP OF YOUR CLASS


  imgurl:string = "assets/img/avatar-placeholder.png";
  firstname;
  lastname;

dp;

received: any[] = [];


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public notifications: NotificationsProvider,
              public auth: AuthProvider) {


                auth.getFirstName().then(data=>{
                  this.firstname = data;
                });
            
              
            
                auth.getLastName().then(data=>{
                  this.lastname = data;
                });

                auth.dp().then(data=>{
                  this.dp = data;
                });
               

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');

    // myGlobals.notificationsCount = 0;
  }

  ionViewDidEnter(){
    this.data = [];
    this.auth.getNotifications().then(data=>{

      console.log(data);
      for(let key in data){
        this.data.push({
      
          title: data[key].title,
          body: data[key].body,
          time: data[key].time,
          type: data[key].type,
          imgurl: data[key].imgurl,
          id: data[key].id
        });
      }

    });
  }


  openBusinessCardsPage() {
    this.navCtrl.push("BusinessCardsPage");

  }

  popModal(a){
    Swal.fire({
      title: '<strong>'+a.title+'</strong>',
      type: 'info',
      html: a.body ,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Done!',
      confirmButtonAriaLabel: 'Thumbs up, great!',

    })
  }


  popModal2(a){
    this.auth.getOtherUserProfile(a.id).then(data=>{
      console.log(data);
    this.auth.getCardsTwo(data.id).then(data=>{

      console.log(data);

      
      if( data != ' '){
      for (var key in data) {
        console.log(data.userID);
        if(a.id == data.userID ) {

      

          if(data.exchanged=="true"){
            Swal.fire({
              title: "Done Here",
              text: "You already have this card. Please check under your business cards to view" ,
              type: 'info',
              showCancelButton: true,
              confirmButtonColor: '#b33224',    
              confirmButtonText: 'View Card',
              cancelButtonText: 'Okay'
            }).then((result) => {
              if (result.value) {
                this.auth.getOtherUserProfile(a.id).then(data=>{
                  console.log(data)

                  this.navCtrl.push('DelegateDetailsPage', {
                    delegate: data
                  });




                  });
              
              }
            })
          }else{
            Swal.fire({
              title: a.title,
              text: a.body ,
              type: 'info',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Accept',
              cancelButtonText: 'Ignore'
            }).then((result) => {
              if (result.value) {
             
                this.auth.getOtherUserProfile(a.id).then(data=>{
                  console.log(data)
              
        
                  this.approve(data);
        
                });
              }
            })
          }


        }
        
      }
      }
    });

   
  });
  }


  approve(a){
    console.log(a.id)
    var time = new Date().toLocaleString() + ""
    // var time = new Date()
    this.notifications.approveCard(this.auth.user, this.firstname + " " + this.lastname,a.id,a.fcmtoken,this.dp,time)  
  }



}
