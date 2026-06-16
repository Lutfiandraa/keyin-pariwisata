import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinationService, Hotel, HotelWithImage } from '../../services/destination.service';
import { DestinationModalComponent } from '../destination-modal/destination-modal.component';
import { FavoriteService } from '../../services/favorite.service';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recommend',
  standalone: true,
  imports: [CommonModule, DestinationModalComponent, RouterModule],
  template: `
    <div class="relative min-h-screen bg-cover bg-center bg-fixed" style="background-image: url('assets/nusa-penida-island-nature.jpg');">
      <div class="absolute inset-0 bg-white/40 dark:bg-[#121212]/50 z-0"></div>
      <!-- Content Overlay -->
      <div class="relative z-10 min-h-screen flex flex-col">
        <!-- Title Section with Animation -->
        <div class="pt-20 sm:pt-24 pb-6 sm:pb-8 px-6 sm:px-8 lg:px-12 animate-fade-in-up text-center">
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-tight text-gray-900 dark:text-gray-100" 
              style="font-family: 'Odor Mean Chey', serif;">
            Rekomendasi Destinasi
          </h1>
          <p class="text-gray-500 dark:text-gray-400 mt-2">Jelajahi berbagai pilihan hotel terbaik di setiap wilayah</p>
        </div>

        <div class="flex-1 flex flex-col gap-16 px-5 sm:px-6 md:px-8 lg:px-12 pb-12 sm:pb-16 lg:pb-20">
          
          <!-- Section: DKI Jakarta -->
          <section *ngIf="jakartaHotels.length > 0">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b-2 border-yellow-400 inline-block pb-2">DKI Jakarta</h2>
            <!-- Grid 3 Kolom, Gambar Besar di Atas -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              <div *ngFor="let hotel of jakartaHotels" class="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-xl overflow-hidden card-hover border border-gray-100 dark:border-gray-800 flex flex-col">
                <div class="h-[250px] overflow-hidden relative group bg-gray-200 dark:bg-gray-800">
                  <div *ngIf="!hotel.imageUrl" class="absolute inset-0 bg-[#e0e0e0] flex items-center justify-center">
                    <span class="text-[#757575] font-bold text-center px-2">{{ getHotelName(hotel) }}</span>
                  </div>
                  <img *ngIf="hotel.imageUrl" [src]="hotel.imageUrl" [alt]="getHotelName(hotel)" class="w-full h-full object-cover image-zoom relative z-10">
                  <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                  
                  <button (click)="toggleFavorite(hotel, $event)" 
                          class="absolute top-3 right-3 z-20 p-2 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg"
                          [class]="isFavorite(hotel) ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-400 hover:text-red-500'">
                    <svg class="w-4 h-4" [class.fill-current]="isFavorite(hotel)" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" stroke-width="2"/></svg>
                  </button>
                </div>
                <div class="p-4 flex flex-col flex-1">
                  <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100 leading-tight mb-2 line-clamp-2">{{ getHotelName(hotel) }}</h3>
                  <div class="flex justify-between items-center mb-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>{{ getRegionLabel(hotel.region) }}</span>
                    <div class="flex items-center" *ngIf="hotel.stars">
                      <svg class="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                      <span class="ml-1 font-bold">{{ hotel.stars }}</span>
                    </div>
                    <div *ngIf="!hotel.stars" class="text-[10px] bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">Belum Terverifikasi</div>
                  </div>
                  <button (click)="openDestinationModal(hotel)" class="mt-auto w-full bg-gray-100 dark:bg-[#2d2d30] text-gray-900 dark:text-gray-100 font-semibold py-2 rounded-lg text-sm transition-all hover:bg-gray-200">
                    Detail
                  </button>
                </div>
              </div>
            </div>
          </section>

          <!-- Section: Bandung -->
          <section *ngIf="bandungHotels.length > 0">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b-2 border-yellow-400 inline-block pb-2">Bandung</h2>
            <!-- Horizontal Scroll, Card Landscape -->
            <div class="flex overflow-x-auto gap-6 pb-6 snap-x hide-scroll">
              <div *ngFor="let hotel of bandungHotels" class="snap-start flex-none w-[320px] sm:w-[400px] bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row overflow-hidden card-hover">
                <div class="sm:w-2/5 h-40 sm:h-auto relative bg-gray-200 dark:bg-gray-800">
                  <div *ngIf="!hotel.imageUrl" class="absolute inset-0 bg-[#e0e0e0] flex items-center justify-center">
                    <span class="text-[#757575] text-xs font-bold text-center px-1">{{ getHotelName(hotel) }}</span>
                  </div>
                  <img *ngIf="hotel.imageUrl" [src]="hotel.imageUrl" [alt]="getHotelName(hotel)" class="w-full h-full object-cover relative z-10">
                  <button (click)="toggleFavorite(hotel, $event)" 
                          class="absolute top-2 left-2 z-20 p-1.5 rounded-full shadow-lg bg-white/80"
                          [class.text-red-500]="isFavorite(hotel)"
                          [class.text-gray-400]="!isFavorite(hotel)">
                    <svg class="w-4 h-4" [class.fill-current]="isFavorite(hotel)" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" stroke-width="2"/></svg>
                  </button>
                </div>
                <div class="sm:w-3/5 p-4 flex flex-col">
                  <h3 class="text-base font-bold text-gray-900 dark:text-gray-100 line-clamp-2 mb-1">{{ getHotelName(hotel) }}</h3>
                  <p class="text-xs text-gray-500 mb-2">{{ getRegionLabel(hotel.region) }}</p>
                  
                  <div class="flex items-center text-xs mb-3" *ngIf="hotel.stars">
                    <svg class="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    <span class="ml-1 font-bold dark:text-gray-300">{{ hotel.stars }}</span>
                  </div>
                  <div *ngIf="!hotel.stars" class="text-[10px] text-gray-500 mb-3 bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded inline-block w-max">Belum Terverifikasi</div>
                  
                  <button (click)="openDestinationModal(hotel)" class="mt-auto w-full bg-gray-100 dark:bg-[#2d2d30] text-gray-900 dark:text-gray-100 font-semibold py-1.5 rounded-lg text-xs transition-all hover:bg-gray-200">
                    Detail
                  </button>
                </div>
              </div>
            </div>
          </section>

          <!-- Section: Bandar Lampung -->
          <section *ngIf="lampungHotels.length > 0">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b-2 border-yellow-400 inline-block pb-2">Bandar Lampung</h2>
            <!-- List Style -->
            <div class="flex flex-col gap-4">
              <div *ngFor="let hotel of lampungHotels" class="bg-white dark:bg-[#1e1e1e] rounded-xl shadow-md border border-gray-100 dark:border-gray-800 flex flex-row overflow-hidden hover:shadow-lg transition-shadow">
                <div class="w-1/3 sm:w-1/4 lg:w-1/6 h-28 sm:h-32 relative bg-gray-200 dark:bg-gray-800">
                  <div *ngIf="!hotel.imageUrl" class="absolute inset-0 bg-[#e0e0e0] flex items-center justify-center">
                    <span class="text-[#757575] text-[10px] font-bold text-center px-1">{{ getHotelName(hotel) }}</span>
                  </div>
                  <img *ngIf="hotel.imageUrl" [src]="hotel.imageUrl" [alt]="getHotelName(hotel)" class="w-full h-full object-cover">
                </div>
                <div class="w-2/3 sm:w-3/4 lg:w-5/6 p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div class="flex-1">
                    <h3 class="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 line-clamp-1 mb-1">{{ getHotelName(hotel) }}</h3>
                    <p class="text-xs text-gray-500 mb-2">{{ getRegionLabel(hotel.region) }}</p>
                    <div class="flex items-center text-xs" *ngIf="hotel.stars">
                      <svg class="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                      <span class="ml-1 font-bold dark:text-gray-300">{{ hotel.stars }}</span>
                    </div>
                    <div *ngIf="!hotel.stars" class="text-[10px] text-gray-500 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded inline-block">Belum Terverifikasi</div>
                  </div>
                  <div class="flex flex-row sm:flex-col gap-2 mt-3 sm:mt-0 items-center sm:items-end min-w-[120px]">
                    <button (click)="toggleFavorite(hotel, $event)" 
                            class="p-2 rounded-full transition-all duration-300 bg-gray-100 dark:bg-[#2d2d30]"
                            [class.text-red-500]="isFavorite(hotel)"
                            [class.text-gray-400]="!isFavorite(hotel)">
                      <svg class="w-4 h-4" [class.fill-current]="isFavorite(hotel)" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" stroke-width="2"/></svg>
                    </button>
                    <button (click)="openDestinationModal(hotel)" class="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-1.5 px-4 rounded-lg text-xs transition-all w-full text-center">
                      Detail
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Section: Bali -->
          <section *ngIf="baliHotels.length > 0">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b-2 border-yellow-400 inline-block pb-2">Bali</h2>
            <!-- Grid 2 Kolom, Portrait Tinggi -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <div *ngFor="let hotel of baliHotels" class="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-xl overflow-hidden card-hover border border-gray-100 dark:border-gray-800 relative h-[400px] group flex flex-col">
                <div class="absolute inset-0 bg-gray-200 dark:bg-gray-800">
                  <div *ngIf="!hotel.imageUrl" class="absolute inset-0 bg-[#e0e0e0] flex items-center justify-center">
                    <span class="text-[#757575] font-bold text-center px-4">{{ getHotelName(hotel) }}</span>
                  </div>
                  <img *ngIf="hotel.imageUrl" [src]="hotel.imageUrl" [alt]="getHotelName(hotel)" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                </div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"></div>
                
                <button (click)="toggleFavorite(hotel, $event)" 
                        class="absolute top-4 right-4 z-20 p-2.5 rounded-full transition-all duration-300 bg-white/20 backdrop-blur-sm"
                        [class.text-red-500]="isFavorite(hotel)"
                        [class.text-white]="!isFavorite(hotel)">
                  <svg class="w-5 h-5" [class.fill-current]="isFavorite(hotel)" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" stroke-width="2"/></svg>
                </button>
                
                <div class="relative z-10 mt-auto p-6">
                  <div class="flex items-center text-xs mb-2" *ngIf="hotel.stars">
                    <svg class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    <span class="ml-1 font-bold text-white">{{ hotel.stars }} Bintang</span>
                  </div>
                  <div *ngIf="!hotel.stars" class="text-[10px] text-yellow-200 font-semibold mb-2">Belum Terverifikasi</div>
                  
                  <h3 class="text-2xl font-bold text-white leading-tight mb-1 line-clamp-2">{{ getHotelName(hotel) }}</h3>
                  <p class="text-sm text-gray-300 mb-4">{{ getRegionLabel(hotel.region) }}</p>
                  
                  <button (click)="openDestinationModal(hotel)" class="w-full bg-yellow-400 text-gray-900 font-bold py-2.5 rounded-lg text-sm transition-all hover:bg-yellow-500">
                    Detail
                  </button>
                </div>
              </div>
            </div>
          </section>

        </div>

        <!-- See More Button To Things To Do -->
        <div class="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-20">
          <button routerLink="/thingstodo" class="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-110 shadow-2xl active:scale-95">
            Things To Do
          </button>
        </div>
      </div>

      <!-- Destination Modal -->
      <app-destination-modal [hotel]="selectedHotel" (close)="closeModal()"></app-destination-modal>
    </div>
  `,
  styles: [`
    .hide-scroll::-webkit-scrollbar { display: none; }
    .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
  `]
})
export class RecommendComponent implements OnInit {
  selectedHotel: Hotel | null = null;
  
