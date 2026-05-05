import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinationService, Destination } from '../../services/destination.service';
import { DestinationModalComponent } from '../destination-modal/destination-modal.component';
import { FavoriteService } from '../../services/favorite.service';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recommend',
  standalone: true,
  imports: [CommonModule, DestinationModalComponent, RouterModule],
  template: `
    <div class="relative min-h-screen bg-gray-50 dark:bg-[#121212]">
      <!-- Content Overlay -->
      <div class="relative z-10 min-h-screen flex flex-col">
        <!-- Title Section with Animation -->
        <div class="pt-20 sm:pt-24 pb-6 sm:pb-8 px-6 sm:px-8 lg:px-12 animate-fade-in-up">
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-tight text-gray-900 dark:text-gray-100" 
              style="font-family: 'Odor Mean Chey', serif;">
            Recommended
          </h1>
          <p class="text-gray-500 dark:text-gray-400 mt-2">Discover our handpicked destinations for your next adventure</p>
        </div>

        <!-- Tour Cards Section -->
        <div class="flex-1 flex items-start justify-start px-5 sm:px-6 md:px-8 lg:px-12 pb-12 sm:pb-16 lg:pb-20">
          <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6 lg:gap-8 w-full">
            <div *ngFor="let tour of tours; let i = index" 
                 class="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-xl overflow-hidden card-hover animate-pop-in border border-gray-100 dark:border-gray-800" 
                 [class]="'stagger-' + (i + 1)"
                 style="opacity: 0; animation-fill-mode: forwards;">
              <div class="h-[140px] sm:h-[160px] md:h-[180px] lg:h-[200px] overflow-hidden relative group">
                <img [src]="tour.image" [alt]="tour.name" class="w-full h-full object-cover image-zoom">
                <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                
                <!-- Favorite Button -->
                <button (click)="toggleFavorite(tour, $event)" 
                        class="absolute top-2 right-2 z-20 p-1.5 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg"
                        [class]="isFavorite(tour) ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-400 hover:text-red-500'">
                  <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" [class.fill-current]="isFavorite(tour)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                </button>
              </div>
              <div class="p-3 sm:p-4 bg-white dark:bg-[#1e1e1e]">
                <h3 class="text-sm sm:text-base font-bold text-gray-900 dark:text-gray-100 tracking-tight line-clamp-1 mb-1">{{ tour.name }}</h3>
                <p class="text-[10px] text-gray-500 mb-3">{{ tour.duration }} • {{ tour.price }}</p>
                <div class="flex flex-col gap-2">
                  <button (click)="openDestinationModal(tour.name)" class="w-full bg-gray-100 dark:bg-[#2d2d30] text-gray-900 dark:text-gray-100 font-semibold py-1.5 rounded-lg text-xs transition-all hover:bg-gray-200">
                    Details
                  </button>
                  <button (click)="bookNowDirect(tour)" class="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 rounded-lg text-xs transition-all transform hover:scale-105 shadow-md">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- See More Button -->
        <div class="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-20">
          <button routerLink="/bundling" class="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-110 shadow-2xl active:scale-95">
            see more
          </button>
        </div>
      </div>

      <!-- Bill / Receipt Modal -->
      <div *ngIf="billDetails" class="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
        <div class="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-pop-in border border-gray-200 dark:border-gray-800">
          <div class="bg-yellow-400 p-6 text-center">
            <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg class="w-10 h-10 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke-width="3"/></svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-900">Booking Summary</h2>
            <p class="text-gray-800/80 text-sm font-medium">KeyIn Travel Receipt</p>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div class="flex justify-between items-start pb-4 border-b border-gray-100 dark:border-gray-800">
                <div>
                  <p class="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Destination</p>
                  <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">{{ billDetails.name }}</h3>
                  <p class="text-xs text-gray-500 mt-1">{{ billDetails.dates }}</p>
                </div>
                <div class="text-right">
                  <p class="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Reference</p>
                  <p class="text-sm font-mono font-bold text-yellow-600">#TRV-{{ bookingRef }}</p>
                </div>
              </div>
              <div class="space-y-3 pt-2">
                <div class="flex justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Base Price</span><span class="font-semibold dark:text-gray-100">{{ billDetails.price }}</span></div>
                <div class="flex justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Service Fee (5%)</span><span class="font-semibold dark:text-gray-100">{{ billDetails.fee }}</span></div>
                <div class="pt-4 mt-2 border-t-2 border-dashed border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <span class="text-lg font-bold dark:text-gray-100">Total Bill</span>
                  <span class="text-2xl font-black text-yellow-500">{{ billDetails.total }}</span>
                </div>
              </div>
            </div>
            <div class="mt-8 flex flex-col gap-2">
              <button (click)="confirmPayment()" class="w-full bg-gray-900 dark:bg-yellow-400 text-white dark:text-gray-900 font-bold py-3 rounded-xl shadow-xl transition-all">Confirm & Pay</button>
              <button (click)="billDetails = null" class="w-full text-gray-500 text-sm font-semibold py-2">Close</button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Destination Modal -->
      <app-destination-modal [destination]="selectedDestination" (close)="closeModal()" (book)="onBookTour()"></app-destination-modal>
    </div>
  `,
  styleUrl: './recommend.component.css'
})
export class RecommendComponent {
  selectedDestination: Destination | null = null;
  billDetails: any = null;
  bookingRef: string = '';

