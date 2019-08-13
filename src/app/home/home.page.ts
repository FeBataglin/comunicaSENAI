import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { DomSanitizer } from '@angular/platform-browser';
import { NewsService } from '../providers/news/news.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage implements OnInit { 

  public news;

  constructor(private db: NewsService, private dom: DomSanitizer) {
    this.news = this.db.getAll();
  }

  ngOnInit(): void {
  }
}
