import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
// import { AuthProvider } from '../../providers/auth/auth';
// import firebase from 'firebase';
import { AuthProvider } from '../../providers/auth/auth';
import { NetworkProvider } from '../../providers/network/network';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ProfilerPage } from '../profiler/profiler';
import Swal from 'sweetalert2'


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


    if(auth.isNewUser){
    


      Swal.fire({
        title: 'Complete Sign Up',
        text: "Proceed to profile to fill in more details about yourself",
        type: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Later',
        confirmButtonText: 'Go to Profile'
      }).then((result) => {
        if (result.value) {
          this.navCtrl.push(ProfilerPage);
  
        }
      })
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
                        presentations{
                          docTitle
                          docFile {
                              guid
                              mimeType
                            }
                          }
                        time
                        activitySpeakers{
                          ... on Speaker{
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
                        presentations{
                          docTitle
                          docFile {
                              guid
                              mimeType
                            }
                          }
                        time
                       activitySpeakers{
                          ... on Speaker{
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
      data['thur'].nodes[0]['a'].nodes.forEach(element => {
        console.log(element);
        console.log(element.activityDetails);
        console.log(element.activityDetails.activitySpeakers);
      });
      



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
