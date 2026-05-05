import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DestinationService, Destination } from '../../services/destination.service';
import { DestinationModalComponent } from '../destination-modal/destination-modal.component';
import { FavoriteService } from '../../services/favorite.service';
import { PlaceholderService } from '../../services/placeholder.service';

@Component({
  selector: 'app-bundling',
  standalone: true,
  imports: [CommonModule, FormsModule, DestinationModalComponent],
  template: `
    <div class="relative min-h-screen bg-gray-50 dark:bg-[#1e1e1e]">
      <!-- Search Section -->
      <div class="bg-white dark:bg-[#252526] shadow-md">
        <div class="container mx-auto px-5 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div class="bg-white dark:bg-[#252526] rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-5 lg:p-6 shadow-lg">
            <!-- Trip Type Selection -->
            <div class="flex flex-wrap gap-3 sm:gap-4 mb-3 sm:mb-4">
              <label class="flex items-center cursor-pointer">
                <input type="radio" name="tripType" value="round-trip" [(ngModel)]="tripType" class="mr-1.5 sm:mr-2">
                <span class="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200">Round-trip</span>
              </label>
              <label class="flex items-center cursor-pointer">
                <input type="radio" name="tripType" value="one-way" [(ngModel)]="tripType" class="mr-1.5 sm:mr-2">
                <span class="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200">One-way</span>
              </label>
            </div>

            <!-- Search Fields -->
            <div class="grid grid-cols-1 md:grid-cols-5 gap-3 sm:gap-4">
              <div class="md:col-span-2">
                <label class="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">From</label>
                <input type="text" [(ngModel)]="fromLocation" placeholder="City or airport" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-gray-100">
              </div>
              <div class="flex items-end justify-center">
                <button (click)="swapLocations()" class="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-all">
                  <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
                </button>
              </div>
              <div class="md:col-span-2">
                <label class="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">To</label>
                <input type="text" [(ngModel)]="toLocation" [placeholder]="(placeholderService.currentPlaceholder$ | async) || 'City or airport'" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-gray-100 transition-all duration-300">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
              <div class="lg:col-span-1">
                <label class="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">Departure</label>
                <input type="date" [(ngModel)]="departureDate" class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-gray-100">
              </div>
              <div *ngIf="tripType === 'round-trip'" class="lg:col-span-1">
                <label class="block text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">Return</label>
                <input type="date" [(ngModel)]="returnDate" class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-gray-100">
              </div>
              <div class="flex items-end sm:col-span-2 lg:col-span-3">
                <button (click)="onSearch()" class="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2.5 rounded-lg transition-all shadow-lg">Search</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bundling Packages Section -->
      <div class="container mx-auto px-5 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Bundling Packages</h2>
          <p class="text-gray-600 dark:text-gray-400">Exclusive deals for your perfect holiday</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8" *ngIf="bundlingPackages.length > 0">
          <div *ngFor="let pkg of bundlingPackages; let i = index" 
               class="bg-white dark:bg-[#252526] rounded-xl border border-gray-200 dark:border-gray-700 shadow-md overflow-hidden card-hover animate-pop-in"
               [class]="'stagger-' + (i + 1)"
               style="opacity: 0; animation-fill-mode: forwards;">
            
            <!-- Image Carousel -->
            <div class="h-48 overflow-hidden relative group">
              <img [src]="pkg.currentSlide === 0 ? pkg.image1 : pkg.image2" [alt]="pkg.name" class="w-full h-full object-cover transition-all duration-500">
              <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                <div class="w-2 h-2 rounded-full transition-all" [class]="pkg.currentSlide === 0 ? 'bg-white w-4' : 'bg-white/50'"></div>
                <div class="w-2 h-2 rounded-full transition-all" [class]="pkg.currentSlide === 1 ? 'bg-white w-4' : 'bg-white/50'"></div>
              </div>
              <button (click)="prevSlide(i); $event.stopPropagation()" class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
              </button>
              <button (click)="nextSlide(i); $event.stopPropagation()" class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
              </button>

              <!-- Favorite Button -->
              <button (click)="toggleFavorite(pkg, $event)" 
                      class="absolute top-3 right-3 z-20 p-2 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg"
                      [class]="isFavorite(pkg) ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-400 hover:text-red-500'">
                <svg class="w-4 h-4 sm:w-5 sm:h-5" [class.fill-current]="isFavorite(pkg)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </button>
            </div>

            <div class="p-4">
              <h3 class="text-base font-bold mb-2 dark:text-gray-100">{{ pkg.name }}</h3>
              <div class="flex items-center gap-2 mb-4 text-xs text-gray-500">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                <span>{{ pkg.dates }}</span>
              </div>
              <div class="flex justify-between items-end mb-4">
                <div><p class="text-[10px] text-gray-500 uppercase">From</p><p class="text-base font-bold text-blue-600">{{ pkg.price }}</p></div>
                <div class="text-right"><p class="text-[10px] text-gray-500 uppercase">Class</p><p class="text-xs font-semibold dark:text-gray-300">{{ pkg.class }}</p></div>
              </div>
              
              <div class="flex gap-2">
                <button (click)="openDestinationModal(pkg.destination1)" class="flex-1 bg-gray-100 dark:bg-[#3e3e42] py-2 rounded-lg text-xs font-bold dark:text-gray-100 hover:bg-gray-200">Details</button>
                <button (click)="bookNowDirect(pkg)" class="flex-[2] bg-yellow-400 py-2 rounded-lg text-xs font-bold hover:bg-yellow-500 transition-all transform hover:scale-105 shadow-md">Book Now</button>
              </div>
            </div>
          </div>
        </div>

        <div *ngIf="bundlingPackages.length === 0" class="text-center py-20 bg-white dark:bg-[#252526] rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700">
          <p class="text-gray-500 mb-4">No matching bundles found</p>
          <button (click)="generateRandomPackages()" class="bg-yellow-400 px-6 py-2 rounded-lg font-bold">Show All</button>
        </div>
      </div>

      <!-- Bill / Receipt Modal (Integrated directly to avoid import issues) -->
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
                  <p class="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Item Reserved</p>
                  <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">{{ billDetails.name }}</h3>
                  <p class="text-xs text-gray-500 mt-1">{{ billDetails.dates }}</p>
                </div>
                <div class="text-right">
                  <p class="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Reference</p>
                  <p class="text-sm font-mono font-bold text-yellow-600">#KYI-{{ bookingRef }}</p>
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
            <div class="mt-8 flex flex-col gap-3">
              <button (click)="confirmPayment()" class="w-full bg-gray-900 dark:bg-yellow-400 text-white dark:text-gray-900 font-bold py-3 rounded-xl shadow-xl transition-all hover:scale-[1.02]">Confirm & Pay</button>
              <button (click)="billDetails = null" class="w-full text-gray-500 text-sm font-semibold py-2">Close Receipt</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Destination Modal -->
      <app-destination-modal [destination]="selectedDestination" (close)="closeModal()" (book)="onBookBundle()"></app-destination-modal>
    </div>
  `,
  styleUrl: './bundling.component.css'
})
export class BundlingComponent implements OnInit {
  // ... (properti lainnya)

