import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserPage } from '../../register/user/user.page';
import { User } from '../../../models/user';
import * as firebase from 'firebase';
import { ThfNotificationService } from '@totvs/thf-ui';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {} as User;
  loginForm: FormGroup;
  toast: any; 

  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder, 
    private modalController: ModalController,
    private toastController: ToastController,
    private thfNotification: ThfNotificationService
  ) { 
    this.createLoginForm();
  }

  ngOnInit() {
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: [this.user.email, Validators.required],
      password: [this.user.password, Validators.required]
    });
  }

  // Dismiss Login Modal
  dismissLogin() {
    this.modalController.dismiss();
  }

  loginUser(user: User) {
    
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(data => {
          this.navCtrl.navigateRoot('home');
    })
    .catch((error) => {
      this.thfNotification.error('Por favor, verifique seu login/senha.')
    })
  }

  // On Register button tap, dismiss login modal and open register modal
  async register() {
   const registerModal = await this.modalController.create({
      component: UserPage
    });
    return await registerModal.present();
  }
}