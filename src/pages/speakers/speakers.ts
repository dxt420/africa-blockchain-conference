import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { DataProvider } from '../../providers/data/data';

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


  speakers;

  constructor(public navCtrl: NavController,
    public db: DataProvider, 
              public navParams: NavParams,
              private apollo: Apollo) {

              

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpeakersPage');
  }

  // ngOnInit() {
  //   this.apollo.query({
  //     query: gql`query speakers {
  //     yr:  speakerYears(where: {name: "2019"}){
  //         nodes{
  //       posts: speakers(first: 100) {
  //         nodes{
  //           title
  //           content
  //           featuredImage{
  //             sourceUrl
  //           }
  //           speakerDetails{
  //             company
  //             country
  //             fieldGroupName
  //             linkedin
  //             role
  //             twitter
  //             website
  //         }

  //       }
  //       }
  //     }
  //   }
  //     }`
  //   }).subscribe(({data, loading}) => {
  //     // this.loading = loading;
  //     console.log(data);
  //     this.data = data['yr'].nodes[0]['posts'].nodes;

  //     console.log(this.data);
  //   });
  // }





  ngOnInit() {

    this.db.speakersQuery().then(data=>{
      console.log('value', data);
      this.speakers = data;
        var x = this.speakers;
        console.log(x);
        x = x.replace(/\r?\n?/g, '')
   
        console.log(x);
        x = x.replace(/\\/g, '');
        console.log(x)

    this.apollo.query({
      query: gql`query speakers {
      yr:  
      
    ${x}


      }`
    }).subscribe(({data, loading}) => {
      // this.loading = loading;
      console.log(data);
      this.data = data['yr'].nodes[0]['posts'].nodes;

      console.log(this.data);

      this.data.sort((a, b) => a.title.localeCompare(b.title));
    });
  });
    


  
  }



//   speakerYears(where: {name: "2019"}){
//     nodes{
//   posts: speakers(first: 100) {
//     nodes{
//       title
//       content
//       featuredImage{
//         sourceUrl
//       }
//       speakerDetails{
//         company
//         country
//         fieldGroupName
//         linkedin
//         role
//         twitter
//         website
//     }

//   }
//   }
// }
// }



// speakerYears(where:{name:"2019"}){nodes{posts: speakers(first: 100) {nodes{title content featuredImage{ sourceUrl }speakerDetails{company country linkedin role twitter website }}}}}

  openItem(item: any,page: string) {
    this.navCtrl.push(page.toString(), {
      speaker: item
    });

  }

}
