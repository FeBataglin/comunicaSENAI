import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ThfModule } from '@totvs/thf-ui';
import { HomePage } from './home.page';
import { PipeModule } from '../pipe/PipeModule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipeModule.forRoot(),
    IonicModule,
    ThfModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage],
})
export class HomePageModule  {}
