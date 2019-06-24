import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { NotificationsProvider } from '../../providers/notifications/notifications';


import Swal from 'sweetalert2'


/**
 * Generated class for the BusinessCardsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-business-cards',
  templateUrl: 'business-cards.html',
})
export class BusinessCardsPage {


  public pending: any[] = [];
  public received: any[] = [];
  public approved: any[] = [];
  

  firstname;
  lastname;

  abc: string = "a";



  constructor(public navCtrl: NavController, 
              public auth: AuthProvider,
              public notifications: NotificationsProvider,
              public navParams: NavParams) {

                auth.getFirstName().then(data=>{
                  this.firstname = data;
                });
            
              
            
                auth.getLastName().then(data=>{
                  this.lastname = data;
                });


                this.auth.getPendingCardsTwo().then(data=>{

                  console.log(data);
            
                  
                  if( data != ' '){
                  for (var key in data) {
                  
                      // do something
                      console.log(data[key].userID);
                      
            
                      this.auth.getOtherUserProfile(data[key].userID).then(data=>{
                        console.log(data)
                    

                        this.pending.push({
                       
                          fname: data.firstName,
                          lname: data.lastName,
                          company: data.company,
                          address: data.address,
                          phone: data.phone,
                          role: data.role,
                      
                          imageurl: data.imageurl,
                          fcmtoken:data.fcmtoken
                        });
             
                      });

                      console.log(this.pending)
            
                   
                }
              }
            
                  
            
                });


                  this.auth.getApprovedCardsTwo().then(data=>{

      console.log(data);

      
      if( data != ' '){
      for (var key in data) {
      
          // do something

          this.auth.getOtherUserProfile(data[key].userID).then(data=>{
            console.log(data)
        


            this.approved.push({
                       
              fname: data.firstName,
              lname: data.lastName,
              company: data.company,
              address: data.address,
              phone: data.phone,
              role: data.role,
          
              imageurl: data.imageurl,
              fcmtoken:data.fcmtoken
            });
 
      
          });

       
    }
  }

      

                  });



                this.auth.getReceivedCards().then(data=>{

                  console.log(data);

                  
                  if( data != ' '){
                  for (var key in data) {
                  
                      // do something

                      this.auth.getOtherUserProfile(data[key].userID).then(data=>{
                    
                    

                        console.log(data)
                 


            this.received.push({
                       
              fname: data.firstName,
              lname: data.lastName,
              company: data.company,
              address: data.address,
              phone: data.phone,
              role: data.role,
          
              imageurl: data.imageurl,
              fcmtoken:data.fcmtoken
            });
                  
                      });

                  
                }
              }

                  

                });
              
   

  }

  approve(a){
    this.notifications.approveCard(this.auth.user, this.firstname + " " + this.lastname,a.key,a.fcmtoken) 
  }
 
  decline(a){
    this.notifications.declineCard(this.auth.user, a.key) 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BusinessCardsPage');
  
  }

  openItem(item: any,page: string) {
    this.navCtrl.push(page.toString(), {
      delegate: item
    });


  }


  popModal(a){
  


    Swal.fire(
       a.fname + ' ' + a.lastName,
       a.company +', ' + a.role + '.' + a.address,
       a.phone
      
      
      
    )
  }
}
