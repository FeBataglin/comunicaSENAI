import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private PATH = 'news/';

  constructor(private db: AngularFireDatabase, public afs: AngularFirestore, private sanitizer: DomSanitizer) { }

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

  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux:any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;
  };

  uploadImage(imageURI, randomId){
    return new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child('image').child(randomId);
      this.encodeImageUri(imageURI, function(image64){
        imageRef.putString(image64, 'data_url')
        .then(snapshot => {
          snapshot.ref.getDownloadURL()
          .then(res => resolve(res))
        }, err => {
          reject(err);
        })
      })
    })
  }
}
