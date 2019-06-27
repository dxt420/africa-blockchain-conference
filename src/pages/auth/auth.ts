import { Login2Page } from './../login2/login2';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';
import firebase from 'firebase';
import { AuthProvider } from '../../providers/auth/auth';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';


// import { LoadingController } from 'ionic-angular';





@IonicPage()
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage {


  imgurl:string = "assets/img/avatar-placeholder.png";

  loginForm: FormGroup;
  loginError: string;
  loading: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    public loadingCtrl: LoadingController,
    public menuCtrl: MenuController,
    fb: FormBuilder) {

      // this.menuCtrl.enable(false, 'myMenu');


      
    this.loginForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthPage');
  }

  login() {

    this.loading = this.loadingCtrl.create({ content: "Signing In" });
    this.loading.present();
    let data = this.loginForm.value;

    if (!data.email) {
      return;

    }


    firebase.auth().signInWithEmailAndPassword(data.email, data.password)
      .then(
        () => {
          this.loading.dismissAll();
          // this.navCtrl.setRoot(TabsPage)
        },
        // error => this.loginError = error.message
        error => {
          this.loading.dismissAll();
          this.loginError = "Oops! Your email or password is incorrect. If you are a new user please sign up below"
        }

      );
  }


  google() {
    this.auth.googleLogin();

  }

  goToSignup() {
    this.navCtrl.push(Login2Page);
  }

  facebook() {
    this.auth.facebookLogin();
  }

}
