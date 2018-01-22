import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReviewBikerPage } from './review-biker';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    ReviewBikerPage,
  ],
  imports: [
    Ionic2RatingModule,
    IonicPageModule.forChild(ReviewBikerPage),
  ],
})
export class ReviewBikerPageModule {}
