import { Component } from '@angular/core';
import { ViewController, NavController } from 'ionic-angular';
import { WelcomePage } from '../../pages/welcome/welcome';
import { UserInformation } from '../../pages/userinfo/userinfo';

@Component({
  templateUrl: 'mainmenu.html'
})
export class MainMenu {
  constructor(public viewCtrl: ViewController, private navCtrl: NavController) {}

  logout() {
    localStorage.removeItem("token");
    this.navCtrl.setRoot(WelcomePage);
    this.close();
  }

  goToUser() {
    this.navCtrl.push(UserInformation);
    this.close();
  }

  close() {
    this.viewCtrl.dismiss();
  }
}