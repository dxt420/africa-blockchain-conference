import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, normalizeURL } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';

/**
 * Generated class for the ProfilerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profiler',
  templateUrl: 'profiler.html',
})
export class ProfilerPage {

  form: FormGroup;

  firstname;
  lastname;
  company;
  role;
  address;
  phone;

  // imgurl:string = "assets/img/avatar-placeholder.png";
  imgurl;
  loading: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              fb: FormBuilder,
              public imagePicker: ImagePicker,

              public cropService: Crop,
              public auth: AuthProvider,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,) {




    auth.getFirstName().then(data=>{
      this.firstname = data;
    });

    auth.dp().then(data=>{
      this.imgurl = data;
    });

    auth.getLastName().then(data=>{
      this.lastname = data;
    });

    auth.getCompany().then(data=>{
      this.company = data;
    });

    auth.getRole().then(data=>{
      this.role = data;
    });

    auth.getAddress().then(data=>{
      this.address = data;
    });

    auth.getPhone().then(data=>{
      this.phone = data;
    });



    console.log(this.firstname);




    this.form = fb.group({
      fname: [],
      lname: [],
      company: [],
      role: [],
      address: [],
      phone: []
		});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilerPage');
  }

  updateInfo() {
    let data = this.form.value;
    let credentials = {
      firstName: data.fname,
      lastName: data.lname,
      company: data.company,
      role: data.role,
      address: data.address,
      phone: data.phone,
      imageurl: this.imgurl

    };
    this.auth.profileUpdate(credentials);


    this.ionViewDidLoad();

    let toast = this.toastCtrl.create({
      message: 'Profile Info Updated',
      duration: 3000
    });
    toast.present();

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
