import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarModalComponent, Car } from '../car-modal/car-modal.component';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-car-rentals',
  standalone: true,
  imports: [CommonModule, CarModalComponent],
  template: `
    <div class="relative min-h-screen overflow-hidden">
      <!-- Background Image with Overlay -->
      <div 
        class="fixed inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out"
        style="background-image: url(assets/default.png); transform: scale(1.05);">
        <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30"></div>
      </div>

      <!-- Content Overlay -->
      <div class="relative z-10 min-h-screen flex flex-col">
        <!-- Title Section with Animation -->
        <div class="pt-20 sm:pt-24 pb-6 sm:pb-8 px-6 sm:px-8 lg:px-12 animate-fade-in-up">
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal leading-tight text-white drop-shadow-lg" 
              style="font-family: 'Odor Mean Chey', serif; text-shadow: 0 2px 10px rgba(0,0,0,0.3);">
            Car Rentals
          </h1>
        </div>

        <!-- Car Cards Section -->
        <div class="flex-1 flex items-start justify-start px-5 sm:px-6 md:px-8 lg:px-12 pb-12 sm:pb-16 lg:pb-20">
          <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6 lg:gap-8 w-full">
            <div *ngFor="let car of cars; let i = index" 
                 class="bg-white dark:bg-[#252526] rounded-2xl shadow-2xl overflow-hidden card-hover animate-pop-in" 
                 [class]="'stagger-' + (i + 1)"
                 style="opacity: 0; animation-fill-mode: forwards;">
              <div class="h-[140px] sm:h-[160px] md:h-[180px] lg:h-[200px] overflow-hidden relative group">
                <img [src]="car.image" [alt]="car.name" class="w-full h-full object-cover image-zoom">
                <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                
                <!-- Favorite Button -->
                <button (click)="toggleFavorite(car, $event)" 
                        class="absolute top-2 right-2 z-20 p-1.5 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg"
                        [class]="isFavorite(car) ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-400 hover:text-red-500'">
                  <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" [class.fill-current]="isFavorite(car)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                </button>
              </div>
              <div class="p-3 sm:p-4 bg-white dark:bg-[#252526]">
                <h3 class="text-sm sm:text-base font-bold text-gray-900 dark:text-gray-100 tracking-tight line-clamp-1 mb-1">{{ car.name }}</h3>
                <p class="text-[10px] text-gray-500 mb-3">{{ car.price }} / day</p>
                <div class="flex flex-col gap-2">
                  <button (click)="openCarModal(car.id)" class="w-full bg-gray-100 dark:bg-[#3e3e42] text-gray-900 dark:text-gray-100 font-semibold py-1.5 rounded-lg text-xs transition-all hover:bg-gray-200">
                    Details
                  </button>
                  <button (click)="bookNowDirect(car)" class="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 rounded-lg text-xs transition-all transform hover:scale-105 shadow-md">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bill / Receipt Modal (Integrated directly) -->
      <div *ngIf="billDetails" class="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
        <div class="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-pop-in border border-gray-200 dark:border-gray-800">
          <div class="bg-yellow-400 p-6 text-center">
            <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg class="w-10 h-10 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" stroke-width="3"/></svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-900">Rental Bill</h2>
            <p class="text-gray-800/80 text-sm font-medium">KeyIn Car Hire Receipt</p>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div class="flex justify-between items-start pb-4 border-b border-gray-100 dark:border-gray-800">
                <div>
                  <p class="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Vehicle</p>
                  <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">{{ billDetails.name }}</h3>
                  <p class="text-xs text-gray-500 mt-1">Rental Duration: 1 Day</p>
                </div>
                <div class="text-right">
                  <p class="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Reference</p>
                  <p class="text-sm font-mono font-bold text-yellow-600">#CAR-{{ bookingRef }}</p>
                </div>
              </div>
              <div class="space-y-3 pt-2">
                <div class="flex justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Daily Rate</span><span class="font-semibold dark:text-gray-100">{{ billDetails.price }}</span></div>
                <div class="flex justify-between text-sm"><span class="text-gray-600 dark:text-gray-400">Service Fee (5%)</span><span class="font-semibold dark:text-gray-100">{{ billDetails.fee }}</span></div>
                <div class="pt-4 mt-2 border-t-2 border-dashed border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <span class="text-lg font-bold dark:text-gray-100">Total Bill</span>
                  <span class="text-2xl font-black text-yellow-500">{{ billDetails.total }}</span>
                </div>
              </div>
            </div>
            <div class="mt-8 flex flex-col gap-2">
              <button (click)="confirmPayment()" class="w-full bg-gray-900 dark:bg-yellow-400 text-white dark:text-gray-900 font-bold py-3 rounded-xl shadow-xl transition-all hover:scale-[1.02]">Confirm & Pay</button>
              <button (click)="billDetails = null" class="w-full text-gray-500 text-sm font-semibold py-2">Cancel</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Car Modal -->
      <app-car-modal [car]="selectedCar" (close)="closeModal()" (book)="onBookCar()"></app-car-modal>
    </div>
  `,
  styleUrl: './car-rentals.component.css'
})
export class CarRentalsComponent {
  confirmPayment() {
    alert('Unable to continue Confirm & Pay, your balance is 0');
    this.billDetails = null;
  }
  selectedCar: any = null;
  billDetails: any = null;
  bookingRef: string = '';

