import { Component } from '@angular/core';
import { NavController, ViewController, NavParams, ToastController } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';

@Component({
  templateUrl: 'tocartmodal.html'
})

export class ToCartModal {

  user_product_qty: number = 0;
  product_name: string = "";
  product_stock: number = 0;

  constructor(public viewCtrl: ViewController, private navCtrl: NavController, private cart: CartProvider, 
              private params: NavParams, private toastCtrl: ToastController) {
    this.product_name = this.params.get("product_name");
    this.product_stock = this.params.get("product_stock");
  }

  async addToCart() {
    if (this.user_product_qty > 0) {
      (await this.cart.addProductToCart(this.params.get("product_id"), this.user_product_qty)).subscribe(res => {
        this.viewCtrl.dismiss({ added: true});
      });
    }
    else {
      this.doToast("You need to set a quantity");
    }
  }

  doToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }

  increaseQty() {
    this.user_product_qty++;
  }

  decreaseQty() {
    this.user_product_qty--;
  }  

  close() {
    this.viewCtrl.dismiss({ added: false});
  }
  
}