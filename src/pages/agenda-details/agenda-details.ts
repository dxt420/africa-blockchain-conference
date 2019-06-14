import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';



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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgendaDetailsPage');
  }

}
