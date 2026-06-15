import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'recommend',
    loadComponent: () => import('./components/recommend/recommend.component').then(m => m.RecommendComponent)
  },
  {
    path: 'thingstodo',
    loadComponent: () => import('./components/thingstodo/thingstodo.component').then(m => m.ThingsTodoComponent)
  },
  {
    path: 'tour',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'car-rentals',
    loadComponent: () => import('./components/car-rentals/car-rentals.component').then(m => m.CarRentalsComponent)
  },
  {
    path: 'favorite',
    loadComponent: () => import('./components/favorite/favorite.component').then(m => m.FavoriteComponent)
  }
];
