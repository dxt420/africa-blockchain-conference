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

}