  jakartaHotels: HotelWithImage[] = [];
  bandungHotels: HotelWithImage[] = [];
  lampungHotels: HotelWithImage[] = [];
  baliHotels: HotelWithImage[] = [];

  constructor(
    private destinationService: DestinationService,
    public favoriteService: FavoriteService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.destinationService.hotels$.subscribe(hotels => {
      if (hotels && hotels.length > 0) {
        this.initSections();
      }
    });
  }

  initSections() {
    // DKI Jakarta: 17 hotel
    this.jakartaHotels = this.destinationService.getRandomHotelsByRegion('DKI Jakarta, Indonesia', 17);
    
    // Bandung: 20 hotel
    this.bandungHotels = this.destinationService.getRandomHotelsByRegion('Kota Bandung, Jawa Barat, Indonesia', 20);
    
    // Bandar Lampung: 9 hotel
    this.lampungHotels = this.destinationService.getRandomHotelsByRegion('Kota Bandar Lampung, Lampung, Indonesia', 9);
    
    // Bali: 16 hotel dari gabungan Badung, Gianyar, Karangasem, Klungkung
    const allBali = this.destinationService.getHotels().filter(h => h.region.includes('Bali'));
    const shuffledBali = [...allBali].sort(() => 0.5 - Math.random());
    this.baliHotels = shuffledBali.slice(0, 16);

    // Fetch images for all populated arrays
    [...this.jakartaHotels, ...this.bandungHotels, ...this.lampungHotels, ...this.baliHotels].forEach(h => this.destinationService.fetchImage(h));
  }

  getHotelName(hotel: Hotel): string {
    return hotel.name || hotel.brand || 'Hotel Tidak Diketahui';
  }

  getRegionLabel(region: string): string {
    return this.destinationService.getRegionLabel(region);
  }

  toggleFavorite(hotel: Hotel, event: MouseEvent) {
    event.stopPropagation();
    this.favoriteService.toggleFavorite(hotel);
  }

  isFavorite(hotel: Hotel): boolean {
    return this.favoriteService.isFavorite(hotel);
  }

  openDestinationModal(hotel: Hotel) {
    this.selectedHotel = hotel;
  }

  closeModal() { 
    this.selectedHotel = null; 
  }
}
