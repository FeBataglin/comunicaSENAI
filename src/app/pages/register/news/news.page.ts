import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NewsService } from 'src/app/providers/news/news.service';
import { ThfNotificationService } from '@totvs/thf-ui';
import { News } from 'src/app/models/news';
import { NavController } from '@ionic/angular';

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

  constructor(
    private formBuilder: FormBuilder,
    private service: NewsService,
    public navCtrl: NavController,
    private thfNotification: ThfNotificationService) {
    this.news = this.news || {};
    
    this.createNewsForm();
  }

  createNewsForm() {
    this.newsForm = this.formBuilder.group({
      key: [this.news.key],
      video: [this.news.video, Validators.required],
      image: [this.news.image, Validators.required],
      title: [this.news.title, Validators.required],
      resume: [this.news.resume, Validators.required],
      document: [this.news.document, Validators.required],
      segment: [this.news.segment]
    });
  }

  registerNews(news: News) {
    console.log(this.newsForm.value.video)
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
