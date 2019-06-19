import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
// import { AuthProvider } from '../../providers/auth/auth';
// import firebase from 'firebase';
import { AuthProvider } from '../../providers/auth/auth';
import { NetworkProvider } from '../../providers/network/network';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  public userProfile;

  public loading: any;
  offline: boolean = false;
  data1;
  data2;
  fakeUsers: Array<any> = new Array(8);
  abc: string = "feed";

  firstname;

  constructor(public navCtrl: NavController,
    public auth: AuthProvider,
    public loadingCtrl: LoadingController,
    public network: NetworkProvider,
    public alertCtrl: AlertController,
    private apollo: Apollo
  ) {




    this.userProfile = auth.user;

    auth.getFirstName().then(data=>{
      this.firstname = data;
      console.log(this.firstname);
    });



    if (network.isConnected()) {
      this.offline = true;
    }




  }

  pages: string = "pageA";

  ngOnInit() {
    this.apollo.query({
      query: gql`query activities {
        wed: days(where: {name:"Day One - Wednesday July 3, 2019"}){
                nodes{


            a:     activities(first:100){
                    nodes{
                      title
                      activityDetails{
                        time

                      }
                      days{
                        nodes{
                          name
                        }
                      }
                      venues{
                        nodes{
                          name
                        }
                      }
                    }
                  }
                }
        },
        thur: days(where: {name:"Day Two – Thursday July 4, 2019"}){
                nodes{


                  a:    activities(first:100){
                    nodes{
                      title
                      activityDetails{
                        time

                      }
                      days{
                        nodes{
                          name
                        }
                      }
                      venues{
                        nodes{
                          name
                        }
                      }
                    }
                  }
                }
        }
      }`
    }).subscribe(({ data, loading }) => {
      this.loading = loading;
      this.data1 = data['wed'].nodes[0]['a'].nodes;
      this.data2 = data['thur'].nodes[0]['a'].nodes;


      // console.log(data['wed'].nodes[0]['a'].nodes);
      // console.log(data['thur'].nodes[0]['a'].nodes);



    });
  }

  reload() {
    // this.loading = this.loadingCtrl.create({ content: "Connecting" });
    // this.loading.present();
    this.navCtrl.setRoot(this.navCtrl.getActive().component);




  }

  openItem(item: any,page: string) {
    this.navCtrl.push(page.toString(), {
      agenda: item
    });


  }

  cleanHTML(html: string ){
    var txt = document.createElement(`textarea`);
txt.innerHTML = html
return txt.value;
  }

}
