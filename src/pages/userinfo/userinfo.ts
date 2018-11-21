import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { WelcomePage } from '../welcome/welcome';

@Component({
  selector: 'userinfo',
  templateUrl: 'userinfo.html'
})
export class UserInformation {

  editing: Boolean = false;
  response: any;
  user_username: String;
  user_fullname: String;
  user_email: String;
  user_password: String = "";

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, private user: UserProvider, private navParams: NavParams) {
    this.user.getUserData().subscribe(res => {
      this.response = res;
      this.user_username = this.response[0].user_username;
      this.user_fullname = this.response[0].user_fullname;
      this.user_email = this.response[0].user_email;
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

  toggleEdit() {
    this.editing = !this.editing;
  }

  deleteUser() {
    this.user.deleteUser().subscribe(res => {
      this.navCtrl.setRoot(WelcomePage);
    });
  }

  editNote() {
    this.user.updateUser(this.user_username, this.user_fullname, this.user_email, this.user_password).subscribe(res => {
      this.toggleEdit();
    });
  }



  


}
