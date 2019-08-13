import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ThfModule } from '@totvs/thf-ui';
import { IonicModule } from '@ionic/angular';
import { NewsPage } from './news.page';

const routes: Routes = [
  {
    path: '',
    component: NewsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThfModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [NewsPage]
})
export class NewsPageModule {}
