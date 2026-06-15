import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinationService, Hotel, HotelWithImage } from '../../services/destination.service';
import { FavoriteService } from '../../services/favorite.service';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-thingstodo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50 dark:bg-[#121212] pt-24 pb-16">
      <div class="container mx-auto px-5 sm:px-6 lg:px-8">
        
        <!-- Header -->
        <div class="mb-8 text-center animate-fade-in-up">
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4" style="font-family: 'Odor Mean Chey', serif;">
            Things To Do
          </h1>
          <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Jelajahi berbagai destinasi dan temukan kegiatan menarik di sekitar lokasi menginap Anda.
          </p>
        </div>

        <!-- Interactive Filters -->
        <div class="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in-up" style="animation-delay: 0.1s">
          <button (click)="setFilter('all')" [class.bg-yellow-400]="activeFilter === 'all'" [class.text-gray-900]="activeFilter === 'all'" [class.bg-white]="activeFilter !== 'all'" class="px-5 py-2.5 rounded-full font-bold shadow-md transition-all transform hover:scale-105 hover:bg-yellow-300 border border-gray-200 dark:border-gray-700 dark:bg-[#252526] dark:text-gray-200 text-sm flex items-center">
            <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Semua Destinasi
          </button>
          <button (click)="setFilter('pool')" [class.bg-yellow-400]="activeFilter === 'pool'" [class.text-gray-900]="activeFilter === 'pool'" [class.bg-white]="activeFilter !== 'pool'" class="px-5 py-2.5 rounded-full font-bold shadow-md transition-all transform hover:scale-105 hover:bg-yellow-300 border border-gray-200 dark:border-gray-700 dark:bg-[#252526] dark:text-gray-200 text-sm flex items-center">
            <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 15s1.5-1 3-1 3 2 3 2 1.5 1 3 1 3-2 3-2 1.5-1 3-1 M4 19s1.5-1 3-1 3 2 3 2 1.5 1 3 1 3-2 3-2 1.5-1 3-1"></path></svg>
            Kolam Renang
          </button>
          <button (click)="setFilter('wifi')" [class.bg-yellow-400]="activeFilter === 'wifi'" [class.text-gray-900]="activeFilter === 'wifi'" [class.bg-white]="activeFilter !== 'wifi'" class="px-5 py-2.5 rounded-full font-bold shadow-md transition-all transform hover:scale-105 hover:bg-yellow-300 border border-gray-200 dark:border-gray-700 dark:bg-[#252526] dark:text-gray-200 text-sm flex items-center">
            <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"></path></svg>
            WiFi Gratis
          </button>
          <button (click)="setFilter('breakfast')" [class.bg-yellow-400]="activeFilter === 'breakfast'" [class.text-gray-900]="activeFilter === 'breakfast'" [class.bg-white]="activeFilter !== 'breakfast'" class="px-5 py-2.5 rounded-full font-bold shadow-md transition-all transform hover:scale-105 hover:bg-yellow-300 border border-gray-200 dark:border-gray-700 dark:bg-[#252526] dark:text-gray-200 text-sm flex items-center">
            <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15c0-4.418-4.03-8-9-8s-9 3.582-9 8h18zM3 15v4a2 2 0 002 2h14a2 2 0 002-2v-4M8 7V3m4 4V3m4 4V3"></path></svg>
            Sarapan
          </button>
          <button (click)="setFilter('ac')" [class.bg-yellow-400]="activeFilter === 'ac'" [class.text-gray-900]="activeFilter === 'ac'" [class.bg-white]="activeFilter !== 'ac'" class="px-5 py-2.5 rounded-full font-bold shadow-md transition-all transform hover:scale-105 hover:bg-yellow-300 border border-gray-200 dark:border-gray-700 dark:bg-[#252526] dark:text-gray-200 text-sm flex items-center">
            <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2v20m0-20L9.5 4.5M12 2l2.5 2.5M12 22l-2.5-2.5m2.5 2.5l2.5-2.5M2 12h20m-20 0l2.5-2.5M2 12l2.5 2.5M22 12l-2.5-2.5M22 12l-2.5 2.5M4.929 4.929l14.142 14.142M4.929 4.929L7.4 3.5M4.929 4.929L3.5 7.4m14.142 14.142l-2.471 1.429M19.071 19.071L20.5 16.6m-15.571 2.471l14.142-14.142M4.929 19.071l1.429 2.471M4.929 19.071L3.5 16.6M19.071 4.929l2.471 1.429M19.071 4.929L16.6 3.5"></path></svg>
            Full AC
          </button>
        </div>

        <div *ngIf="displayedHotels.length === 0" class="text-center py-20 text-gray-500 font-semibold animate-fade-in">
          Belum ada destinasi yang cocok dengan filter ini.
        </div>

        <!-- Section 1: Featured Bento Box (Top Picks) -->
        <div *ngIf="displayedHotels.length >= 3" class="mb-14 animate-fade-in">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <svg class="w-6 h-6 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
            Destinasi Pilihan Teratas
          </h2>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:h-[380px]">
            <a *ngFor="let hotel of (displayedHotels | slice:0:3); let i = index" 
               [href]="'https://www.google.com/maps/search/wisata/@' + hotel.latitude + ',' + hotel.longitude + ',15z'" target="_blank" 
               class="h-72 sm:h-80 lg:h-full relative rounded-3xl overflow-hidden group shadow-xl hover:shadow-2xl transition-all cursor-pointer block"
               [class.sm:col-span-2]="i === 2" [class.lg:col-span-1]="i === 2">
              <div *ngIf="!hotel.imageUrl" class="absolute inset-0 bg-[#e0e0e0] flex items-center justify-center">
                <span class="text-[#757575] font-bold text-center px-4">{{ getHotelName(hotel) }}</span>
              </div>
              <img *ngIf="hotel.imageUrl" [src]="hotel.imageUrl" [alt]="getHotelName(hotel)" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110">
              
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
              
              <!-- Tag/Badge only for first -->
              <div *ngIf="i === 0" class="absolute top-4 left-4 z-20 bg-yellow-400 text-gray-900 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                #1 Recommended
              </div>
              <div *ngIf="i === 1" class="absolute top-4 left-4 z-20 bg-gray-100/90 backdrop-blur-sm text-gray-900 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                Top Rated
              </div>
              <div *ngIf="i === 2" class="absolute top-4 left-4 z-20 bg-gray-100/90 backdrop-blur-sm text-gray-900 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                Popular
              </div>

              <!-- Content -->
              <div class="absolute bottom-5 left-5 right-5 z-10">
                <p class="text-yellow-400 font-semibold text-xs mb-1.5 flex items-center">
                  <svg class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                  {{ getRegionLabel(hotel.region) }}
                </p>
                <h3 class="text-2xl font-bold text-white leading-tight mb-2 drop-shadow-md line-clamp-2">{{ getHotelName(hotel) }}</h3>
                <div class="flex items-center gap-3">
                  <div class="flex items-center text-xs" *ngIf="hotel.stars">
                    <svg class="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    <span class="ml-1 font-bold text-white">{{ hotel.stars }}</span>
                  </div>
                  <span class="text-white/80 text-[10px] font-semibold hidden sm:inline-block uppercase tracking-wider">Eksplorasi →</span>
                </div>
              </div>
            </a>
          </div>
        </div>

        <!-- Section 2: Horizontal Carousel (Trending) -->
        <div *ngIf="displayedHotels.length > 3" class="mb-14 animate-fade-in relative">
          <div class="flex justify-between items-end mb-6">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <svg class="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              Populer Saat Ini
            </h2>
            <div class="hidden sm:flex gap-2">
              <span class="text-sm text-gray-500 italic">Geser ke kanan →</span>
            </div>
          </div>
          
          <div class="flex overflow-x-auto hide-scroll gap-6 pb-6 snap-x snap-mandatory">
            <div *ngFor="let hotel of (displayedHotels | slice:3:11)" class="w-72 sm:w-80 flex-none snap-start bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 flex flex-col group hover:-translate-y-2 transition-all duration-300">
              <!-- Image Section -->
              <div class="h-48 relative bg-gray-200 dark:bg-gray-800 flex-shrink-0 overflow-hidden rounded-t-2xl">
                <img *ngIf="hotel.imageUrl" [src]="hotel.imageUrl" [alt]="getHotelName(hotel)" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                <button (click)="toggleFavorite(hotel)" class="absolute top-3 right-3 z-20 p-2 rounded-full shadow bg-white/20 backdrop-blur-sm transition-all hover:scale-110" [class.text-red-500]="isFavorite(hotel)" [class.text-white]="!isFavorite(hotel)">
                  <svg class="w-4 h-4" [class.fill-current]="isFavorite(hotel)" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                </button>
              </div>

              <!-- Details Section -->
              <div class="p-4 flex flex-col flex-grow">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white leading-tight mb-1 line-clamp-1">{{ getHotelName(hotel) }}</h3>
                <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">{{ getRegionLabel(hotel.region) }}</p>
                <div class="mt-auto pt-3 border-t border-gray-100 dark:border-gray-800">
                  <a [href]="'https://www.google.com/maps/search/wisata/@' + hotel.latitude + ',' + hotel.longitude + ',15z'" target="_blank" class="flex items-center justify-center w-full text-blue-600 dark:text-yellow-400 hover:text-blue-800 dark:hover:text-yellow-300 font-bold py-1 transition-all text-sm">
                    Eksplorasi Area
                    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 3: Standard Grid (Explore More) -->
        <div *ngIf="displayedHotels.length > 11" class="mb-8 animate-fade-in">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <svg class="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
            Eksplorasi Semua Destinasi
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div *ngFor="let hotel of (displayedHotels | slice:11)" class="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl group">
              <!-- Image Section -->
              <div class="h-40 relative bg-gray-200 dark:bg-gray-800 flex-shrink-0 overflow-hidden rounded-t-2xl">
                <img *ngIf="hotel.imageUrl" [src]="hotel.imageUrl" [alt]="getHotelName(hotel)" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <button (click)="toggleFavorite(hotel)" class="absolute top-2 right-2 z-20 p-2 rounded-full shadow bg-white/20 backdrop-blur-sm transition-all hover:scale-110" [class.text-red-500]="isFavorite(hotel)" [class.text-white]="!isFavorite(hotel)">
                  <svg class="w-4 h-4" [class.fill-current]="isFavorite(hotel)" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                </button>
              </div>
              <!-- Details Section -->
              <div class="p-4 flex flex-col flex-grow">
                <h3 class="text-base font-bold text-gray-900 dark:text-white leading-tight mb-1 line-clamp-1">{{ getHotelName(hotel) }}</h3>
                <p class="text-xs text-gray-500 mb-2">{{ getRegionLabel(hotel.region) }}</p>
                <!-- Facilities Mini -->
                <div class="mb-3 flex-grow">
                  <div class="flex flex-wrap gap-1" *ngIf="hasFacilities(hotel)">
                    <span *ngIf="hotel.internet_access" class="flex items-center bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[9px] px-1.5 py-0.5 rounded font-semibold"><svg class="w-2.5 h-2.5 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"></path></svg> WiFi</span>
                    <span *ngIf="hotel.swimming_pool || hotel.pool" class="flex items-center bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 text-[9px] px-1.5 py-0.5 rounded font-semibold"><svg class="w-2.5 h-2.5 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 15s1.5-1 3-1 3 2 3 2 1.5 1 3 1 3-2 3-2 1.5-1 3-1 M4 19s1.5-1 3-1 3 2 3 2 1.5 1 3 1 3-2 3-2 1.5-1 3-1"></path></svg> Kolam</span>
                    <span *ngIf="hotel.breakfast" class="flex items-center bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-[9px] px-1.5 py-0.5 rounded font-semibold"><svg class="w-2.5 h-2.5 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15c0-4.418-4.03-8-9-8s-9 3.582-9 8h18zM3 15v4a2 2 0 002 2h14a2 2 0 002-2v-4M8 7V3m4 4V3m4 4V3"></path></svg> Sarapan</span>
                  </div>
                </div>
                <!-- Action -->
                <div class="mt-auto">
                  <a [href]="'https://www.google.com/maps/search/wisata/@' + hotel.latitude + ',' + hotel.longitude + ',15z'" target="_blank" class="flex items-center justify-center w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 rounded-lg transition-all text-xs">
                    Lihat Peta
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Load More Button -->
        <div *ngIf="hasMore" class="flex justify-center mt-8 mb-8 animate-fade-in-up">
          <button (click)="loadMore()" class="bg-gray-900 dark:bg-[#252526] text-white dark:text-gray-100 border border-gray-700 hover:bg-gray-800 font-bold px-8 py-3.5 rounded-xl transition-all shadow-xl transform hover:scale-105 active:scale-95 flex items-center gap-2">
            <span>Muat Lebih Banyak</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
        </div>

      </div>
    </div>
  `,
  styles: [`
    @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
    .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
    
    /* Hide scrollbar for Chrome, Safari and Opera */
    .hide-scroll::-webkit-scrollbar {
      display: none;
    }
    /* Hide scrollbar for IE, Edge and Firefox */
    .hide-scroll {
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
    }
  `]
})
export class ThingsTodoComponent implements OnInit {
  allRandomHotels: HotelWithImage[] = [];
  displayedHotels: HotelWithImage[] = [];
  hasMore: boolean = false;
  itemsToShow: number = 35;
  activeFilter: string = 'all';

  constructor(
    private destinationService: DestinationService,
    public favoriteService: FavoriteService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.destinationService.hotels$.subscribe(hotels => {
      if (hotels && hotels.length > 0) {
        this.initData(hotels);
      }
    });
  }

  initData(allHotels: Hotel[]) {
    // 100 hotel random untuk page ini
    const shuffled = [...allHotels].sort(() => 0.5 - Math.random());
    this.allRandomHotels = shuffled.slice(0, 100).map(h => ({ ...h }));
    this.updateDisplayed();
  }

  setFilter(filter: string) {
    this.activeFilter = filter;
    this.itemsToShow = 35; // reset load more
    this.updateDisplayed();
  }

  updateDisplayed() {
    let filtered = this.allRandomHotels;
    
    if (this.activeFilter === 'pool') {
      filtered = filtered.filter(h => h.swimming_pool || h.pool);
    } else if (this.activeFilter === 'wifi') {
      filtered = filtered.filter(h => h.internet_access);
    } else if (this.activeFilter === 'breakfast') {
      filtered = filtered.filter(h => h.breakfast);
    } else if (this.activeFilter === 'ac') {
      filtered = filtered.filter(h => h.air_conditioning);
    }
    
    const currentBatch = filtered.slice(0, this.itemsToShow);
    
    // Fetch image for newly displayed hotels
    currentBatch.forEach(hotel => {
      if (!hotel.imageUrl && hotel.imageUrl !== '') {
         // Mark as empty initially so we don't refetch
         hotel.imageUrl = '';
         this.destinationService.fetchImage(hotel);
      }
    });

    this.displayedHotels = currentBatch;
    this.hasMore = filtered.length > this.itemsToShow;
  }

  loadMore() {
    this.itemsToShow += 24;
    this.updateDisplayed();
  }

  getHotelName(hotel: Hotel): string {
    return hotel.name || hotel.brand || 'Hotel Tidak Diketahui';
  }

  getRegionLabel(region: string): string {
    return this.destinationService.getRegionLabel(region);
  }

  hasFacilities(hotel: Hotel): boolean {
    return !!(hotel.internet_access || hotel.swimming_pool || hotel.pool || 
              hotel.breakfast || hotel.air_conditioning || hotel.smoking || hotel.wheelchair);
  }

  toggleFavorite(hotel: Hotel) {
    this.favoriteService.toggleFavorite(hotel);
  }

  isFavorite(hotel: Hotel): boolean {
    return this.favoriteService.isFavorite(hotel);
  }
}