  constructor(
    private destinationService: DestinationService,
    public favoriteService: FavoriteService
  ) {}

  confirmPayment() {
    alert('Unable to continue Confirm & Pay, your balance is 0');
    this.billDetails = null;
  }

  toggleFavorite(tour: any, event: MouseEvent) {
    event.stopPropagation();
    this.favoriteService.toggleFavorite({
      id: tour.id,
      name: tour.name,
      price: tour.price,
      image: tour.image,
      type: 'destination',
      dates: tour.duration
    });
  }

  isFavorite(tour: any): boolean {
    return this.favoriteService.isFavorite(tour.id, 'destination');
  }

  onBookTour() {
    if (this.selectedDestination) {
      const tour = this.tours.find(t => t.name === this.selectedDestination?.name);
      this.bookNowDirect(tour || { name: this.selectedDestination.name, price: '$2,500', duration: 'Flexible' });
      this.selectedDestination = null;
    }
  }

  bookNowDirect(tour: any) {
    const priceNum = parseFloat(tour.price.replace(/[^0-9.]/g, '')) || 2500;
    const fee = (priceNum * 0.05).toFixed(2);
    const total = (priceNum + parseFloat(fee)).toLocaleString();
    
    this.billDetails = {
      name: tour.name,
      price: tour.price,
      dates: tour.duration || 'Selected Dates',
      fee: '$' + fee,
      total: '$' + total
    };
    this.bookingRef = Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  openDestinationModal(destinationName: string) {
    this.selectedDestination = this.destinationService.getDestinationByName(destinationName) || null;
  }

  closeModal() { this.selectedDestination = null; }

  tours = [
    { id: 1, name: 'Mecca', price: '$2,500', duration: '10 Days Trip', image: 'assets/kabah.png' },
    { id: 2, name: 'Georgia', price: '$1,800', duration: '10 Days Trip', image: 'assets/georgia.png' },
    { id: 3, name: 'Russia', price: '$2,200', duration: '10 Days Trip', image: 'assets/rusia.png' },
    { id: 4, name: 'Spain', price: '$3,100', duration: '10 Days Trip', image: 'assets/Spain.png' },
    { id: 5, name: 'Swiss', price: '$4,200', duration: '10 Days Trip', image: 'assets/swiss.png' },
    { id: 6, name: 'Turkey', price: '$1,900', duration: '10 Days Trip', image: 'assets/tukery.png' },
    { id: 7, name: 'Cotswold', price: '$2,400', duration: '10 Days Trip', image: 'assets/cotswold.jpg' },
    { id: 8, name: 'Denmark', price: '$2,800', duration: '10 Days Trip', image: 'assets/denmark.jpg' },
    { id: 9, name: 'Al - Ula', price: '$3,200', duration: '10 Days Trip', image: 'assets/al-ula.png' },
    { id: 10, name: 'Palestine', price: '$2,100', duration: '10 Days Trip', image: 'assets/palestine.png' },
    { id: 11, name: 'Palm Jumeirah', price: '$5,200', duration: '10 Days Trip', image: 'assets/palmjumeira.png' },
    { id: 12, name: 'Egypt', price: '$1,700', duration: '10 Days Trip', image: 'assets/egypt.png' },
    { id: 13, name: 'Monaco', price: '$6,500', duration: '10 Days Trip', image: 'assets/monaco.png' }
  ];
}
