import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ProductsProvider } from '../../../providers/products/products';

@Component({
  selector: 'productcreation',
  templateUrl: 'productcreation.html'
})
export class ProductCreation {

  response: any;
  product_title: String = "";
  product_description: String = "";
  product_image: String = "";
  product_stock: String = "";

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, private products: ProductsProvider) {

  }

  doToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }

  createProduct() {
    this.products.createProduct(this.product_title, this.product_description).subscribe(res => {
      if (this.response.status >= 400) {
        this.doToast(this.response.message);
      }
      if (this.response.status == 200) {
        this.navCtrl.pop();
      }
    });
  }


}