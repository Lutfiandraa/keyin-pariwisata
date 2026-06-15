import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hotel, HotelWithImage, DestinationService } from '../../services/destination.service';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-hotel-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white dark:bg-[#252526] rounded-2xl shadow-xl overflow-hidden card-hover animate-pop-in border border-gray-100 dark:border-gray-800 flex flex-col h-full">
      <div class="h-48 overflow-hidden relative group bg-gray-200 dark:bg-gray-800">
        
        <div *ngIf="!hotel.imageUrl" class="absolute inset-0 bg-[#e0e0e0] flex items-center justify-center">
          <span class="text-[#757575] font-bold text-center px-2">{{ getHotelName() }}</span>
        </div>
        <img *ngIf="hotel.imageUrl" [src]="hotel.imageUrl" [alt]="getHotelName()" class="w-full h-full object-cover image-zoom relative z-10">
        
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
        
        <!-- Favorite Button -->
        <button (click)="toggleFavorite($event)" 
                class="absolute top-3 right-3 z-20 p-2 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg"
                [class]="isFavorite() ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-400 hover:text-red-500'">
          <svg class="w-4 h-4" [class.fill-current]="isFavorite()" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" stroke-width="2"/></svg>
        </button>

        <div class="absolute bottom-4 left-4 z-20">
          <h3 class="text-white font-bold text-lg drop-shadow-lg leading-tight line-clamp-2">{{ getHotelName() }}</h3>
        </div>
      </div>
      <div class="p-4 lg:p-5 flex flex-col flex-1">
        <div class="flex justify-between items-start mb-4">
          <span class="text-sm text-gray-600 dark:text-gray-400 font-medium">{{ getRegionLabel() }}</span>
          
          <div class="flex items-center" *ngIf="hotel.stars">
            <svg class="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <span class="text-xs ml-1 font-bold dark:text-white">{{ hotel.stars }}</span>
          </div>
          <div *ngIf="!hotel.stars" class="text-[10px] text-gray-500 font-semibold bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">Belum Terverifikasi</div>
        </div>
        
        <div class="mt-auto pt-4">
          <button (click)="onOpenModal()" class="w-full bg-gray-100 dark:bg-[#3e3e42] text-gray-900 dark:text-gray-100 font-semibold py-2.5 rounded-lg text-sm transition-all hover:bg-gray-200">Detail</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card-hover { transition: all 0.3s ease; }
    .card-hover:hover { transform: translateY(-5px); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
    .image-zoom { transition: transform 0.7s ease; }
    .card-hover:hover .image-zoom { transform: scale(1.1); }
    @keyframes popIn { 0% { opacity: 0; transform: scale(0.95); } 100% { opacity: 1; transform: scale(1); } }
    .animate-pop-in { animation: popIn 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
  `]
})
export class HotelCardComponent {
  @Input() hotel!: HotelWithImage;
  @Output() openModal = new EventEmitter<Hotel>();

  constructor(
    private favoriteService: FavoriteService,
    private destinationService: DestinationService
  ) {}

  getHotelName(): string {
    return this.hotel?.name || this.hotel?.brand || 'Hotel Tidak Diketahui';
  }

  getRegionLabel(): string {
    if (!this.hotel) return '';
    return this.destinationService.getRegionLabel(this.hotel.region);
  }

  toggleFavorite(event: MouseEvent) {
    event.stopPropagation();
    this.favoriteService.toggleFavorite(this.hotel);
  }

  isFavorite(): boolean {
    return this.favoriteService.isFavorite(this.hotel);
  }

  onOpenModal() {
    this.openModal.emit(this.hotel);
  }
}
