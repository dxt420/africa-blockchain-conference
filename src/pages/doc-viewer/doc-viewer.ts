import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer} from '@angular/platform-browser';

/**
 * Generated class for the DocViewerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doc-viewer',
  templateUrl: 'doc-viewer.html',
})
export class DocViewerPage {
  docurl;
  docTitle;

  constructor(public navCtrl: NavController, private sanitizer: DomSanitizer,  public navParams: NavParams) {
    this.docurl = this.sanitizer.bypassSecurityTrustResourceUrl('http://docs.google.com/gview?embedded=true&url='+navParams.get('docurl'));
    this.docTitle = navParams.get('docTitle');
    // this.docurl = this.sanitizer.bypassSecurityTrustResourceUrl(navParams.get('docurl'))
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DocViewerPage');
  }

  goback(){
    this.navCtrl.pop();
  }

}
