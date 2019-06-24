import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';
import { LoadingController, AlertController } from 'ionic-angular';
import { FCM } from '@ionic-native/fcm';
import Swal from 'sweetalert2'
// import { AuthPage } from '../../pages/auth/auth';


@Injectable()
export class AuthProvider {


  //  additional fiekds

  // birthday
  // sex
  // phone
  // country

  // public userProfile:any = null;
  public user: firebase.User;
  public loading: any;

  ttoken: any;
  isNewUser: boolean;

  constructor(public http: HttpClient,
    private googlePlus: GooglePlus,
    private facebook: Facebook,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public fcm: FCM) {
    console.log('Hello AuthProvider Provider');

    this.loading = this.loadingCtrl.create({ content: " " });
    this.loading.present();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.fcm.getToken().then(token => {

          console.log(token);
          this.ttoken = token;

        });
        console.log(user);

        console.log(this.isNewUser);

        this.user = user;
        console.log("******************************");
        console.log("******************************");
        console.log("USER ID");
        console.log(user.uid);
        console.log("******************************");
        console.log("******************************");
        console.log("Logged in as " + this.user.displayName);
      } else {
        console.log("There's no user here");

      }
      this.loading.dismissAll();
    });

  }


  signUp(credentials) {
    return firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(function (user) {

        // user.additionalUserInfo.

        firebase.auth().currentUser.updateProfile({
          displayName: credentials.firstName + " " +credentials.lastName,
          photoURL: credentials.imageurl
        }).then(function() {
          // Update successful.

          console.log("User Profile Update successful");
        }).catch(function(error) {
          // An error happened.
          console.log("User Profile Error",error);
        });


        var ref = firebase.database().ref().child("users");
        var data = {
          email: credentials.email,
          firstName: credentials.firstName,
          lastName: credentials.lastName,
          imageurl: credentials.imageurl,
          id: user.user.uid

        }
        ref.child(user.user.uid).set(data).then(function (ref) {//use 'child' and 'set' combination to save data in your own generated key
          console.log("Saved");
          // let user = firebase.auth().currentUser;
          // user.sendEmailVerification();
         
          // this. = true;
  

      Swal.fire({
        title: 'Welcome to ABC 2019',
        text: "New Account with Africa Blockchain created successfully",
        type: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Done'
      }).then((result) => {
        if (result.value) {
       
  
        }
      })

   

          //  $location.path('/profile');
        }, function (error) {
          console.log(error);
        });
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else if (errorCode == 'auth/email-already-in-use') {
          alert('The email is already taken.');
        } else if (errorCode == 'auth/weak-password') {
          alert('Password is weak');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });


     
  }

  googleLogin(): void {
    this.loading = this.loadingCtrl.create({ content: "Logging in! please wait..." });
    this.loading.present();
    this.googlePlus.login({
      'webClientId': '228396331551-39mcavom0fqrh90vjg1hfs6dm5va86as.apps.googleusercontent.com',
      'offline': false
    }).then(res => {
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
        .then(success => {

          console.log("Firebase success: " + JSON.stringify(success));

          if (success.additionalUserInfo.isNewUser) {
            var ref = firebase.database().ref().child("users");
            var data = {
              email: success.additionalUserInfo.profile['email'],
              firstName: success.additionalUserInfo.profile['given_name'],
              lastName: success.additionalUserInfo.profile['family_name'],

              imageurl: success.additionalUserInfo.profile['picture'],

              id: success.user.uid

            }
            ref.child(success.user.uid).set(data).then(function (ref) {//use 'child' and 'set' combination to save data in your own generated key
              console.log("Saved");

              

            }, function (error) {
              console.log(error);
            });

            this.isNewUser = true;
          } 



          // this.user = success;
        })
        .catch(error => { console.log("Firebase failure: " + JSON.stringify(error)) });
    }).catch(err => { console.error("Error: ", err) });

    this.loading.dismissAll();
  }


  facebookLogin() {
    this.loading = this.loadingCtrl.create({ content: "Logging in! please wait..." });
    this.loading.present();
    this.facebook.login(['email']).then((response) => {
      const facebookCredential = firebase.auth.FacebookAuthProvider
        .credential(response.authResponse.accessToken);

      firebase.auth().signInWithCredential(facebookCredential)
        .then((success) => {


          console.log("Firebase success: " + JSON.stringify(success));

          if (success.additionalUserInfo.isNewUser) {
            var ref = firebase.database().ref().child("users");
            var data = {
              email: success.additionalUserInfo.profile['email'],
              firstName: success.additionalUserInfo.profile['first_name'],
              lastName: success.additionalUserInfo.profile['last_name'],

              imageurl: success.additionalUserInfo.profile['picture'].data.url,

              id: success.user.uid

            }
            ref.child(success.user.uid).set(data).then(function (ref) {//use 'child' and 'set' combination to save data in your own generated key
              console.log("Saved");

            }, function (error) {
              console.log(error);
            });

            this.isNewUser = true;
          }

          this.loading.dismissAll();

        })
        .catch((error) => {

          console.log("Firebase failure: " + error);
          this.loading.dismissAll();
        });

    }).catch((error) => {

      console.log(error);
      this.loading.dismissAll();
    });


   
  }

  getDelegates() {
    return firebase.database().ref().child("users").once('value').then(function (snapshot) {
      return (snapshot.val());

    });;

  }

  getNotifications() {
    return firebase.database().ref().child("notifications").child(this.user.uid).once('value').then(function (snapshot) {
      return (snapshot.val());

    });;

  }


  getPendingCards() {
    return firebase.database().ref().child("businessCards").child(this.user.uid).once('value').then(function (snapshot) {
   

      return (snapshot.val() && snapshot.val().pending) || ' ';

    });;

  }


  getPendingCardsTwo() {
    return firebase.database().ref().child("businessCards").child(this.user.uid).child("pending").once('value').then(function (snapshot) {
   

      return (snapshot.val()) || ' ';

    });;

  }

  getReceivedCards() {
    return firebase.database().ref().child("businessCards").child(this.user.uid).once('value').then(function (snapshot) {
      // return (snapshot.val().received);

      return (snapshot.val() && snapshot.val().received) || ' ';

    });;

  }

  getReceivedCardsTwo() {
    return firebase.database().ref().child("businessCards").child(this.user.uid).child("received").once('value').then(function (snapshot) {
      // return (snapshot.val().received);

      return (snapshot.val()) || ' ';

    });;

  }

  getApprovedCards() {
    return firebase.database().ref().child("businessCards").child(this.user.uid).once('value').then(function (snapshot) {
      // return (snapshot.val().approved);

      return (snapshot.val() && snapshot.val().approved) || ' ';

    });;

  }

  getApprovedCardsTwo() {
    return firebase.database().ref().child("businessCards").child(this.user.uid).child("approved").once('value').then(function (snapshot) {
      // return (snapshot.val().approved);

      return (snapshot.val()) || ' ';

    });;

  }

  getUserProfile() {
    return firebase.database().ref().child("users").child(this.user.uid).once('value').then(function (snapshot) {
      return (snapshot.val());

      

    });;

  }

  getEmail() {
    return firebase.database().ref().child("users").child(this.user.uid).once('value').then(function (snapshot) {
      return (snapshot.val().email);

      

    });;

  }

  getOtherUserProfile(id) {
    return firebase.database().ref().child("users").child(id).once('value').then(function (snapshot) {
      return (snapshot.val());

    });;

  }

  getFirstName() {
    return firebase.database().ref().child("users").child(this.user.uid).once('value').then(function (snapshot) {
      return (snapshot.val() && snapshot.val().firstName) || ' ';

    });;

  }

  getLastName() {
    return firebase.database().ref().child("users").child(this.user.uid).once('value').then(function (snapshot) {
      return (snapshot.val() && snapshot.val().lastName) || ' ';

    });;

  }



  getCompany() {
    return firebase.database().ref().child("users").child(this.user.uid).once('value').then(function (snapshot) {
      return (snapshot.val() && snapshot.val().company) || ' ';

    });;

  }

  getRole() {
    return firebase.database().ref().child("users").child(this.user.uid).once('value').then(function (snapshot) {
      return (snapshot.val() && snapshot.val().role) || ' ';

    });;

  }

  getAddress() {
    return firebase.database().ref().child("users").child(this.user.uid).once('value').then(function (snapshot) {
      return (snapshot.val() && snapshot.val().address) || ' ';

    });;

  }

  getPhone() {
    return firebase.database().ref().child("users").child(this.user.uid).once('value').then(function (snapshot) {
      return (snapshot.val() && snapshot.val().phone) || ' ';

    });;

  }

  dp() {
    return firebase.database().ref().child("users").child(this.user.uid).once('value').then(function (snapshot) {
      return (snapshot.val() && snapshot.val().imageurl) || ' ';

    });;

  }

  getUserToken() {
    

    return firebase.database().ref().child("users").child(this.user.uid).once('value').then(function (snapshot) {
      return (snapshot.val().fcmtoken);

    });;

  }

  getReceiverToken(id) {
    

    return firebase.database().ref().child("users").child(id+"").once('value').then(function (snapshot) {
      return (snapshot.val().fcmtoken);

    });;

  }

  

  profileUpdate(credentials) {
    var ref = firebase.database().ref().child("users");
    var data = {

      firstName: credentials.firstName,
      lastName: credentials.lastName,
      company: credentials.company,
      role: credentials.role,
      address: credentials.address,
      phone: credentials.phone,
      imageurl: credentials.imageurl
    }
    ref.child(this.user.uid).update(data).then(function (ref) {//use 'child' and 'set' combination to save data in your own generated key
      console.log("Updated");
      // let user = firebase.auth().currentUser;
      // user.sendEmailVerification();
      //  $location.path('/profile');
    }, function (error) {
      console.log(error);
    });

  }


  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux: any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;
  };

  uploadImage(imageURI) {
    return new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      var timestamp = new Date().getUTCMilliseconds();
      let imageRef = storageRef.child('User Profile Pix').child(timestamp.toString());
      this.encodeImageUri(imageURI, function (image64) {
        imageRef.putString(image64, 'data_url')
          .then(snapshot => {
            resolve(snapshot.ref.getDownloadURL())
            console.log(snapshot.ref.getDownloadURL())

          }, err => {
            reject(err);
          })
      })
    })
  }





  logoutFacebook() {
    this.loading = this.loadingCtrl.create({ content: "Logging Out" });
    this.loading.present();

    this.facebook.logout()
      .then(res => {
        firebase.auth().signOut();
        this.user = null;

        console.log('Logged Out');
      })
      .catch(e => {
        this.loading.dismissAll();
        console.log('Error logout from innner Facebook', e);


      });





  }

  logoutGoogle() {
    this.loading = this.loadingCtrl.create({ content: "Logging Out" });
    this.loading.present();

    firebase.auth().signOut();
    this.loading.dismissAll();

  }









}