  constructor(public favoriteService: FavoriteService) {}

  toggleFavorite(car: any, event: MouseEvent) {
    event.stopPropagation();
    this.favoriteService.toggleFavorite({
      id: car.id,
      name: car.name,
      price: car.price,
      image: car.image,
      type: 'car'
    });
  }

  isFavorite(car: any): boolean {
    return this.favoriteService.isFavorite(car.id, 'car');
  }

  openCarModal(carId: number) {
    this.selectedCar = this.carDetails.find(c => c.id === carId) || null;
  }

  onBookCar() {
    if (this.selectedCar) {
      this.bookNowDirect(this.selectedCar);
      this.selectedCar = null;
    }
  }

  bookNowDirect(car: any) {
    const priceNum = parseFloat(car.price.replace(/[^0-9.]/g, ''));
    const fee = (priceNum * 0.05).toFixed(2);
    const total = (priceNum + parseFloat(fee)).toLocaleString();
    
    this.billDetails = {
      name: car.name,
      price: car.price,
      fee: '$' + fee,
      total: '$' + total
    };
    this.bookingRef = Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  closeModal() { this.selectedCar = null; }

  cars = [
    { id: 1, name: 'Mercedes-Benz Sprinter', price: '$250', image: 'assets/sprinter.png' },
    { id: 2, name: 'Mercedes-Benz V Class', price: '$180', image: 'assets/vclass.png' },
    { id: 3, name: 'Hyundai Staria', price: '$120', image: 'assets/staria.png' },
    { id: 4, name: 'Mercedes-Benz S Class', price: '$450', image: 'assets/sclass.png' },
    { id: 5, name: 'BMW 720', price: '$400', image: 'assets/bmw720.png' }
  ];

  carDetails = [
    { id: 1, name: 'Mercedes-Benz Sprinter', type: 'Luxury Van', price: '$250', capacity: '12-15 Passengers', transmission: 'Automatic', features: ['AC', 'Audio', 'Comfort'], description: 'Luxury van for large groups.', image: 'assets/sprinter.png' },
    { id: 2, name: 'Mercedes-Benz V Class', type: 'Luxury MPV', price: '$180', capacity: '7-8 Passengers', transmission: 'Automatic', features: ['Premium AC', 'Leather'], description: 'Luxury MPV for business.', image: 'assets/vclass.png' },
    { id: 3, name: 'Hyundai Staria', type: 'Modern MPV', price: '$120', capacity: '7-9 Passengers', transmission: 'Automatic', features: ['Modern Design', 'Safety'], description: 'Futuristic design MPV.', image: 'assets/staria.png' },
    { id: 4, name: 'Mercedes-Benz S Class', type: 'Luxury Saloon', price: '$450', capacity: '4-5 Passengers', transmission: 'Automatic', features: ['MBUX', 'Massage'], description: 'World-class luxury.', image: 'assets/sclass.png' },
    { id: 5, name: 'BMW 720', type: 'Luxury Saloon', price: '$400', capacity: '4-5 Passengers', transmission: 'Automatic', features: ['iDrive', 'Harman Kardon'], description: 'Dynamic performance.', image: 'assets/bmw720.png' }
  ];
}
