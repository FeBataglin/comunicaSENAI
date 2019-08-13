import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private PATH = 'news/';

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    return this.db.list(this.PATH, ref => ref.orderByChild('date'))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
  }

  get(key: string) {
    return this.db.object(this.PATH + key).snapshotChanges()
      .map(c => {
        return { key: c.key, ...c.payload.val() };
      });
  }
  
  save(news: any) {
    return new Promise((resolve, reject) => {
      if (news.key) {
        this.db.list(this.PATH)
          .update(news.key, {
            video: news.video,
            image: news.image,
            title: news.title,
            resume: news.resume,
            document: news.document,
            segment: news.segment
          })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push({
            video: news.video,
            image: news.image,
            title: news.title,
            resume: news.resume,
            document: news.document,
            segment: news.segment
          })
          .then(() => resolve());
      }
    })
  }
}
