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
  imgurl:string = "assets/img/avatar-placeholder.png";


  constructor(public navCtrl: NavController, public navParams: NavParams,private apollo: Apollo) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpeakersPage');
  }

  ngOnInit() {
    this.apollo.query({
      query: gql`query speakers {
      yr:  speakerYears(where: {name: "2019"}){
          nodes{
        posts: speakers(first: 100) {
          nodes{
            title
            content
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
      }
    }
      }`
    }).subscribe(({data, loading}) => {
      // this.loading = loading;
      console.log(data);
      this.data = data['yr'].nodes[0]['posts'].nodes;

      console.log(this.data);
    });
  }


  openItem(item: any,page: string) {
    this.navCtrl.push(page.toString(), {
      speaker: item
    });

  }

}
