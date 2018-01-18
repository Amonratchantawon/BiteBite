import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { Base64 } from '@ionic-native/base64';
import { Camera } from '@ionic-native/camera';
import { Facebook } from '@ionic-native/facebook';
import { Geolocation } from '@ionic-native/geolocation';

import { HomeProvider } from '../providers/home/home';
import { ReviewProvider } from '../providers/review/review';
import { HotpriceProvider } from '../providers/hotprice/hotprice';
import { ShopProvider } from '../providers/shop/shop';
import { CategoryProvider } from '../providers/category/category';
import { LoadingProvider } from '../providers/loading/loading';
import { AlertProvider } from '../providers/alert/alert';

import * as ionicGalleryModal from 'ionic-gallery-modal';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { AuthProvider } from '../providers/auth/auth';
import { ProductProvider } from '../providers/product/product';
import { CartProvider } from '../providers/cart/cart';
import { RewardProvider } from '../providers/reward/reward';
import { QuestionanswerProvider } from '../providers/questionanswer/questionanswer';
import { ContactbitebiteProvider } from '../providers/contactbitebite/contactbitebite';
import { ShopinterestProvider } from '../providers/shopinterest/shopinterest';
import { PromotioninterestProvider } from '../providers/promotioninterest/promotioninterest';


@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    ionicGalleryModal.GalleryModalModule,
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    YoutubeVideoPlayer,
    ImagePicker,
    Crop,
    Base64,
    Camera,
    Facebook,
    Geolocation,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: ionicGalleryModal.GalleryModalHammerConfig,
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptor,
    //   multi: true
    // },
    HomeProvider,
    ReviewProvider,
    HotpriceProvider,
    ShopProvider,
    CategoryProvider,
    LoadingProvider,
    AlertProvider,
    AuthProvider,
    ProductProvider,
    CartProvider,
    RewardProvider,
    QuestionanswerProvider,
    ContactbitebiteProvider,
    ShopinterestProvider,
    PromotioninterestProvider,
  ]
})
export class AppModule { }

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}