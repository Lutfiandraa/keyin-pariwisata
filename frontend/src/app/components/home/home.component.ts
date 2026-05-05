import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DestinationService, Destination } from '../../services/destination.service';
import { DestinationModalComponent } from '../destination-modal/destination-modal.component';
import { FavoriteService } from '../../services/favorite.service';
import { PlaceholderService } from '../../services/placeholder.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, DestinationModalComponent],
  template: `
    <div class="relative min-h-screen bg-gray-50 dark:bg-[#1e1e1e]">
      <!-- Hero Section -->
      <div class="relative h-[600px] sm:h-[500px] md:h-[550px] lg:h-[600px] overflow-hidden">
        <div class="absolute inset-0 bg-cover bg-center bg-no-repeat" [style.background-image]="'url(assets/default.png)'" style="transform: scale(1.1);">
          <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
        </div>
        <div class="relative z-10 h-full flex flex-col items-center justify-center px-5 py-8">
          <div class="w-full max-w-4xl animate-fade-in-up">
            <div class="flex justify-center mb-4">
              <img src="assets/KeyInLogo.png" alt="KeyIn Logo" class="h-32 sm:h-40 lg:h-48 w-auto">
            </div>
            <p class="text-white/90 text-center text-lg mb-10 drop-shadow">Discover the World's Grandeur with Key-In.</p>
            <!-- Search Bar -->
            <div class="bg-white dark:bg-[#252526] rounded-2xl shadow-2xl p-6">
              <div class="flex flex-col md:flex-row gap-5">
                <div class="flex-1">
                  <label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Destination</label>
                  <input type="text" [(ngModel)]="searchQuery" (keyup.enter)="onSearch()" [placeholder]="(placeholderService.currentPlaceholder$ | async) || 'Where are you going?'" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-gray-100 transition-all duration-300">
                </div>
                <div class="flex items-end">
                  <button (click)="onSearch()" class="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-3 rounded-lg transition-all shadow-lg">Search</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="container mx-auto px-5 sm:px-6 lg:px-8 py-16">
        <div class="mb-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Popular Destinations</h2>
          <p class="text-gray-600 dark:text-gray-400">Handpicked locations just for you</p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          <div *ngFor="let tour of tours; let i = index" 
               class="bg-white dark:bg-[#252526] rounded-2xl shadow-xl overflow-hidden card-hover animate-pop-in" 
               [class]="'stagger-' + (i + 1)"
               style="opacity: 0; animation-fill-mode: forwards;">
            <div class="h-48 overflow-hidden relative group">
              <img [src]="tour.image" [alt]="tour.name" class="w-full h-full object-cover image-zoom">
              <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              
              <!-- Favorite Button -->
              <button (click)="toggleFavorite(tour, $event)" 
                      class="absolute top-3 right-3 z-20 p-2 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg"
                      [class]="isFavorite(tour) ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-400 hover:text-red-500'">
                <svg class="w-4 h-4" [class.fill-current]="isFavorite(tour)" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" stroke-width="2"/></svg>
              </button>

              <div class="absolute bottom-4 left-4">
                <h3 class="text-white font-bold text-xl drop-shadow-lg">{{ tour.name }}</h3>
              </div>
            </div>
            <div class="p-4 lg:p-5">
              <div class="flex justify-between items-center mb-4">
                <span class="text-lg font-black text-blue-600 dark:text-yellow-400">{{ tour.price }}</span>
                <span class="text-xs text-gray-500">{{ tour.duration }}</span>
              </div>
              <div class="flex gap-2">
                <button (click)="openDestinationModal(tour.name)" class="flex-1 bg-gray-100 dark:bg-[#3e3e42] text-gray-900 dark:text-gray-100 font-semibold py-2 rounded-lg text-xs transition-all hover:bg-gray-200">Details</button>
                <button (click)="bookNowDirect(tour)" class="flex-[2] bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 rounded-lg text-xs transition-all transform hover:scale-105 shadow-md">Book Now</button>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-12 text-center">
          <button routerLink="/recommend" class="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-3 rounded-lg transition-all shadow-lg">See More Destinations</button>
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
  styleUrl: './home.component.css'
})
export class HomeComponent {
  confirmPayment() {
    alert('Unable to continue Confirm & Pay, your balance is 0');
    this.billDetails = null;
  }
  searchQuery: string = '';
  selectedDestination: Destination | null = null;
  billDetails: any = null;
  bookingRef: string = '';

  constructor(
    private destinationService: DestinationService,
    public favoriteService: FavoriteService,
    public placeholderService: PlaceholderService
  ) {}

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

  onSearch() {
    const destination = this.destinationService.getDestinationByName(this.searchQuery);
    if (destination) {
      this.selectedDestination = destination;
    } else {
      window.location.href = '/recommend';
    }
  }

  openDestinationModal(name: string) {
    this.selectedDestination = this.destinationService.getDestinationByName(name) || null;
  }

  closeModal() { this.selectedDestination = null; }

  tours = [
    { id: 1, name: 'Manhattan Penthouse', price: '$4,500', duration: '10 Days Trip', image: 'assets/manhattan.png' },
    { id: 2, name: 'Al - Ula', price: '$3,200', duration: '10 Days Trip', image: 'assets/al-ula.png' },
    { id: 3, name: 'Palestine', price: '$2,800', duration: '10 Days Trip', image: 'assets/palestine.png' },
    { id: 4, name: 'Palm Jumeirah', price: '$5,500', duration: '10 Days Trip', image: 'assets/palmjumeira.png' }
  ];
}
