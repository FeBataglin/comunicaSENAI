import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }, 
  { path: 'login', loadChildren: './pages/auth/login/login.module#LoginPageModule' },
  { path: 'userRegister', loadChildren: './pages/register/user/user.module#UserPageModule' },
  
  { path: 'home', loadChildren: './home/home.module#HomePageModule'},
  { path: 'list', loadChildren: './list/list.module#ListPageModule'},
  { path: 'config', loadChildren: './config/config.module#ConfigPageModule' },
  { path: 'favorites', loadChildren: './favorites/favorites.module#FavoritesPageModule' },
  { path: 'news', loadChildren: './pages/register/news/news.module#NewsPageModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}