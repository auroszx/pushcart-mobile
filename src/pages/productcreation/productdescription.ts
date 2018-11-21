import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { ProductsProvider } from '../../providers/products/products';

@Component({
  selector: 'productdescription',
  templateUrl: 'productdescription.html'
})
export class ProductDescription {

  editing: Boolean = false;
  response: any;
  product_title: String;
  product_description: String;
  product_image: String;
  product_stock: String;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, private products: ProductsProvider, private navParams: NavParams) {
    this.products.getProductDescription(this.navParams.get('product_id')).subscribe(res => {
      this.response = res;
      this.product_title = this.response[0].product_title;
      this.product_description = this.response[0].product_description;
      this.product_image = this.response[0].product_image;
      this.product_stock = this.response[0].product_stock;
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

  deleteProduct() {
    this.products.deleteProduct(this.navParams.get('product_id')).subscribe(res => {
      this.navCtrl.pop();
    });
  }

  editProduct() {
    this.products.updateProduct(this.navParams.get('product_id'), this.product_title, this.product_description, this.product_image, this.product_stock).subscribe(res => {
      this.toggleEdit();
    });
  }


}