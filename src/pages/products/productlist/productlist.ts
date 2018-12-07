import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController, ModalController } from 'ionic-angular';
import { ProductCreation } from '../productcreation/productcreation';
import { ProductDescription } from '../productdescription/productdescription';
import { ProductsProvider } from '../../../providers/products/products';
import { UserProvider } from '../../../providers/user/user';
import { PopoverController } from 'ionic-angular';
import { MainMenu } from '../../../pages/mainmenu/mainmenu';
import { ToCartModal } from '../../../pages/tocartmodal/tocartmodal';
import { Cart } from '../../../pages/cart/cart';

@Component({
  selector: 'productlist',
  templateUrl: 'productlist.html'
})
export class ProductList {

  search: string = "";
  productlist: any = [];
  response: any;
  showSearch: boolean = false;
  user_id: number = 0;

  constructor(public navCtrl: NavController, private products: ProductsProvider, 
              private toastCtrl: ToastController, private popoverCtrl: PopoverController,
              public modalCtrl: ModalController, private user: UserProvider) {

    this.getProducts();
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

  async getProducts() {
    (await this.products.getAllProducts(this.search)).subscribe(async res => {
      this.response = res;
      this.productlist = this.response;
      await this.getUser();
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

  goToCart() {
    this.navCtrl.push(Cart);
  }

  addToCart(product_name, product_id, product_stock) {
    //this.doToast("Feature not yet implemented");
    let addModal = this.modalCtrl.create(ToCartModal, { product_name: product_name,
                                                            product_id: product_id,
                                                            product_stock: product_stock 
                                                          }
    );
    addModal.onDidDismiss(data => {
      console.log(data);
      if (data.added) {
        this.doToast("Product added to your cart");
      }
    });
    addModal.present();
  }

  async getUser() {
    (await this.user.getUserData()).subscribe(res => {
      this.response = res;
      this.user_id = this.response[0].user_id;
    });
  }


}
