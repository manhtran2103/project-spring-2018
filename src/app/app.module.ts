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
import {MomentModule} from 'angular2-moment';
import { CommentPage } from '../pages/comment/comment';
import { SearchPage } from '../pages/search/search';
import { PopoverPage } from '../pages/popover/popover';
import { UpdateMediaPage } from '../pages/update-media/update-media';
import { UploadPage } from '../pages/upload/upload';
//import { ProvidersEditorProvider } from '../providers/providers-editor/providers-editor';
import { EditorProvider } from '../providers/editor/editor';
import {PhotoViewer} from '@ionic-native/photo-viewer';
import {Camera} from '@ionic-native/camera';
import {Geolocation} from '@ionic-native/geolocation';
import {File} from '@ionic-native/file';
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
    YourImagesPage,
    CommentPage,
    SearchPage,
    PopoverPage,
    UpdateMediaPage,
    UploadPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MomentModule,
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
    YourImagesPage,
    CommentPage,
    SearchPage,
    PopoverPage, 
    UpdateMediaPage,
    UploadPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    EditorProvider,
    PhotoViewer,
    Camera,
    Geolocation,
    File
  ]
})
export class AppModule {}
