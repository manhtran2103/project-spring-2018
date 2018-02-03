import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { YourImagesPage } from './your-images';

@NgModule({
  declarations: [
    YourImagesPage,
  ],
  imports: [
    IonicPageModule.forChild(YourImagesPage),
  ],
})
export class YourImagesPageModule {}
