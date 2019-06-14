import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

/**
 * Generated class for the SpeakersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-speakers',
  templateUrl: 'speakers.html',
})
export class SpeakersPage implements OnInit {

  fakeUsers: Array<any> = new Array(8);
  data;


  constructor(public navCtrl: NavController, public navParams: NavParams,private apollo: Apollo) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpeakersPage');
  }

  ngOnInit() {
    this.apollo.query({
      query: gql`query speakers {
        posts: speakers(first: 100) {
          nodes{
            title
            featuredImage{
              sourceUrl
            }
            speakerDetails{
              company
              country
              fieldGroupName
              linkedin
              role
              twitter
              website
          }

        }
        }
      }`
    }).subscribe(({data, loading}) => {
      // this.loading = loading;
      this.data = data['posts'].nodes;

    });
  }


  openItem(item: any,page: string) {
    this.navCtrl.push(page.toString(), {
      speaker: item
    });


  }

}
