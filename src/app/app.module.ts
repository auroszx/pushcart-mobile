import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import { WelcomePage } from '../pages/welcome/welcome';
import { ProductList }  from '../pages/products/productlist/productlist';
import { ProductDescription } from '../pages/products/productdescription/productdescription'; 
import { ProductCreation } from '../pages/products/productcreation/productcreation';
import { UserProvider } from '../providers/user/user';
import { HttpClientModule } from '@angular/common/http';
import { ProductsProvider } from '../providers/products/products'; 
import { UserInformation } from '../pages/userinfo/userinfo';
import { MainMenu } from '../pages/mainmenu/mainmenu';
import { ImagePicker } from '@ionic-native/image-picker';
import { NativeStorage } from '@ionic-native/native-storage';
import { FormsModule } from '@angular/forms';
import { CommentsProvider } from '../providers/comments/comments';
import { CartProvider } from '../providers/cart/cart'; 
import { ToCartModal } from '../pages/tocartmodal/tocartmodal';
import { SaleModal } from '../pages/salemodal/salemodal';
import { Cart } from '../pages/cart/cart';

@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    ProductList,
    ProductDescription,
    ProductCreation,
    UserInformation,
    MainMenu,
    ToCartModal,
    SaleModal,
    Cart
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    FormsModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    ProductList,
    ProductDescription,
    ProductCreation,
    UserInformation,
    MainMenu,
    ToCartModal,
    SaleModal,
    Cart
  ],
  providers: [
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    ProductsProvider,
    ImagePicker,
    NativeStorage,
    CommentsProvider,
    CartProvider
  ]
})
export class AppModule {}
