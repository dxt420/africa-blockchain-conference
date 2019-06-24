import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import firebase from 'firebase';
import { SignupPage } from '../signup/signup';

/**
 * Generated class for the Login2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login2',
  templateUrl: 'login2.html',
})
export class Login2Page {

  loginForm: FormGroup;
  loginError: string;
  loading: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    public loadingCtrl: LoadingController,
    public menuCtrl: MenuController,
    fb: FormBuilder) {

      this.menuCtrl.enable(false, 'myMenu');


      
    this.loginForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login2Page');
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
    this.navCtrl.push(SignupPage);
  }

  facebook() {
    this.auth.facebookLogin();
  }

}
