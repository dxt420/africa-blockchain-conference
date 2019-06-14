import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



/**
 * Generated class for the SocialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-social',
  templateUrl: 'social.html',
})
export class SocialPage {

  theHtmlString;

  constructor(public navCtrl: NavController,

              public navParams: NavParams) {




                // this.theHtmlString = this.sanitizer.bypassSecurityTrustUrl(`<a class="twitter-timeline" data-theme="light" data-link-color="#b33224" href="https://twitter.com/CryptoSavannah?ref_src=twsrc%5Etfw">Tweets by CryptoSavannah</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`)




  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SocialPage');
  }

}
