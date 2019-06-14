import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import firebase from 'firebase';
// import { Facebook } from '@ionic-native/facebook';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  public pages: Array<{ title: string, component: any, icon: string }>;
  public loading: any;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public auth: AuthProvider) {



      console.log(this.auth.user.providerData);

      console.log(this.auth.user.providerData[0].providerId);



    this.pages = [
      // { title: 'Change Password', component: 'ResetPasswordPage', icon: "key" },
    ]
  }

  public openPage(a) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // this.nav.setRoot(a.component);

    this.navCtrl.push(a.component.toString());

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

}
