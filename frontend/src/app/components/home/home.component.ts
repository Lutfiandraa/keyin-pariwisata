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
  }

  ngOnDestroy() {
    if (this.typingTimeout) clearTimeout(this.typingTimeout);
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
