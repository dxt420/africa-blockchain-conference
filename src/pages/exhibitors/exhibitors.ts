import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { DataProvider } from '../../providers/data/data';
/**
 * Generated class for the ExhibitorsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-exhibitors',
  templateUrl: 'exhibitors.html',
})
export class ExhibitorsPage implements OnInit{
  fakeUsers: Array<any> = new Array(8);

  data;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public db: DataProvider,
              private apollo: Apollo) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExhbbPage');
  }

  // ngOnInit() {
  //   this.apollo.query({
  //     query: gql`query exhibitor {
  //       posts: exhibitors(first: 100) {
  //         nodes{
  //           title
  //           content
  //           featuredImage{
  //             sourceUrl
  //           }
           
  //         }

  //       }
  //     }`
  //   }).subscribe(({data, loading}) => {
  //     // this.loading = loading;
  //     this.data = data['posts'].nodes;

  //   });
  // }


  ngOnInit() {


     this.db.exhibitorsQuery().then(data=>{
      console.log('value', data);
   
        var x = data;
        console.log(x);
        x = x.replace(/\r?\n?/g, '')
   
        console.log(x);
        x = x.replace(/\\/g, '');
        console.log(x)

  
        this.apollo.query({
          query: gql`query exhibitor {
            ${x}
          }`
        }).subscribe(({data, loading}) => {
          // this.loading = loading;
          this.data = data['posts'].nodes;
          this.data.sort((a, b) => a.title.localeCompare(b.title));
        });
  });
    










  }

  openItem(item: any,page: string) {
    this.navCtrl.push(page.toString(), {
      exhibitor: item
    });


  }

}
