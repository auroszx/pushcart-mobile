import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { ToastController } from 'ionic-angular';
import { ProductList } from '../products/productlist/productlist';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  loggedIn = false;
  username: String = "";
  fullname: String = "";
  email: String = "";
  password: String = "";
  response: any;
  signup: Boolean = false;
  endpoint: string = localStorage.getItem("endpoint");

  constructor(public navCtrl: NavController, public user: UserProvider, private toastCtrl: ToastController, private nativeStorage: NativeStorage) {
  	//Check if user was previously logged in.
  	// this.nativeStorage.getItem("token").then((data) =>
   //  {
   //    console.log("Already logged in.");
   //    this.navCtrl.setRoot(ProductList);
   //  },
   //  (error) => {
   //    console.log("Not logged in yet");
   //  });

  }

  ionViewDidLoad() {
    this.nativeStorage.getItem("token").then((data) =>
    {
      console.log("Already logged in.");
      this.navCtrl.setRoot(ProductList).then((val) => {
        console.log(val);
      },
      err => console.log(err));
    },
    (error) => {
      console.log("Not logged in yet");
    });
  }

  doToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }

  doLogin() {
    if (!(this.password == "" && this.username != "" && !this.signup)) {
      this.user.login(this.username, this.password).subscribe(res => {
        console.log(res);
        this.response = res;
        if (this.response.status >= 400) {
          this.doToast(this.response.message);
        }
        if (this.response.status == 200) {
          this.nativeStorage.setItem("token", this.response.token).then(() => {
            this.navCtrl.setRoot(ProductList).then((val) => console.log(val),
              (err) => console.log(err));
          });
          
        }
      });
    }
    else {
      this.doToast("Please type your password");
    }

  }

  doSignup() {
    this.user.signup(this.username, this.fullname, this.email, this.password).subscribe(res => {
      console.log(res);
      this.response = res;
      if (this.response.status >= 400) {
        this.doToast(this.response.message);
      }
      else {
        this.doLogin();
      }
    });
  }

  toggleView() {
    this.signup = !this.signup;
  }


}
