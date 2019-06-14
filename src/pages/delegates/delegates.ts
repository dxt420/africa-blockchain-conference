import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

/**
 * Generated class for the DelegatesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-delegates',
  templateUrl: 'delegates.html',
})
export class DelegatesPage {
  data;

  constructor(public navCtrl: NavController, public navParams: NavParams,private apollo: Apollo) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DelegatesPage');
  }

  ngOnInit() {
    this.apollo.query({
      query: gql`query speakers {
        posts: speakers {
          nodes{
            title
            featuredImage{
              sourceUrl
            }
          }

        }
      }`
    }).subscribe(({data, loading}) => {
      this.data = data['posts'].nodes;

    });
  }

}
