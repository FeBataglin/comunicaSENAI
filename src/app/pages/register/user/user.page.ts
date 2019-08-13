import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, NavParams, ToastController } from '@ionic/angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/providers/user/user.service';
import { User } from '../../../models/user'
import { AngularFireAuth } from 'angularfire2/auth';
import { ThfNotificationService } from '@totvs/thf-ui';

@Component({
  selector: 'app-register',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  user: any;
  userForm: FormGroup;

  constructor(
    private afAuth: AngularFireAuth,
    public modalController: ModalController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private formBuilder: FormBuilder, 
    private service: UserService,
    private thfNotification: ThfNotificationService
  ) { 
    this.user = this.navParams.data.user || { };
    this.createUserForm();
  }

  createUserForm() {
    this.userForm = this.formBuilder.group({
      key: [this.user.key],
      name: [this.user.name, Validators.required],
      lastname: [this.user.lastname, Validators.required],
      email: [this.user.email, Validators.required],
      password: [this.user.password, Validators.required],
      confirmPassword: [this.user.confirmPassword, Validators.required],
      chooseNotification: [this.user.chooseNotification]
    });
  }

  registerUser(user: User) {

    const passwordsMatch = this.user.password === this.user.confirmPassword;

    if (this.userForm.valid) {
      if (!passwordsMatch) {
        this.thfNotification.error('As senhas não conferem.');
      } else {
        this.service.save(this.userForm.value)
          .then(async () => {
              const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
              console.log(result);
              this.thfNotification.success('Usuário salvo com sucesso.');
              this.navCtrl.pop();
              console.log(user)
          })
          .catch((e) => {
            this.thfNotification.error('Erro ao salvar usuário.');
            console.error(e);
          })
      }
    }
  }

  ngOnInit() {
  }

  // Dismiss Register Modal
  closeModal() {
    this.modalController.dismiss();
  }
}