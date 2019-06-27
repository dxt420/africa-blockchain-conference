import { Component, AfterViewInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer} from '@angular/platform-browser';



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
export class SocialPage implements AfterViewInit{

  theHtmlString;

  constructor(public navCtrl: NavController,
              private sanitizer: DomSanitizer,
              public navParams: NavParams) {




                this.theHtmlString = this.sanitizer.bypassSecurityTrustHtml(`<a class="twitter-timeline" data-theme="light" data-link-color="#b33224" href="https://twitter.com/CryptoSavannah?ref_src=twsrc%5Etfw"> <p text-center>Loading feed from #AfricaBlockchainUG19</p></a> `)
                // this.theHtmlString = this.sanitizer.bypassSecurityTrustResourceUrl(`https://twitframe.com/show?url=https://twitter.com/CryptoSavannah?ref_src=twsrc%5Etfw`)




  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SocialPage');
  }


  ngAfterViewInit() {
    // @ts-ignore
    twttr.widgets.load();


    // let ngJs: any;
    //     const ngFjs = document.getElementsByTagName('script')[0];
    //     const ngP = 'https';

    //     if (!document.getElementById('twitter-wjs')) {
    //       ngJs = document.createElement('script');
    //       ngJs.id = 'twitter-wjs';
    //       ngJs.src = ngP + '://platform.twitter.com/widgets.js';
    //       ngFjs.parentNode.insertBefore(ngJs, ngFjs);

    //     }
}
}
