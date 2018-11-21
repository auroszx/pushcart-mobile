import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { WelcomePage } from '../pages/welcome/welcome';
import { ProductList }  from '../pages/products/productlist/productlist';
import { ProductDescription } from '../pages/products/productdescription/productdescription'; 
import { ProductCreation } from '../pages/products/productcreation/productcreation';
import { UserProvider } from '../providers/user/user';
import { HttpClientModule } from '@angular/common/http';
import { ProductsProvider } from '../providers/products/products'; 
import { UserInformation } from '../pages/userinfo/userinfo';

@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    ProductList,
    ProductDescription,
    ProductCreation,
    UserInformation
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    ProductList,
    ProductDescription,
    ProductCreation,
    UserInformation
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    ProductsProvider
  ]
})
export class AppModule {}
