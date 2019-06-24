import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthPage } from '../auth/auth';

/**
 * Generated class for the StarterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-starter',
  templateUrl: 'starter.html',
})
export class StarterPage {


  imgurl:string = "assets/img/avatar-placeholder.png";


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StarterPage');
  }

  goToHome(){
    this.navCtrl.setRoot(AuthPage);
  }


  // google() {
  //   this.auth.googleLogin();

  // }

  // goToSignup() {
  //   this.navCtrl.push(AuthPage);
  // }

  // facebook() {
  //   this.auth.facebookLogin();
  // }


}
