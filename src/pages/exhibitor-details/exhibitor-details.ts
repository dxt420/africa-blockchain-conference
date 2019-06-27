import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer} from '@angular/platform-browser';

/**
 * Generated class for the ExhibitorDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-exhibitor-details',
  templateUrl: 'exhibitor-details.html',
})
export class ExhibitorDetailsPage {

  data;
  xx;
  theHtmlString;
  imgurl:string = "assets/img/avatar-placeholder.png";

  constructor(public navCtrl: NavController, 
    private sanitizer: DomSanitizer,          
    public navParams: NavParams) {
    this.xx = navParams.get('exhibitor');

    this.theHtmlString = this.sanitizer.bypassSecurityTrustHtml(this.xx.content);
  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad exhibitorDetailsPage');
  }

  cleanHTML(html: string ){
    var txt = document.createElement(`textarea`);
txt.innerHTML = html
return txt.value;
  }

}
