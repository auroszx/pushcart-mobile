import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ProductCreation } from '../productcreation/productcreation';
import { ProductDescription } from '../productdescription/productdescription';
import { WelcomePage } from '../welcome/welcome';
import { ProductsProvider } from '../../providers/products/products';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'productlist',
  templateUrl: 'productlist.html'
})
export class ProductList {

  notelist: any;
  response: any;
  fullname: string;

  constructor(public navCtrl: NavController, private products: ProductsProvider, private toastCtrl: ToastController, private user: UserProvider) {
    this.user.getUserData().subscribe(res => {
      this.response = res;
      this.fullname = this.response[0].user_fullname;

      this.products.getAllProducts().subscribe(res => {
        this.response = res;
        this.notelist = this.response;
      });
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

  ionViewWillEnter(){
    this.getProducts();
  }


  createProduct() {
    this.navCtrl.push(ProductCreation);
  }

  editProduct(product_id) {
    this.navCtrl.push(ProductDescription, { product_id: product_id });
  }

  logout() {
    localStorage.removeItem("token");
    this.navCtrl.setRoot(WelcomePage)
  }

  getProducts() {
    this.products.getAllProducts().subscribe(res => {
      this.response = res;
      this.productlist = this.response;
    });
  }

  deleteProducto(producto_id) {
    this.products.deleteProduct(product_id).subscribe(res => {
      this.getProducts();
    });
  }


}
