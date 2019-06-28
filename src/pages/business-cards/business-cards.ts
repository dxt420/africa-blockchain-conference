import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';


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


 
  public received: any[] = [];

  


  data;



  constructor(public navCtrl: NavController, 
              public auth: AuthProvider,
              public navParams: NavParams) {



         


                this.auth.getCards().then(data=>{

                  console.log(data);
            
                  
                  if( data != ' '){
                  for (var key in data) {
                    console.log(data[key].userID);
                    if(data[key].exchanged=="true"){
                      this.auth.getOtherUserProfile(data[key].userID).then(data=>{
                        console.log(data)
                    

                        this.received.push({
                       
                          fname: data.firstName,
                          lname: data.lastName,
                          company: data.company,
                          address: data.address,
                          email: data.email,
                          email2: data.email2,
                          phone: data.phone,
                          phone2: data.phone2,
                          role: data.role,
                          id: data.id,
                          imageurl: data.imageurl,
                          fcmtoken:data.fcmtoken
                        });
             
                      });
                    }
                      // do something
                    
                      
            
                      

                   console.log(this.received);


                   this.received.sort((a, b) => a.fname.localeCompare(b.fname));
            
                   
                }
              }
            
                  
            
                });


                
              
   

  }

 


  ionViewDidLoad() {
    console.log('ionViewDidLoad BusinessCardsPage');


   
  
  }



  popModal(a){
  
    this.auth.getOtherUserProfile(a.id).then(data=>{
      console.log(data)
  

      var company;
      var role;
      var address;
      var phone;
      var phone2;

      if(!data.company){
        company = ""
      }else{
        company = data.company + ', ';
      }

      if(!data.role){
        role = ""
      }else{
        role = data.role ;
      }

      if(!data.address){
        address = ""
      }else{
        address = ' - ' + data.address ;
      }

      if(!data.phone){
        phone = ""
      }else{
        phone = data.phone ;
      }

      if(!data.phone2){
        phone2 = ""
      }else{
        phone2 = ' / ' + data.phone2 ;
      }
     
     
      if(company == "" && role == "" && address == "" && phone == "" && phone2 == ""){
        Swal.fire(
          data.firstName + ' ' + data.lastName,
          'No business card details yet. You will able to see card details once '+ data.firstName + ' updates'
      
       )
      }else{
        Swal.fire(
          data.firstName + ' ' + data.lastName,
          company  + role  + address,
          phone + phone2
      
       )
      }

     

    });

    
  }



  openItem(item: any) {
    this.navCtrl.push('DelegateDetailsPage', {
      delegate: item
    });

  }
}
