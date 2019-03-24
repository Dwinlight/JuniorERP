import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  constructor() {
    const config = {
      apiKey: 'AIzaSyAwKeO4-C5OMISdRD5ERzWkfhQA31fkBIo',
      authDomain: 'juniorerp-9416f.firebaseapp.com',
      databaseURL: 'https://juniorerp-9416f.firebaseio.com',
      projectId: 'juniorerp-9416f',
      storageBucket: 'juniorerp-9416f.appspot.com',
      messagingSenderId: '925328476223'
    };
    firebase.initializeApp(config);
  }

}
