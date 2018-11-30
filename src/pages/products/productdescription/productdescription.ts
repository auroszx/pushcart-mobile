import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { NavParams, ModalController } from 'ionic-angular';
import { ProductsProvider } from '../../../providers/products/products';
import { CommentsProvider } from '../../../providers/comments/comments';
import { UserProvider } from '../../../providers/user/user';
import { ImagePicker } from '@ionic-native/image-picker';
import { ToCartModal } from '../../../pages/tocartmodal/tocartmodal';

@Component({
  selector: 'productdescription',
  templateUrl: 'productdescription.html'
})
export class ProductDescription {

  editing: Boolean = false;
  response: any;
  product_id: number;
  product_title: String;
  product_description: String;
  product_stock: number;
  product_image: any = "";
  commentlist = [];
  user_id: number = 0;
  product_user_id: number = -1;
  new_comment: string;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, private products: ProductsProvider,
               private navParams: NavParams, private imagePicker: ImagePicker, private user: UserProvider, 
               private comments: CommentsProvider, private modalCtrl: ModalController) {
    this.setProductInfo();
    this.getUser();
  }

  async sendComment() {
    (await this.comments.createComment(this.product_id, this.new_comment)).subscribe(async res => {
      this.response = res;
      console.log(res);
      this.new_comment = '';
      await this.getComments(this.product_id);
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

  async getUser() {
    (await this.user.getUserData()).subscribe(res => {
      this.response = res;
      this.user_id = this.response[0].user_id;
    });
  }

  async setProductInfo() {
    (await this.products.getProductDetail(this.navParams.get('product_id'))).subscribe(async res => {
      this.response = res;
      this.product_id = this.response[0].product_id;
      this.product_title = this.response[0].product_title;
      this.product_description = this.response[0].product_desc;
      this.product_image = this.response[0].product_image;
      this.product_stock = this.response[0].product_stock;
      this.product_user_id = this.response[0].user_id;
      await this.getComments(this.product_id);
    });
  }

  async getComments(product_id) {
    (await this.comments.getAllComments(product_id)).subscribe(res => {
      this.response = res;
      this.commentlist = this.response.comments;
    });
  }

  toggleEdit() {
    this.editing = !this.editing;
  }

  async deleteProduct() {
    (await this.products.deleteProduct(this.navParams.get('product_id'))).subscribe(res => {
      this.navCtrl.pop();
    });
  }

  async editProduct() {
    (await this.products.updateProduct(this.navParams.get('product_id'), this.product_title, this.product_description, this.product_image, this.product_stock)).subscribe(res => {
      this.toggleEdit();
    });
  }

  async deleteComment(product_comment_id) {
    (await this.comments.deleteComment(product_comment_id)).subscribe(async res => {
      console.log(res);
      await this.getComments(this.product_id);
      this.doToast("Comment removed successfully");
    });
  }

  pickImage() {
    this.imagePicker.hasReadPermission().then((hasPermission) => {
      if (hasPermission) {
        this.imagePicker.getPictures({ maximumImagesCount: 1, outputType: 1 }).then((results) => {
          for (var i = 0; i < results.length; i++) {
              this.product_image = 'data:image/jpeg;base64,' + results[i];
          }
        }, (err) => { console.log(err) });
      }
      else {
        this.imagePicker.requestReadPermission().then((result) => {
          if (result) {
            console.log(result);
            this.imagePicker.getPictures({ maximumImagesCount: 1, outputType: 1 }).then((results) => {
              for (var i = 0; i < results.length; i++) {
                  this.product_image = 'data:image/jpeg;base64,' + results[i];
              }
            }, (err) => { console.log(err) });
          }
        });
      }
        
    });
      
  }

  addToCart() {
    let profileModal = this.modalCtrl.create(ToCartModal, { product_name: this.navParams.get("product_name"), 
                                                            product_id: this.navParams.get("product_id"),
                                                            product_stock: this.navParams.get("product_stock")
                                                          }
    );
    profileModal.onDidDismiss(data => {
      console.log(data);
      if (data.added) {
        this.doToast("Product added to your cart");
      }
    });
    profileModal.present();
  }


}
