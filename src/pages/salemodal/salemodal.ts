import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';

@Component({
  templateUrl: 'salemodal.html'
})

export class SaleModal {

  user_product_qty: number = 0;
  product_name: string = "";
  product_stock: number = 0;

  constructor(public viewCtrl: ViewController, private navCtrl: NavController, private cart: CartProvider, private params: NavParams) {
    this.product_name = this.params.get("product_name");
    this.product_stock = this.params.get("product_stock");
  }

  async buyProducts() {
    (await this.cart.buyProductsFromCart()).subscribe(res => {
      this.cart.clearCart();
      this.viewCtrl.dismiss({ completed: true});
    });
  }

  increaseQty() {
    this.user_product_qty++;
  }

  decreaseQty() {
    this.user_product_qty--;
  }  

  close() {
    this.viewCtrl.dismiss({ completed: false});
  }
  
}