import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteService, FavoriteItem } from '../../services/favorite.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50 dark:bg-[#121212] pt-24 pb-12">
      <div class="container mx-auto px-5 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="mb-10 animate-fade-in">
          <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2" style="font-family: 'Odor Mean Chey', serif;">My Favorites</h1>
          <p class="text-gray-600 dark:text-gray-400">Items you've saved for your next trip</p>
        </div>

        <!-- Empty State -->
        <div *ngIf="(favorites$ | async)?.length === 0" class="flex flex-col items-center justify-center py-20 text-center animate-pop-in">
          <div class="w-24 h-24 bg-gray-200 dark:bg-[#1e1e1e] rounded-full flex items-center justify-center mb-6">
            <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-2">No favorites yet</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-8 max-w-xs">Start exploring and save your favorite cars and travel packages here.</p>
          <a routerLink="/recommend" class="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-3 rounded-xl transition-all transform hover:scale-105 shadow-lg">
            Explore Destinations
          </a>
        </div>

        <!-- Favorites Grid -->
        <div *ngIf="(favorites$ | async) as favorites" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div *ngFor="let item of favorites" class="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-800 group animate-pop-in">
            <div class="relative h-48 overflow-hidden">
              <img [src]="item.image" [alt]="item.name" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              
              <!-- Remove Button -->
              <button (click)="removeFavorite(item)" class="absolute top-3 right-3 bg-white/90 dark:bg-black/50 p-2 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-md z-20">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </button>

              <div class="absolute bottom-3 left-3">
                <span class="px-2 py-1 bg-yellow-400 text-[10px] font-black uppercase rounded text-gray-900">{{ item.type }}</span>
              </div>
            </div>
            
            <div class="p-4">
              <h3 class="text-base font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">{{ item.name }}</h3>
              <p *ngIf="item.dates" class="text-xs text-gray-500 mb-3">{{ item.dates }}</p>
              <div class="flex justify-between items-center mt-4">
                <span class="text-lg font-black text-blue-600 dark:text-yellow-400">{{ item.price }}</span>
                <a [routerLink]="getItemLink(item)" class="text-xs font-bold text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">View Details →</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .animate-fade-in { animation: fadeIn 0.5s ease-out; }
    .animate-pop-in { animation: popIn 0.4s cubic-bezier(0.26, 0.53, 0.74, 1.48); }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes popIn { from { opacity: 0; transform: scale(0.9) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
  `]
})
export class FavoriteComponent implements OnInit {
  private favoriteService = inject(FavoriteService);
  favorites$ = this.favoriteService.favorites$;

  constructor() {}

  ngOnInit() {}

  removeFavorite(item: FavoriteItem) {
    this.favoriteService.toggleFavorite(item);
  }

  getItemLink(item: FavoriteItem): string {
    switch(item.type) {
      case 'car': return '/car-rentals';
      case 'bundle': return '/bundling';
      case 'destination': return '/recommend';
      default: return '/';
    }
  }
}
