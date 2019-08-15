import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  rootPage;
  public appPages = [
    {
      title: 'Início',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Favoritos',
      url: '/favorites',
      icon: 'star'
    },
    {
      title: 'Cadastro de Novidades',
      url: '/news',
      icon: 'md-paper'
    },
    {
      title: 'Configurações',
      url: '/config',
      icon: 'cog'
    },
  ];
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private platform: Platform
  ) { }
  
  logout() {
    firebase.auth().signOut().then(function() {
      console.log("Success to Signout")
    }).catch(function(error) {
      console.log("Fail to Signout")
    });
    this.router.navigateByUrl('/login');
  }
}