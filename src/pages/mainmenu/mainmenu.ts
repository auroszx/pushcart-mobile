import { Component } from '@angular/core';
import { ViewController, NavController } from 'ionic-angular';
import { WelcomePage } from '../../pages/welcome/welcome';
import { UserInformation } from '../../pages/userinfo/userinfo';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  templateUrl: 'mainmenu.html'
})
export class MainMenu {
  constructor(public viewCtrl: ViewController, private navCtrl: NavController, private nativeStorage: NativeStorage) {}

  logout() {
    this.nativeStorage.remove("token");
    this.close();
    this.navCtrl.setRoot(WelcomePage);
  }

  goToUser() {
    this.navCtrl.push(UserInformation);
    this.close();
  }

  close() {
    this.viewCtrl.dismiss();
  }
}