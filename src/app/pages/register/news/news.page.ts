import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NewsService } from 'src/app/providers/news/news.service';
import { ThfNotificationService } from '@totvs/thf-ui';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { News } from 'src/app/models/news';
import firebase from 'firebase';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})

export class NewsPage implements OnInit {

  ngOnInit(): void {
  }

  news: any;
  newsForm: FormGroup;
  image: any;

  constructor(
    private formBuilder: FormBuilder,
    private service: NewsService,
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    private thfNotification: ThfNotificationService,
    public loadingCtrl: LoadingController,
    public router: Router,
    private sanitizer: DomSanitizer) {
    this.news = this.news || {};
    this.createNewsForm();
  }
  
  createNewsForm() {
    this.newsForm = this.formBuilder.group({
      key: [this.news.key],
      video: [this.news.video],
      image: [this.news.image],
      title: [this.news.title, Validators.required],
      resume: [this.news.resume, Validators.required],
      document: [this.news.document, Validators.required],
      segment: [this.news.segment, Validators.required]
    });
  }

  registerNews(news: News) {
    if (this.newsForm.valid) {
      this.service.save(this.newsForm.value)
        .then(async () => {
          this.thfNotification.success('Novidade salva com sucesso.');
          this.navCtrl.pop();
        })
        .catch((e) => {
          this.thfNotification.error('Erro ao salvar novidade.');
          console.error(e);
        })
    }
  }
  

}
