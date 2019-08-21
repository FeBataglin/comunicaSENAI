import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private PATH = 'user/';

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    return this.db.list(this.PATH, ref => ref.orderByChild('name'))
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
 
  save(user: any) {
    return new Promise((resolve, reject) => {
      if (user.key) {
        this.db.list(this.PATH)
          .update(user.key, { name: user.name, lastname: user.lastname, email: user.email, password: user.password, confirmPassword: user.confirmPassword, chooseNotification: user.chooseNotification })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push({ name: user.name, lastname: user.lastname, email: user.email, password: user.password, confirmPassword: user.confirmPassword, chooseNotification: user.chooseNotification })
          .then(() => resolve());
      }
    })
  }
  
}
