
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, normalizeURL, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Crop } from '@ionic-native/crop';
import { ImagePicker } from '@ionic-native/image-picker';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  registerForm: FormGroup;
  signupError: string;

  imgurl:string = "assets/img/avatar-placeholder.png";

  loading: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public auth: AuthProvider,
              fb: FormBuilder,
              public imagePicker: ImagePicker,
              public toastCtrl: ToastController,
              public cropService: Crop,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController) {

                this.registerForm = fb.group({
                  fname: ['', Validators.compose([Validators.required])],
                  lname: ['', Validators.compose([Validators.required])],
                  email: ['', Validators.compose([Validators.required, Validators.email])],
                  password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
                });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }



  register() {

    this.loading = this.loadingCtrl.create({ content: "Creating account .." });
    this.loading.present();

		let data = this.registerForm.value;
		let credentials = {
			password: data.password,
			email: data.email,
			firstName: data.fname,
			lastName: data.lname,



			imageurl: this.imgurl
		};
		this.auth.signUp(credentials).then(() => {
      this.loading.dismissAll();


    },error => {
      this.signupError = error.message
    });
}


openImagePickerCrop(){
  this.imagePicker.hasReadPermission().then(
    (result) => {
    if(result == false){
      // no callbacks required as this opens a popup which returns async
      this.imagePicker.requestReadPermission();
    }
    else if(result == true){
      this.imagePicker.getPictures({
      maximumImagesCount: 1
      }).then(
      (results) => {
        for (var i = 0; i < results.length; i++) {
        this.cropService.crop(results[i], {quality: 75}).then(
          newImage => {
          this.uploadImageToFirebase(newImage);
          },
          error => console.error("Error cropping image", error)
        );
        }
      }, (err) => console.log(err)
      );
    }
    }, (err) => {
    console.log(err);
    });
  }



  uploadImageToFirebase(image){
    this.loading = this.loadingCtrl.create({ content: "Uploading Profile Pic" });
    this.loading.present();
    image = normalizeURL(image);

    //uploads img to firebase storage
    this.auth.uploadImage(image)
    .then(photoURL => {
      console.log(photoURL);

      this.imgurl = photoURL;
      this.loading.dismissAll();

      let toast = this.toastCtrl.create({
        message: 'Image was updated successfully',
        duration: 3000
      });
      toast.present();
      })
    }

}
