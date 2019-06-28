import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';





@IonicPage()
@Component({
  selector: 'page-agenda-details',
  templateUrl: 'agenda-details.html',
})
export class AgendaDetailsPage {

  data;

  xx;

  constructor(public navCtrl: NavController,

              public navParams: NavParams) {
                this.xx = navParams.get('agenda');

                console.log(this.xx)

                console.log(this.xx.days)
                console.log(this.xx.days.nodes)
                console.log(this.xx.days.nodes[0])
                console.log(this.xx.days.nodes[0].name)
                // console.log(this.xx)

                // console.log(this.xx)

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgendaDetailsPage');
  }

  generateArray(obj){
    return Object.keys(obj).map((key)=>{ return obj[key]});
  }


  openItem(item: any,page: string) {
    this.navCtrl.push(page.toString(), {
      speaker: item
    });

  }


  cleanHTML(html: string ){
    var txt = document.createElement(`textarea`);
txt.innerHTML = html
return txt.value;
  }


  // openDoc(doc){


  //   let fileExtn=doc.docFile.guid.split('.').reverse()[0];
  //   console.log(fileExtn)
  //   console.log(doc.docFile.guid)
  //     let fileMIMEType=this.getMIMEtype(fileExtn);
  //        this.fileOpener.open(doc.docFile.guid, 'application/pdf')
  //               .then(() => console.log('File is opened'))
  //               .catch(e => console.log('Error openening file', e));

  // }


  openDoc(doc){



    this.navCtrl.push('DocViewerPage', {
      docurl: doc.docFile.guid+ "",
      docTitle: doc.docTitle
    });

  }



  getMIMEtype(extn){
    let ext=extn.toLowerCase();
    let MIMETypes={
      'txt' :'text/plain',
      'docx':'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'doc' : 'application/msword',
      'pdf' : 'application/pdf',
      'jpg' : 'image/jpeg',
      'bmp' : 'image/bmp',
      'png' : 'image/png',
      'xls' : 'application/vnd.ms-excel',
      'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'rtf' : 'application/rtf',
      'ppt' : 'application/vnd.ms-powerpoint',
      'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    }
    return MIMETypes[ext];
  }

}
