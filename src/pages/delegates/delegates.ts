import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';


/**
 * Generated class for the DelegatesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-delegates',
  templateUrl: 'delegates.html',
})
export class DelegatesPage {
  delegates;
  fakeUsers: Array<any> = new Array(12);
  
  public data: any[] = []; // DECLARE A NEW EMPTY ARRAY IN THE TOP OF YOUR CLASS

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public auth: AuthProvider) {
                auth.getDelegates().then(data=>{
                  this.delegates = data;
                

                  for(let key in this.delegates){
                    this.data.push({
                      key: key,
                      fname: this.delegates[key].firstName,
                      lname: this.delegates[key].lastName,
                      company: this.delegates[key].company,
                      address: this.delegates[key].address,
                      phone: this.delegates[key].phone,
                      role: this.delegates[key].role,
                      id: this.delegates[key].id,
                      imageurl: this.delegates[key].imageurl,
                      fcmtoken:this.delegates[key].fcmtoken
                    });
                  }
            
                });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DelegatesPage');

    
  }

  openItem(item: any,page: string) {
    this.navCtrl.push(page.toString(), {
      delegate: item
    });


  }



}
