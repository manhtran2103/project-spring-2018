import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {WelcomePage} from '../pages/welcome/welcome';
import {LoginPage} from '../pages/login/login';
import {SignupPage} from '../pages/signup/signup';


import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataProvider } from '../providers/data/data';
import { PeoplePage } from '../pages/people/people';
import { FavouritePage } from '../pages/favourite/favourite';
import { SettingsPage } from '../pages/settings/settings';
import { YourImagesPage } from '../pages/your-images/your-images';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    WelcomePage,
    LoginPage,
    SignupPage,
    PeoplePage,
    FavouritePage,
    SettingsPage,
    YourImagesPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    WelcomePage,
    LoginPage,
    SignupPage,
    PeoplePage,
    FavouritePage,
    SettingsPage,
    YourImagesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider
  ]
})
export class AppModule {}
