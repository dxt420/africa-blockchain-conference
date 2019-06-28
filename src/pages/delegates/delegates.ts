import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';



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
  delegates;
  fakeUsers: Array<any> = new Array(12);


  public data: any[] = []; // DECLARE A NEW EMPTY ARRAY IN THE TOP OF YOUR CLASS



  searchTerm: string = '';
  searchItems: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public auth: AuthProvider) {

          
  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad DelegatesPage');
    this.initialiseItems();

  }

  // getItems(ev) {
  //   let val = ev.target.value;
  //   console.log("in getitems "+ val)
  //   if (!val || !val.trim()) {
  //     this.data = [];
  //     return;
  //   }
  //   this.data  = this.data.filter(
  //     res => res.lname === val);
  // }



    setFilteredItems() {
    
    this.searchItems = this.filterItems(this.searchTerm);
    console.log( "set filter");
    let x = this.data = this.data.map(a => a.name);
  console.log(x);

}

  
  filterItems(searchTerm){
    
    console.log( "filter items");
    console.log(searchTerm);
    console.log(this.data.filter(res => res.lname === searchTerm));
    return this.data.filter(res => res.lname === searchTerm);

}






  openItem(item: any,page: string) {
    this.navCtrl.push(page.toString(), {
      delegate: item
    });


  }

  initialiseItems(){

    this.auth.getDelegates().then(data=>{
      this.delegates = data;
    

      for(let key in this.delegates){
       if (this.delegates[key].id == this.auth.user.uid) {
         continue;
       }
        
        this.data.push({
          key: key,
          fname: this.delegates[key].firstName,
          lname: this.delegates[key].lastName,
          company: this.delegates[key].company,
          address: this.delegates[key].address,
          phone: this.delegates[key].phone,
          phone2: this.delegates[key].phone2,
          email: this.delegates[key].email,
          email2: this.delegates[key].email2,
          role: this.delegates[key].role,
          id: this.delegates[key].id,
          imageurl: this.delegates[key].imageurl,
          fcmtoken:this.delegates[key].fcmtoken
        });
      }



      this.data.sort((a, b) => a.fname.localeCompare(b.fname));

    });


    

   
  }


 


}
