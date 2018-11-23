import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ProductCreation } from '../productcreation/productcreation';
import { ProductDescription } from '../productdescription/productdescription';
import { ProductsProvider } from '../../../providers/products/products';
import { PopoverController } from 'ionic-angular';
import { MainMenu } from '../../../pages/mainmenu/mainmenu';

@Component({
  selector: 'productlist',
  templateUrl: 'productlist.html'
})
export class ProductList {

  search: string = "";
  productlist: any;
  response: any;
  showSearch: boolean = false;

  constructor(public navCtrl: NavController, private products: ProductsProvider, 
              private toastCtrl: ToastController, private popoverCtrl: PopoverController) {

    this.products.getAllProducts(this.search).subscribe(res => {
      this.response = res;
      this.productlist = this.response;
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

  showMenu(event) {
    let popover = this.popoverCtrl.create(MainMenu);
    popover.present({
      ev: event
    });
  }

  createProduct() {
    this.navCtrl.push(ProductCreation);
  }

  editProduct(product_id) {
    this.navCtrl.push(ProductDescription, { product_id: product_id });
  }

  getProducts() {
    this.products.getAllProducts(this.search).subscribe(res => {
      this.response = res;
      this.productlist = this.response;
    });
  }

  hideSearch() {
    this.showSearch = false;
    this.search = "";
    this.getProducts();
  }

  startSearch() {
    this.showSearch = true;
  }


}
