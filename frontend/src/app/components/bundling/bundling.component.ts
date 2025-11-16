import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DestinationService, Destination } from '../../services/destination.service';
import { DestinationModalComponent } from '../destination-modal/destination-modal.component';

@Component({
  selector: 'app-bundling',
  standalone: true,
  imports: [CommonModule, FormsModule, DestinationModalComponent],
  template: `
    <div class="relative min-h-screen bg-gray-50">
      <!-- Search Section -->
      <div class="bg-white shadow-md">
        <div class="container mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
          <div class="bg-white rounded-lg sm:rounded-xl border border-gray-200 p-3 sm:p-4 lg:p-6 shadow-lg">
            <!-- Trip Type Selection -->
            <div class="flex flex-wrap gap-3 sm:gap-4 mb-3 sm:mb-4">
              <label class="flex items-center cursor-pointer">
                <input type="radio" name="tripType" value="round-trip" [(ngModel)]="tripType" class="mr-1.5 sm:mr-2">
                <span class="text-xs sm:text-sm font-medium text-gray-700">Round-trip</span>
              </label>
              <label class="flex items-center cursor-pointer">
                <input type="radio" name="tripType" value="one-way" [(ngModel)]="tripType" class="mr-1.5 sm:mr-2">
                <span class="text-xs sm:text-sm font-medium text-gray-700">One-way</span>
              </label>
              <label class="flex items-center cursor-pointer">
                <input type="checkbox" [(ngModel)]="nonstopOnly" class="mr-1.5 sm:mr-2">
                <span class="text-xs sm:text-sm font-medium text-gray-700">Nonstop</span>
              </label>
            </div>

            <!-- Search Fields -->
            <div class="grid grid-cols-1 md:grid-cols-5 gap-3 sm:gap-4">
              <!-- From -->
              <div class="md:col-span-2">
                <label class="block text-xs font-semibold text-gray-600 mb-1">From</label>
                <div class="relative">
                  <input 
                    type="text" 
                    [(ngModel)]="fromLocation"
                    placeholder="City or airport"
                    class="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent">
                  <button class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
                <p class="text-xs text-gray-500 mt-1">All airports</p>
              </div>

              <!-- Swap Button -->
              <div class="flex items-end justify-center md:justify-center">
                <button (click)="swapLocations()" class="bg-gray-100 hover:bg-gray-200 rounded-full p-1.5 sm:p-2 transition-all duration-300 transform hover:scale-110">
                  <svg class="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                  </svg>
                </button>
              </div>

              <!-- To -->
              <div class="md:col-span-2">
                <label class="block text-xs font-semibold text-gray-600 mb-1">To</label>
                <div class="relative">
                  <input 
                    type="text" 
                    [(ngModel)]="toLocation"
                    placeholder="City or airport"
                    class="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent">
                  <button class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
                <p class="text-xs text-gray-500 mt-1">All airports</p>
              </div>
            </div>

            <!-- Dates and Passengers -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-3 sm:mt-4">
              <!-- Departure Date -->
              <div>
                <label class="block text-xs font-semibold text-gray-600 mb-1">Departure</label>
                <input 
                  type="date" 
                  [(ngModel)]="departureDate"
                  class="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent">
              </div>

              <!-- Return Date (if round-trip) -->
              <div *ngIf="tripType === 'round-trip'">
                <label class="block text-xs font-semibold text-gray-600 mb-1">Return</label>
                <input 
                  type="date" 
                  [(ngModel)]="returnDate"
                  class="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent">
              </div>

              <!-- Passengers -->
              <div>
                <label class="block text-xs font-semibold text-gray-600 mb-1">Passengers</label>
                <select 
                  [(ngModel)]="passengers"
                  class="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent">
                  <option value="1">1 Adult · Economy</option>
                  <option value="2">2 Adults · Economy</option>
                  <option value="3">3 Adults · Economy</option>
                  <option value="4">4 Adults · Economy</option>
                </select>
              </div>

              <!-- Search Button -->
              <div class="flex items-end sm:col-span-2 md:col-span-1">
                <button 
                  (click)="onSearch()"
                  class="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                  <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bundling Packages Section -->
      <div class="container mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
        <div class="mb-4 sm:mb-6">
          <h2 class="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">Bundling Packages</h2>
          <p class="text-sm sm:text-base text-gray-600">Best deals for your next adventure</p>
        </div>

        <!-- Grid Layout for Bundling Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6" *ngIf="bundlingPackages.length > 0">
          <div *ngFor="let pkg of bundlingPackages; let i = index" 
               class="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden card-hover animate-pop-in" 
               [class]="'stagger-' + (i + 1)"
               style="opacity: 0; animation-fill-mode: forwards;">
            <!-- Sliding Photo Carousel -->
            <div class="h-40 sm:h-48 overflow-hidden relative group cursor-pointer bg-gray-200">
              <!-- First Image -->
              <div class="absolute inset-0 w-full h-full transition-opacity duration-500"
                   [class.opacity-0]="pkg.currentSlide === 1"
                   [class.opacity-100]="pkg.currentSlide === 0">
                <img [src]="pkg.image1" [alt]="pkg.destination1" 
                     class="w-full h-full object-cover"
                     (load)="onImageLoad($event)"
                     (error)="onImageError($event)"
                     style="display: block; width: 100%; height: 100%;">
                <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              <!-- Second Image -->
              <div class="absolute inset-0 w-full h-full transition-opacity duration-500"
                   [class.opacity-0]="pkg.currentSlide === 0"
                   [class.opacity-100]="pkg.currentSlide === 1">
                <img [src]="pkg.image2" [alt]="pkg.destination2" 
                     class="w-full h-full object-cover"
                     (load)="onImageLoad($event)"
                     (error)="onImageError($event)"
                     style="display: block; width: 100%; height: 100%;">
                <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              
              <!-- Navigation Dots -->
              <div class="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-10">
                <button 
                  (click)="setSlide(i, 0); $event.stopPropagation()"
                  [class]="pkg.currentSlide === 0 ? 'bg-white w-6' : 'bg-white/50 w-2'"
                  class="h-2 rounded-full transition-all duration-300 cursor-pointer"></button>
                <button 
                  (click)="setSlide(i, 1); $event.stopPropagation()"
                  [class]="pkg.currentSlide === 1 ? 'bg-white w-6' : 'bg-white/50 w-2'"
                  class="h-2 rounded-full transition-all duration-300 cursor-pointer"></button>
              </div>

              <!-- Arrow Navigation -->
              <button 
                (click)="prevSlide(i); $event.stopPropagation()"
                class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 shadow-md">
                <svg class="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <button 
                (click)="nextSlide(i); $event.stopPropagation()"
                class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 shadow-md">
                <svg class="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>

            <!-- Package Info -->
            <div class="p-3 sm:p-4">
              <div class="flex items-start justify-between mb-2">
                <h3 class="text-sm sm:text-base md:text-lg font-bold text-gray-900 line-clamp-2">{{ pkg.name }}</h3>
              </div>
              
              <div class="flex items-center gap-2 mb-2 sm:mb-3">
                <svg class="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <span class="text-xs sm:text-sm text-gray-600 line-clamp-1">{{ pkg.dates }}</span>
              </div>

              <div class="flex items-center justify-between mb-3 sm:mb-4">
                <div>
                  <p class="text-xs text-gray-500 mb-0.5 sm:mb-1">Package</p>
                  <p class="text-base sm:text-lg font-bold text-blue-600">{{ pkg.price }}</p>
                </div>
                <div class="text-right">
                  <p class="text-xs text-gray-500 mb-0.5 sm:mb-1">Class</p>
                  <p class="text-xs sm:text-sm font-semibold text-gray-700">{{ pkg.class }}</p>
                </div>
              </div>

              <button 
                (click)="openDestinationModal(pkg.destination1)"
                class="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-3 sm:px-4 rounded-lg transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Destination Modal -->
      <app-destination-modal 
        [destination]="selectedDestination" 
        (close)="closeModal()">
      </app-destination-modal>
    </div>
  `,
  styleUrl: './bundling.component.css'
})
export class BundlingComponent implements OnInit {
  tripType: string = 'round-trip';
  nonstopOnly: boolean = false;
  fromLocation: string = '';
  toLocation: string = '';
  departureDate: string = '';
  returnDate: string = '';
  passengers: string = '1';
  
