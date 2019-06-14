import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the SpeakerDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-speaker-details',
  templateUrl: 'speaker-details.html',
})
export class SpeakerDetailsPage {


  data;
  xx;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.xx = navParams.get('speaker');
  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad SpeakerDetailsPage');
  }

}
