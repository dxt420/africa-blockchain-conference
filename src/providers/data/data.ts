
import { Injectable } from '@angular/core';

import firebase from 'firebase';




@Injectable()
export class DataProvider {





  constructor() {
    console.log('Hello DataProvider Provider');

  }

  exhibitorsQuery() {
    return firebase.database().ref().child("GRAPHQL")
    .once('value').then(function(snapshot) {
      return (snapshot.val() && snapshot.val().Exhibitors) || ' ';

    });
  }

  activityQuery() {
    return firebase.database().ref().child("GRAPHQL")
    .once('value').then(function(snapshot) {
      return (snapshot.val() && snapshot.val().Activity) || ' ';

    });
  }


  speakersQuery() {
    return firebase.database().ref().child("GRAPHQL")
    .once('value').then(function(snapshot) {
      return (snapshot.val() && snapshot.val().Speakers) || ' ';

    });
  }


  sponsorsQuery() {
    return firebase.database().ref().child("GRAPHQL")
    .once('value').then(function(snapshot) {
      return (snapshot.val() && snapshot.val().Sponsors) || ' ';

    });
  }


}