  selectedDestination: Destination | null = null;
  bundlingPackages: any[] = [];

  // Random destinations from Recommend
  private recommendDestinations = [
    { name: 'Mecca', image: 'assets/kabah.png' },
    { name: 'Georgia', image: 'assets/georgia.png' },
    { name: 'Russia', image: 'assets/rusia.png' },
    { name: 'Spain', image: 'assets/Spain.png' },
    { name: 'Swiss', image: 'assets/swiss.png' },
    { name: 'Turkey', image: 'assets/tukery.png' },
    { name: 'Cotswold', image: 'assets/cotswold.jpg' },
    { name: 'Denmark', image: 'assets/denmark.jpg' },
    { name: 'Al - Ula', image: 'assets/al-ula.png' },
    { name: 'Palestine', image: 'assets/palestine.png' },
    { name: 'Palm Jumeirah', image: 'assets/palmjumeira.png' },
    { name: 'Egypt', image: 'assets/egypt.png' },
    { name: 'Monaco', image: 'assets/monaco.png' }
  ];

  constructor(private destinationService: DestinationService) {}

  ngOnInit() {
    this.setDefaultDates();
    this.generateRandomPackages();
  }

  setDefaultDates() {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    const twoWeeksLater = new Date(today);
    twoWeeksLater.setDate(today.getDate() + 14);

    this.departureDate = this.formatDate(nextWeek);
    this.returnDate = this.formatDate(twoWeeksLater);
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  generateRandomPackages() {
    // Shuffle and create pairs of destinations
    const shuffled = [...this.recommendDestinations].sort(() => 0.5 - Math.random());
    const packages: any[] = [];

    // Create 8 packages with 2 destinations each
    for (let i = 0; i < 8; i++) {
      const index1 = i * 2;
      const index2 = (i * 2) + 1;
      
      // Ensure we don't go out of bounds
      const dest1 = shuffled[index1 % shuffled.length];
      const dest2 = shuffled[index2 % shuffled.length];
      
      // Make sure we don't pair the same destination
      let dest2Final = dest2;
      if (dest1.name === dest2.name) {
        dest2Final = shuffled[(index2 + 1) % shuffled.length];
      }
      
      const departure = new Date();
      departure.setDate(departure.getDate() + (i * 3) + 5);
      const returnDate = new Date(departure);
      returnDate.setDate(departure.getDate() + 7);

      // Preload images
      const img1 = new Image();
      img1.src = dest1.image;
      const img2 = new Image();
      img2.src = dest2Final.image;

      packages.push({
        name: `${dest1.name} - ${dest2Final.name}`,
        destination1: dest1.name,
        destination2: dest2Final.name,
        image1: dest1.image,
        image2: dest2Final.image,
        currentSlide: 0,
        imagesLoaded: false,
        dates: `${this.formatDisplayDate(departure)} - ${this.formatDisplayDate(returnDate)}`,
        price: `From $${(Math.floor(Math.random() * 5000) + 2000).toLocaleString()}`,
        class: 'Economy'
      });
    }

    this.bundlingPackages = packages;
  }

  setSlide(index: number, slideIndex: number) {
    if (this.bundlingPackages[index]) {
      this.bundlingPackages[index].currentSlide = slideIndex;
    }
  }

  nextSlide(index: number) {
    if (this.bundlingPackages[index]) {
      this.bundlingPackages[index].currentSlide = 
        (this.bundlingPackages[index].currentSlide + 1) % 2;
    }
  }

  prevSlide(index: number) {
    if (this.bundlingPackages[index]) {
      this.bundlingPackages[index].currentSlide = 
        (this.bundlingPackages[index].currentSlide - 1 + 2) % 2;
    }
  }

  onImageLoad(event: any) {
    // Image loaded successfully
    if (event.target) {
      event.target.style.opacity = '1';
    }
  }

  onImageError(event: any) {
    // Handle image load error
    if (event.target) {
      event.target.style.opacity = '0.5';
      event.target.src = 'assets/default.png'; // Fallback image
    }
  }

  formatDisplayDate(date: Date): string {
    if (!date || isNaN(date.getTime())) {
      return 'Date TBA';
    }
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
  }

  swapLocations() {
    const temp = this.fromLocation;
    this.fromLocation = this.toLocation;
    this.toLocation = temp;
  }

  onSearch() {
    // Search logic can be implemented here
    console.log('Searching for:', {
      from: this.fromLocation,
      to: this.toLocation,
      departure: this.departureDate,
      return: this.returnDate,
      passengers: this.passengers,
      tripType: this.tripType
    });
  }

  openDestinationModal(destinationName: string) {
    const destination = this.destinationService.getDestinationByName(destinationName);
    if (destination) {
      this.selectedDestination = destination;
    }
  }

  closeModal() {
    this.selectedDestination = null;
  }
}

