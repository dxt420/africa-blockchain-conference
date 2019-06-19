import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  public data: any[] = []; // DECLARE A NEW EMPTY ARRAY IN THE TOP OF YOUR CLASS


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public auth: AuthProvider) {
               

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
  }

  ionViewDidEnter(){
    this.auth.getNotifications().then(data=>{

      console.log(data);
      for(let key in data){
        this.data.push({
      
          title: data[key].title,
          body: data[key].body,
          time: data[key].time,
          type: data[key].type
        });
      }

    });
  }


  openBusinessCardsPage() {
    this.navCtrl.push("BusinessCardsPage");

  }

}
