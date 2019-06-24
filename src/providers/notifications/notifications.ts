
import { Injectable } from '@angular/core';
import { FCM } from '@ionic-native/fcm';
import firebase from 'firebase';
import { AlertController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/*
  Generated class for the NotificationsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationsProvider {

  constructor(public fcm: FCM,
    public http: HttpClient,
              public alertCtrl:AlertController) {
      console.log('Hello NotificationsProvider Provider');

      
  }


  saveNotificationToFirebase(id,notification) {
    var ref = firebase.database().ref().child("notifications").child(id);

    var time = new Date().toLocaleString()
    
    console.log(time)
    
    console.log(notification)
    var data = {

      title: notification.title,
      body:  notification.body,
      type: notification.type,
      imgurl: notification.imgurl,
      time: time+""
    }

    console.log(data)
    ref.push(data).then(function (ref) {
      console.log("Notification Saved");
    
    }, function (error) {
      console.log(error);
    });

  }


  requestCard(user,requestedUserName,requestedUserID,requestedUserToken,imgurl,time) {

 
    

    let notifcationObj: any = {
      "notification": {
        "title": "Business Card Request",
        "body" : requestedUserName + " has sent you a business card request",
        "sound": "default",
        "click_action": "FCM_PLUGIN_ACTIVITY",
        "icon": "fcm_push_icon",
        
      },
      "data": {
        "title": "Business Card Request",
        "body" : requestedUserName + " has sent you a business card request",
        "imgurl":imgurl+"",
        "type" : "BCard",
        "time": time
      },
      "to": requestedUserToken,
      "priority": "high",
      "restricted_package_name": ""
    };

 

    let options = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.post("https://fcm.googleapis.com/fcm/send", notifcationObj, {
      headers: options.set('Authorization', 'key=AAAANS17ch8:APA91bH8oPT-7qE-jLkxGEIv_hg2gxIwcPi3Rex54VgvE3aL_av4u4z3UFurx0Jtej1FcAXCVgXM2n9HMQiDAf5k2nbU9NXq2UHrfhVohTAFRl6iBq6j5PKz1eutdL_FhzqEnPdicQ67'),
    }).subscribe((data) => {
      console.log('notification data -> ', data);
      var ref = firebase.database().ref().child("businessCards").child(user.uid).child("pending");
      var ref2 = firebase.database().ref().child("businessCards").child(requestedUserID).child("received");
      var a = {
  
        userID: requestedUserID
      }
      ref.push(a).then(function (ref) {
        console.log("Request of Business Card Successful");
      
      }, function (error) {
        console.log(error);
      });

      ref2.push(a).then(function (ref) {
        console.log("Request of Business Card Successful");
      
      }, function (error) {
        console.log(error);
      });

    

      // this.saveNotificationToFirebase(requestedUserID,notifcationObj.data,time);

    }, (error) => {
      console.log('notification error -> ', error);
    });

   


 


  }



  approveCard(user,approveUserName,requestedUserID,requestedUserToken) {

    

    let notifcationObj: any = {
      "notification": {
        "title": "Business Card Request Approved",
        "body" : approveUserName + " has approved your business card request",
        "sound": "default",
        "click_action": "FCM_PLUGIN_ACTIVITY",
        "icon": "fcm_push_icon"
      },
      "data": {
        "title": "Business Card Request",
        "body" : approveUserName + " has approved your business card request",
        "type" : "BCard",
        "time": new Date().toLocaleString()
      },
      "to": requestedUserToken,
      "priority": "high",
      "restricted_package_name": ""
    };

 

    let options = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.post("https://fcm.googleapis.com/fcm/send", notifcationObj, {
      headers: options.set('Authorization', 'key=AAAANS17ch8:APA91bH8oPT-7qE-jLkxGEIv_hg2gxIwcPi3Rex54VgvE3aL_av4u4z3UFurx0Jtej1FcAXCVgXM2n9HMQiDAf5k2nbU9NXq2UHrfhVohTAFRl6iBq6j5PKz1eutdL_FhzqEnPdicQ67'),
    }).subscribe((data) => {
      console.log('notification data -> ', data);
      firebase.database().ref().child("businessCards").child(requestedUserID).child("pending").child(requestedUserID).remove();
      
      var ref = firebase.database().ref().child("businessCards").child(requestedUserID).child("approved");
      var a = {
  
        userID: requestedUserID
      }
      ref.push(a).then(function (ref) {
        console.log("Approved Request of Business Card Successful");
      
      }, function (error) {
        console.log(error);
      });

      // this.saveNotificationToFirebase(requestedUserID,notifcationObj.data,time);

    }, (error) => {
      console.log('notification error -> ', error);
    });


  }



  declineCard(user,requestedUserID) {
    firebase.database().ref().child("businessCards").child(user.uid).child("pending").child(requestedUserID).remove();

  }



}
