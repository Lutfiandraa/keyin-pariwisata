import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteService } from '../../services/favorite.service';
import { DestinationService, Hotel, HotelWithImage } from '../../services/destination.service';
import { RouterModule } from '@angular/router';
import { DestinationModalComponent } from '../destination-modal/destination-modal.component';
import { HotelCardComponent } from '../hotel-card/hotel-card.component';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [CommonModule, RouterModule, DestinationModalComponent, HotelCardComponent],
  template: `
    <div class="min-h-screen bg-gray-50 dark:bg-[#121212] pt-24 pb-12">
      <div class="container mx-auto px-5 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="mb-10 animate-fade-in">
          <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2" style="font-family: 'Odor Mean Chey', serif;">Favorit Saya</h1>
          <p class="text-gray-600 dark:text-gray-400">Daftar hotel yang telah Anda simpan</p>
        </div>

        <!-- Empty State -->
        <div *ngIf="(favorites$ | async)?.length === 0" class="flex flex-col items-center justify-center py-20 text-center animate-pop-in">
          <div class="w-24 h-24 bg-gray-200 dark:bg-[#1e1e1e] rounded-full flex items-center justify-center mb-6">
            <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
          </div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Belum ada destinasi favorit</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-8 max-w-xs">Jelajahi hotel dan tambahkan ke favorit!</p>
          <a routerLink="/recommend" class="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-3 rounded-xl transition-all transform hover:scale-105 shadow-lg">
            Jelajahi Destinasi
          </a>
        </div>

        <!-- Favorites Grid -->
        <div *ngIf="(favorites$ | async) as favorites" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          <app-hotel-card *ngFor="let hotel of hotelsWithImage" [hotel]="hotel" (openModal)="openDestinationModal($event)"></app-hotel-card>
        </div>
      </div>
      
      <!-- Destination Modal -->
      <app-destination-modal [hotel]="selectedHotel" (close)="closeModal()"></app-destination-modal>
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
  private destinationService = inject(DestinationService);
  
  favorites$ = this.favoriteService.favorites$;
  hotelsWithImage: HotelWithImage[] = [];
  selectedHotel: Hotel | null = null;

  ngOnInit() {
    this.favorites$.subscribe(favs => {
      // Syncing favorites with local array to attach images
      this.hotelsWithImage = favs.map(f => {
        const existing = this.hotelsWithImage.find(h => h.name === f.name && h.latitude === f.latitude);
        if (existing) {
          return existing;
        } else {
          const newHotel: HotelWithImage = { ...f };
          
          // Legacy car fallback for previously saved items
          if (!newHotel.imageUrl && newHotel.latitude >= 1 && newHotel.latitude <= 5 && newHotel.longitude === newHotel.latitude) {
            const cars = [
              { id: 1, name: 'Mercedes-Benz Sprinter', image: 'assets/sprinter.png' },
              { id: 2, name: 'Mercedes-Benz V Class', image: 'assets/vclass.png' },
              { id: 3, name: 'Hyundai Staria', image: 'assets/staria.png' },
              { id: 4, name: 'Mercedes-Benz S Class', image: 'assets/sclass.png' },
              { id: 5, name: 'BMW 720', image: 'assets/bmw720.png' }
            ];
            const car = cars.find(c => c.id === newHotel.latitude);
            if (car) newHotel.imageUrl = car.image;
          }

          if (!newHotel.imageUrl) {
            this.destinationService.fetchImage(newHotel);
          }
          return newHotel;
        }
      });
    });
  }

  openDestinationModal(hotel: Hotel) {
    this.selectedHotel = hotel;
  }

  closeModal() {
    this.selectedHotel = null;
  }
}
