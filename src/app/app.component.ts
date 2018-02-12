import { Component, ViewChild } from '@angular/core';
import { Platform , Nav} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { PeoplePage } from '../pages/people/people';
import {Storage} from '@ionic/storage';
import { WelcomePage } from '../pages/welcome/welcome';
import { Events } from 'ionic-angular';
import { AboutPage } from '../pages/about/about';
import { SettingsPage } from '../pages/settings/settings';
import { FavouritePage } from '../pages/favourite/favourite';
import { YourImagesPage } from '../pages/your-images/your-images';
@Component({
  templateUrl: 'app.html'
})


export class MyApp {
  rootPage:any = HomePage;
  @ViewChild(Nav) nav: Nav;
  pages: Array<{title: string, component: any, name:string}>;
  username = 'Username';
  email = 'Email';
  constructor(platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen, public events: Events) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.pages = [
      {title: 'Home', component: HomePage, name: 'home'},
      {title: 'Your Media', component: YourImagesPage, name: 'images'},
      {title: 'Favourite', component: FavouritePage, name: 'star'},
      {title: 'People', component: PeoplePage, name: 'people'},
      {title: 'About', component: AboutPage, name: 'contacts'},
      {title: 'Settings', component: SettingsPage, name: 'settings'}

    ];

    //setting for the first login
    this.events.subscribe('logged in', user => {
      console.log(user);
      this.username = user['username'];
      this.email = user['email'];
    });

    //setting for the next time
    if(localStorage.getItem('userdata') !=null){
      this.username = JSON.parse(localStorage.getItem('userdata')).user.username;
      this.email = JSON.parse(localStorage.getItem('userdata')).user.email;
    }
  }

  openPage(page){
    this.nav.setRoot(page.component);
  }
  
  logOut(){
    localStorage.removeItem('userdata');
    this.nav.setRoot(WelcomePage);
  }
}
