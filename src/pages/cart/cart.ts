import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { NavParams, ModalController } from 'ionic-angular';
import { ProductsProvider } from '../../providers/products/products';
import { CommentsProvider } from '../../providers/comments/comments';
import { UserProvider } from '../../providers/user/user';
import { ImagePicker } from '@ionic-native/image-picker';
import { SaleModal } from '../../pages/salemodal/salemodal';
import { CartProvider} from '../../providers/cart/cart';

@Component({
  selector: 'cart',
  templateUrl: 'cart.html'
})
export class Cart {

  cartproducts: any = [];
  response: any;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, private products: ProductsProvider,
               private navParams: NavParams, private imagePicker: ImagePicker, private user: UserProvider, 
               private comments: CommentsProvider, private modalCtrl: ModalController, private cart: CartProvider) {
    this.getCart();
  }

  doToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }

  async getCart() {
    (await this.cart.getCart()).subscribe(res => {
      this.response = res;
      console.log(res);
      this.cartproducts = this.response.cart;
      for (let p of this.cartproducts) {
        p.units = [];
        for (var s = 1; s <= p.product_stock; s++) {
          p.units.push(s);
        }
      }
    });
  }

  async setQuantity(user_wishlist_id, user_product_qty) {
    (await this.cart.setCartQuantity(user_wishlist_id, parseInt(user_product_qty))).subscribe(res => {
      //Nothing here?
    });
  }

  async removeFromCart(product_id) {
    (await this.cart.deleteFromCart(product_id)).subscribe(res => {
      this.doToast("Product removed from cart successfully");
      this.getCart();
    });
  }

  processSale() {
    let saleModal = this.modalCtrl.create(SaleModal, { products: this.cartproducts });
    saleModal.onDidDismiss(data => {
      console.log(data);
      if (data.completed) {
        this.doToast("Done! Thank you for shopping!");
      }
    });
    saleModal.present();
  }

  async clearCart() {
    (await this.cart.clearCart()).subscribe(res => {
      this.doToast("All items were removed from your cart");
      this.getCart();
    });
  }


}
