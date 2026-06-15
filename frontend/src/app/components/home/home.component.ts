import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DestinationService, Hotel, HotelWithImage } from '../../services/destination.service';
import { DestinationModalComponent } from '../destination-modal/destination-modal.component';
import { HotelCardComponent } from '../hotel-card/hotel-card.component';
import { FavoriteService } from '../../services/favorite.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, DestinationModalComponent, HotelCardComponent],
  template: `
    <div class="relative min-h-screen bg-gray-50 dark:bg-[#1e1e1e]">
      <!-- Hero Section -->
      <div class="relative h-[600px] sm:h-[500px] md:h-[550px] lg:h-[600px] overflow-hidden">
        <div class="absolute inset-0 bg-cover bg-center bg-no-repeat" [style.background-image]="'url(assets/nusa-penida-island-nature.jpg)'" style="transform: scale(1.1);">
          <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
        </div>
        <div class="relative z-10 h-full flex flex-col items-center justify-center px-5 py-8">
          <div class="w-full max-w-4xl animate-fade-in-up">
            <div class="flex justify-center mb-4">
              <img src="assets/KeyInLogo.png" alt="KeyIn Logo" class="h-32 sm:h-40 lg:h-48 w-auto">
            </div>
            <p class="text-white/90 text-center text-lg mb-10 drop-shadow">Temukan Keindahan Dunia bersama Key-In.</p>
            <!-- Search Bar -->
            <div class="bg-white dark:bg-[#252526] rounded-2xl shadow-2xl p-6">
              <div class="flex flex-col md:flex-row gap-5">
                <div class="flex-1">
                  <label class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Cari Hotel</label>
                  <div class="flex flex-col sm:flex-row gap-3">
                    <div class="relative w-full sm:w-64">
                      <select [(ngModel)]="selectedRegion" (change)="filterHotels()" class="w-full px-4 py-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-gray-100 transition-all duration-300 appearance-none focus:outline-none focus:ring-2 focus:ring-yellow-400 text-ellipsis overflow-hidden">
                        <option value="Semua">Semua Wilayah</option>
                        <option value="DKI Jakarta, Indonesia">DKI Jakarta</option>
                        <option value="Kota Bandung, Jawa Barat, Indonesia">Bandung</option>
                        <option value="Kota Bandar Lampung, Lampung, Indonesia">Bandar Lampung</option>
                        <option value="Bali">Bali</option>
                      </select>
                      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700 dark:text-gray-300">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                    <input type="text" [(ngModel)]="searchQuery" (input)="filterHotels()" [placeholder]="typingPlaceholder" class="flex-1 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="container mx-auto px-5 sm:px-6 lg:px-8 py-16">
        <div class="mb-8 flex justify-between items-end">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Rekomendasi Hotel</h2>
            <p class="text-gray-600 dark:text-gray-400">Pilihan hotel terbaik untuk Anda</p>
          </div>
        </div>

        <div *ngIf="displayedHotels.length === 0" class="text-center py-20 text-gray-500">
          Hotel tidak ditemukan.
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          <ng-container *ngFor="let hotel of displayedHotels; let i = index">
            
            <app-hotel-card [hotel]="hotel" (openModal)="openDestinationModal($event)"></app-hotel-card>

            <!-- "Lihat Lebih Banyak" Button exactly after the 15th card -->
            <div *ngIf="i === 14 && hasMoreToShow && !isFiltered" class="col-span-full flex justify-center my-8">
              <button (click)="showMore()" class="bg-gray-200 dark:bg-[#3e3e42] hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg transform hover:scale-105 active:scale-95">
                Tampilkan Lebih
              </button>
            </div>

          </ng-container>

          <!-- Button Redirect ke Recommend saat data habis -->
          <div *ngIf="displayedHotels.length > 0 && !hasMoreToShow" class="col-span-full flex justify-center mt-10 mb-4 animate-fade-in-up">
            <a routerLink="/recommend" class="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-4 rounded-xl transition-all shadow-lg transform hover:scale-105 active:scale-95 flex items-center gap-3 border-2 border-yellow-500">
              <span>Lihat Lebih Banyak Destinasi</span>
              <svg class="w-5 h-5 animate-bounce-x" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Destination Modal -->
      <app-destination-modal [hotel]="selectedHotel" (close)="closeModal()"></app-destination-modal>

      <!-- Floating Auth Popup (White Card & Yellow Metallic Theme with Smooth Transition) -->
      <div [class.opacity-100]="showAuthPopup"
           [class.opacity-0]="!showAuthPopup"
           [class.pointer-events-none]="!showAuthPopup"
           class="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300 ease-in-out"
           (click)="closeAuthPopup()">
        <!-- Card Container - Pristine White with Subtle Shadow & Border -->
        <div [class.scale-100]="showAuthPopup"
             [class.scale-95]="!showAuthPopup"
             [class.opacity-100]="showAuthPopup"
             [class.opacity-0]="!showAuthPopup"
             class="relative max-w-sm w-full overflow-hidden rounded-3xl p-8 text-center bg-white dark:bg-[#252526] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border border-gray-100 dark:border-gray-800 transition-all duration-300 ease-in-out cursor-default"
             (click)="$event.stopPropagation()">
          
          <!-- Subtle Glossy/Metallic Sheen Overlay -->
          <div class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none"></div>

          <!-- Premium KeyIn Icon Header -->
          <img src="assets/KeyInLogo.png" alt="KeyIn Logo" class="h-16 w-auto mx-auto mb-6 drop-shadow-md object-contain">

          <h3 class="text-2.5xl font-normal text-gray-900 dark:text-white mb-2 drop-shadow-sm tracking-tight" style="font-family: 'Odor Mean Chey', serif;">Welcome to <span class="bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 bg-clip-text text-transparent">KeyIn</span></h3>
          <p class="text-gray-500 dark:text-gray-400 text-xs mb-8 font-semibold leading-relaxed">To keep your data and good experience, Please sign in.</p>

          <!-- Authentication Options -->
          <div class="space-y-4 relative z-10">
            <!-- Continue with Google Button (Triggers toast notify) -->
            <button (click)="onGoogleLogin()" 
                    class="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-800 font-bold py-3.5 px-6 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-sm border border-gray-100"
                    style="font-family: 'Odor Mean Chey', serif;">
              <!-- Google "G" Logo SVG -->
              <svg class="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google</span>
            </button>

            <!-- Continue as Guest Button (Yellow Metallic) -->
            <button (click)="closeAuthPopup()" 
                    class="w-full flex items-center justify-center gap-2 text-gray-900 font-bold py-3.5 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_15px_rgba(245,197,24,0.3)] hover:shadow-[0_6px_25px_rgba(245,197,24,0.5)] cursor-pointer text-sm border border-yellow-400/20"
                    style="background: linear-gradient(135deg, #FFE066 0%, #F5C518 50%, #D4A300 100%); text-shadow: 0 0.5px 1px rgba(255,255,255,0.5); font-family: 'Odor Mean Chey', serif;">
              <span>Continue as Guest</span>
            </button>
          </div>

          <!-- Close Icon in Top Right -->
          <button (click)="closeAuthPopup()" 
                  class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-[#2e2e30] cursor-pointer">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Premium Toast Notification (Oops! Something Wrong) -->
      <div [class.translate-y-0]="showToast"
           [class.opacity-100]="showToast"
           [class.-translate-y-10]="!showToast"
           [class.opacity-0]="!showToast"
           [class.pointer-events-none]="!showToast"
           class="fixed top-6 left-1/2 transform -translate-x-1/2 z-[100000] flex items-center gap-2 sm:gap-3 bg-gray-900 text-white font-semibold px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-2xl shadow-2xl transition-all duration-300 ease-out border border-gray-800/80 max-w-[90vw] whitespace-nowrap text-[11px] sm:text-sm"
           style="font-family: 'Poppins', sans-serif;">
        <!-- Warning Icon (No Animation) -->
        <svg class="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>
        <span class="whitespace-nowrap leading-none">Oops! Something Wrong</span>
      </div>
    </div>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  searchQuery: string = '';
  selectedRegion: string = 'Semua';
  selectedHotel: Hotel | null = null;
  
  allRandomHotels: HotelWithImage[] = [];
  filteredHotels: HotelWithImage[] = [];
  displayedHotels: HotelWithImage[] = [];
  
  hasMoreToShow: boolean = false;
  isFiltered: boolean = false;
  itemsToShow: number = 15;

  showAuthPopup = false;
  showToast = false;
  authPopupTimeout: any;

  closeAuthPopup() {
    this.showAuthPopup = false;
  }

  onGoogleLogin() {
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  // Typing Animation
  typingPlaceholder: string = '';
  placeholderTexts: string[] = [
    "DKI Jakarta, Indonesia",
    "Kota Bandung, Jawa Barat, Indonesia",
    "Kota Bandar Lampung, Lampung, Indonesia",
    "Kabupaten Badung, Bali, Indonesia",
    "Kabupaten Gianyar, Bali, Indonesia",
    "Kabupaten Karangasem, Bali, Indonesia",
    "Kabupaten Klungkung, Bali, Indonesia"
  ];
  currentTextIndex: number = 0;
  currentCharIndex: number = 0;
  isDeleting: boolean = false;
  typingSpeed: number = 100;
  deletingSpeed: number = 50;
  pauseTime: number = 2000;
  typingTimeout: any;

  constructor(
    private destinationService: DestinationService,
    public favoriteService: FavoriteService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.startTypingAnimation();
    this.destinationService.hotels$.subscribe(hotels => {
      if (hotels && hotels.length > 0) {
        this.initHotels(hotels);
      }
    });

    // Show auth popup after 5 seconds of browsing
    this.authPopupTimeout = setTimeout(() => {
      this.showAuthPopup = true;
    }, 5000);
  }

  ngOnDestroy() {
    if (this.typingTimeout) clearTimeout(this.typingTimeout);
    if (this.authPopupTimeout) clearTimeout(this.authPopupTimeout);
  }

  startTypingAnimation() {
    const currentText = this.placeholderTexts[this.currentTextIndex];
    
    if (this.isDeleting) {
      this.typingPlaceholder = currentText.substring(0, this.currentCharIndex - 1);
      this.currentCharIndex--;
    } else {
      this.typingPlaceholder = currentText.substring(0, this.currentCharIndex + 1);
      this.currentCharIndex++;
    }

    let typeSpeed = this.isDeleting ? this.deletingSpeed : this.typingSpeed;

    if (!this.isDeleting && this.currentCharIndex === currentText.length) {
      typeSpeed = this.pauseTime;
      this.isDeleting = true;
    } else if (this.isDeleting && this.currentCharIndex === 0) {
      this.isDeleting = false;
      this.currentTextIndex = (this.currentTextIndex + 1) % this.placeholderTexts.length;
      typeSpeed = 500;
    }

    this.typingTimeout = setTimeout(() => this.startTypingAnimation(), typeSpeed);
  }

  initHotels(allHotels: Hotel[]) {
    // Filter hotels to prioritize those with valid coordinates and amenities
    const qualityHotels = allHotels.filter(h => 
      h.latitude && h.longitude && 
      (h.swimming_pool === 'yes' || h.internet_access === 'wlan' || h.breakfast === 'yes' || h.air_conditioning === 'yes' || h.stars)
    );

    // If we have enough quality hotels, use them, otherwise fallback to all
    let poolToUse = qualityHotels.length >= 40 ? qualityHotels : allHotels;

    // Get 40 random hotels
    const shuffled = [...poolToUse].sort(() => 0.5 - Math.random());
    this.allRandomHotels = shuffled.slice(0, 40).map(h => ({ ...h }));
    
    // Fetch images for them
    this.allRandomHotels.forEach(hotel => this.destinationService.fetchImage(hotel));
    
    this.filterHotels();
  }

  filterHotels() {
    let result = this.allRandomHotels;
    this.isFiltered = false;

    if (this.selectedRegion !== 'Semua') {
      // Grouping Bali region as one if selected "Bali"
      if (this.selectedRegion === 'Bali') {
         result = result.filter(h => h.region.includes('Bali'));
      } else {
         result = result.filter(h => h.region === this.selectedRegion);
      }
      this.isFiltered = true;
    }

    if (this.searchQuery && this.searchQuery.trim() !== '') {
      const q = this.searchQuery.toLowerCase().trim();
      result = result.filter(h => this.getHotelName(h).toLowerCase().includes(q));
      this.isFiltered = true;
    }

    this.filteredHotels = result;
    
    if (this.isFiltered) {
      this.displayedHotels = this.filteredHotels;
      this.hasMoreToShow = false;
    } else {
      this.displayedHotels = this.filteredHotels.slice(0, this.itemsToShow);
      this.hasMoreToShow = this.filteredHotels.length > this.itemsToShow;
    }
  }

  showMore() {
    this.itemsToShow = 40;
    this.filterHotels();
  }

  getHotelName(hotel: Hotel): string {
    return hotel.name || hotel.brand || 'Hotel Tidak Diketahui';
  }

  openDestinationModal(hotel: Hotel) {
    this.selectedHotel = hotel;
  }

  closeModal() {
    this.selectedHotel = null;
  }
}
