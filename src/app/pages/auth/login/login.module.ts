import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule,  } from '@ionic/angular';
import { LoginPage } from './login.page';
import { ThfModule } from '@totvs/thf-ui';
import { UserPage } from '../../register/user/user.page';


const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ThfModule,
    ReactiveFormsModule
  ],
  declarations: [LoginPage, UserPage],
  entryComponents: [UserPage]
})

export class LoginPageModule {}