  confirmPayment() {
    alert('Unable to continue Confirm & Pay, your balance is 0');
    this.billDetails = null;
  }
  tripType: string = 'round-trip';
  fromLocation: string = '';
  toLocation: string = '';
  departureDate: string = '';
  returnDate: string = '';
  selectedDestination: Destination | null = null;
  bundlingPackages: any[] = [];
  billDetails: any = null;
  bookingRef: string = '';

  constructor(
    private destinationService: DestinationService,
    public favoriteService: FavoriteService,
    public placeholderService: PlaceholderService
  ) {}

  toggleFavorite(pkg: any, event: MouseEvent) {
    event.stopPropagation();
    this.favoriteService.toggleFavorite({
      id: pkg.name,
      name: pkg.name,
      price: pkg.price,
      image: pkg.image1,
      type: 'bundle',
      dates: pkg.dates
    });
  }

  isFavorite(pkg: any): boolean {
    return this.favoriteService.isFavorite(pkg.name, 'bundle');
  }

  ngOnInit() {
    this.generateRandomPackages();
    this.bookingRef = Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  onBookBundle() {
    if (this.selectedDestination) {
      const pkg = this.bundlingPackages.find(p => p.destination1 === this.selectedDestination?.name || p.destination2 === this.selectedDestination?.name);
      this.bookNowDirect(pkg || { name: this.selectedDestination.name + ' Package', price: '$2,500', dates: 'Flexible Dates' });
      this.selectedDestination = null;
    }
  }

  bookNowDirect(pkg: any) {
    const priceNum = parseFloat(pkg.price.replace(/[^0-9.]/g, '')) || 2500;
    const fee = (priceNum * 0.05).toFixed(2);
    const total = (priceNum + parseFloat(fee)).toLocaleString();
    
    this.billDetails = {
      name: pkg.name,
      price: pkg.price,
      dates: pkg.dates || 'Selected Dates',
      fee: '$' + fee,
      total: '$' + total
    };
    this.bookingRef = Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  // --- Logic helpers ---
  generateRandomPackages() { this.bundlingPackages = [...this.allPackagesData]; }
  setSlide(i: number, s: number) { this.bundlingPackages[i].currentSlide = s; }
  nextSlide(i: number) { this.bundlingPackages[i].currentSlide = (this.bundlingPackages[i].currentSlide + 1) % 2; }
  prevSlide(i: number) { this.bundlingPackages[i].currentSlide = (this.bundlingPackages[i].currentSlide - 1 + 2) % 2; }
  onSearch() {
    const toDest = this.destinationService.getDestinationByName(this.toLocation);
    if (toDest) {
      this.bundlingPackages = this.allPackagesData.filter(p => 
        p.destination1.toLowerCase().includes(this.toLocation.toLowerCase()) || 
        p.destination2.toLowerCase().includes(this.toLocation.toLowerCase())
      );
    }
  }
  swapLocations() { const t = this.fromLocation; this.fromLocation = this.toLocation; this.toLocation = t; }
  openDestinationModal(n: string) { this.selectedDestination = this.destinationService.getDestinationByName(n) || null; }
  closeModal() { this.selectedDestination = null; }

  private allPackagesData = [
    { name: 'Mecca - Georgia', destination1: 'Mecca', destination2: 'Georgia', image1: 'assets/kabah.png', image2: 'assets/georgia.png', dates: 'Sun, May 10 - Sun, May 17', price: '$6,641', class: 'Economy', currentSlide: 0 },
    { name: 'Egypt - Monaco', destination1: 'Egypt', destination2: 'Monaco', image1: 'assets/egypt.png', image2: 'assets/monaco.png', dates: 'Wed, May 13 - Wed, May 20', price: '$2,791', class: 'Economy', currentSlide: 0 },
    { name: 'Cotswold - Turkey', destination1: 'Cotswold', destination2: 'Turkey', image1: 'assets/cotswold.jpg', image2: 'assets/tukery.png', dates: 'Sat, May 16 - Sat, May 23', price: '$3,904', class: 'Economy', currentSlide: 0 },
    { name: 'Russia - Palestine', destination1: 'Russia', destination2: 'Palestine', image1: 'assets/rusia.png', image2: 'assets/palestine.png', dates: 'Tue, May 19 - Tue, May 26', price: '$4,768', class: 'Economy', currentSlide: 0 },
    { name: 'Spain - Al - Ula', destination1: 'Spain', destination2: 'Al - Ula', image1: 'assets/Spain.png', image2: 'assets/al-ula.png', dates: 'Fri, May 22 - Fri, May 29', price: '$5,466', class: 'Economy', currentSlide: 0 },
    { name: 'Denmark - Swiss', destination1: 'Denmark', destination2: 'Swiss', image1: 'assets/denmark.jpg', image2: 'assets/swiss.png', dates: 'Mon, May 25 - Mon, Jun 1', price: '$6,455', class: 'Economy', currentSlide: 0 },
    { name: 'Palm Jumeirah - Mecca', destination1: 'Palm Jumeirah', destination2: 'Mecca', image1: 'assets/palmjumeira.png', image2: 'assets/kabah.png', dates: 'Thu, May 28 - Thu, Jun 4', price: '$5,809', class: 'Economy', currentSlide: 0 },
    { name: 'Georgia - Egypt', destination1: 'Georgia', destination2: 'Egypt', image1: 'assets/georgia.png', image2: 'assets/egypt.png', dates: 'Sun, May 31 - Sun, Jun 7', price: '$3,094', class: 'Economy', currentSlide: 0 }
  ];
}
