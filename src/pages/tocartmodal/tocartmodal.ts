import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';

@Component({
  templateUrl: 'tocartmodal.html'
})

export class ToCartModal {

  products: any = [];

  constructor(public viewCtrl: ViewController, private navCtrl: NavController, private cart: CartProvider, private params: NavParams) {
    
  }

  async addToCart() {
    (await this.cart.addProductToCart(this.params.get("product_id"), this.user_product_qty)).subscribe(res => {
      this.viewCtrl.dismiss({ added: true});
    });
  }

  
  
}