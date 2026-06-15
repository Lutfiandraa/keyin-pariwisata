import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hotel, DestinationService } from '../../services/destination.service';
import { FavoriteService } from '../../services/favorite.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-destination-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="hotel" 
         class="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
         (click)="closeModal()">
      <div class="bg-white dark:bg-[#252526] rounded-lg sm:rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] sm:max-h-[85vh] overflow-y-auto animate-pop-in"
           (click)="$event.stopPropagation()">
        <div class="relative h-40 sm:h-56 overflow-hidden bg-[#e0e0e0] flex items-center justify-center">
          <div *ngIf="!imageUrl" class="absolute inset-0 bg-[#e0e0e0] flex items-center justify-center">
            <span class="text-[#757575] font-bold text-xl px-4 text-center">{{ getDisplayName() }}</span>
          </div>
          <img *ngIf="imageUrl" [src]="imageUrl" [alt]="getDisplayName()" class="w-full h-full object-cover relative z-10">
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
          <button (click)="closeModal()" class="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white/90 dark:bg-[#2d2d30]/90 hover:bg-white dark:hover:bg-[#2d2d30] text-gray-900 dark:text-gray-100 rounded-full p-1.5 sm:p-2 transition-all duration-300 transform hover:scale-110 z-20 shadow-lg">
            <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
          <div class="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-20">
            <h2 class="text-xl sm:text-2xl font-bold text-white drop-shadow-lg mb-1">{{ getDisplayName() }}</h2>
            <p class="text-white/90 text-sm drop-shadow font-medium">{{ getRegionLabel() }}</p>
            <div class="flex items-center mt-1" *ngIf="hotel.stars">
              <svg *ngFor="let s of getStarsArray()" class="w-4 h-4 text-yellow-400 fill-current drop-shadow-md" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
            <div class="text-xs text-yellow-300 mt-1 font-semibold drop-shadow-md" *ngIf="!hotel.stars">Belum Terverifikasi</div>
          </div>
        </div>
        <div class="p-4 sm:p-5">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <h3 class="text-sm font-bold text-gray-900 dark:text-gray-100 mb-2 uppercase tracking-wide">Alamat</h3>
              <p class="text-sm text-gray-700 dark:text-gray-300 mb-4">{{ getFullAddress() || 'Alamat tidak tersedia' }}</p>
              <h3 class="text-sm font-bold text-gray-900 dark:text-gray-100 mb-2 uppercase tracking-wide">Kontak</h3>
              <div class="text-sm text-gray-700 dark:text-gray-300 space-y-1 mb-4">
                <p *ngIf="hotel.phone || hotel['contact:phone']" class="flex items-center"><svg class="w-4 h-4 mr-2 flex-shrink-0 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg> {{ hotel.phone || hotel['contact:phone'] }}</p>
                <p *ngIf="hotel['contact:email']" class="flex items-center"><svg class="w-4 h-4 mr-2 flex-shrink-0 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg> {{ hotel['contact:email'] }}</p>
                <p *ngIf="hotel.website || hotel['contact:website']" class="flex items-center"><svg class="w-4 h-4 mr-2 flex-shrink-0 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg> <a [href]="hotel.website || hotel['contact:website']" target="_blank" class="text-blue-500 hover:underline">Kunjungi Website</a></p>
                <p *ngIf="!hotel.phone && !hotel['contact:phone'] && !hotel['contact:email'] && !hotel.website && !hotel['contact:website']" class="text-gray-500 italic">Info kontak tidak tersedia</p>
              </div>
            </div>
            <div>
              <h3 class="text-sm font-bold text-gray-900 dark:text-gray-100 mb-2 uppercase tracking-wide">Fasilitas</h3>
              <div class="grid grid-cols-1 gap-2">
                <div *ngIf="hotel.internet_access" class="flex items-center text-sm text-gray-700 dark:text-gray-300"><svg class="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"></path></svg> Akses Internet</div>
                <div *ngIf="hotel.swimming_pool || hotel.pool" class="flex items-center text-sm text-gray-700 dark:text-gray-300"><svg class="w-4 h-4 mr-2 text-cyan-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 15s1.5-1 3-1 3 2 3 2 1.5 1 3 1 3-2 3-2 1.5-1 3-1 M4 19s1.5-1 3-1 3 2 3 2 1.5 1 3 1 3-2 3-2 1.5-1 3-1"></path></svg> Kolam Renang</div>
                <div *ngIf="hotel.breakfast" class="flex items-center text-sm text-gray-700 dark:text-gray-300"><svg class="w-4 h-4 mr-2 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15c0-4.418-4.03-8-9-8s-9 3.582-9 8h18zM3 15v4a2 2 0 002 2h14a2 2 0 002-2v-4M8 7V3m4 4V3m4 4V3"></path></svg> Sarapan</div>
                <div *ngIf="hotel.air_conditioning" class="flex items-center text-sm text-gray-700 dark:text-gray-300"><svg class="w-4 h-4 mr-2 text-sky-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2v20m0-20L9.5 4.5M12 2l2.5 2.5M12 22l-2.5-2.5m2.5 2.5l2.5-2.5M2 12h20m-20 0l2.5-2.5M2 12l2.5 2.5M22 12l-2.5-2.5M22 12l-2.5 2.5M4.929 4.929l14.142 14.142M4.929 4.929L7.4 3.5M4.929 4.929L3.5 7.4m14.142 14.142l-2.471 1.429M19.071 19.071L20.5 16.6m-15.571 2.471l14.142-14.142M4.929 19.071l1.429 2.471M4.929 19.071L3.5 16.6M19.071 4.929l2.471 1.429M19.071 4.929L16.6 3.5"></path></svg> AC</div>
                <div *ngIf="hotel.smoking" class="flex items-center text-sm text-gray-700 dark:text-gray-300">
                  <svg *ngIf="isSmokingAllowed()" class="w-4 h-4 mr-2 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <svg *ngIf="!isSmokingAllowed()" class="w-4 h-4 mr-2 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg>
                  <span>{{ isSmokingAllowed() ? 'Merokok Diizinkan' : 'Dilarang Merokok' }}</span>
                </div>
                <div *ngIf="hotel.wheelchair" class="flex items-center text-sm text-gray-700 dark:text-gray-300"><svg class="w-4 h-4 mr-2 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg> Ramah Difabel</div>
                <div *ngIf="!hasFacilities()" class="text-sm text-gray-500 italic">Informasi fasilitas tidak tersedia</div>
              </div>
            </div>
          </div>
          <div class="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-3">
            <button (click)="toggleFavorite()" 
                    class="flex-1 flex items-center justify-center gap-2 font-bold px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base border-2"
                    [class]="isFavorite() ? 'border-red-500 bg-red-50 text-red-500 dark:bg-red-500/10' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-[#3e3e42] text-gray-700 dark:text-gray-200'">
              <svg class="w-5 h-5" [class.fill-current]="isFavorite()" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
              {{ isFavorite() ? 'Hapus dari Favorit' : 'Tambah Favorit' }}
            </button>
            <button (click)="closeModal()" class="flex-1 bg-gray-200 dark:bg-[#3e3e42] hover:bg-gray-300 dark:hover:bg-[#454545] text-gray-900 dark:text-gray-100 font-semibold px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg transition-all duration-300 text-sm sm:text-base">
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
    .animate-fade-in { animation: fade-in 0.3s ease-out; }
  `]
})
export class DestinationModalComponent implements OnChanges {
  @Input() hotel: Hotel | null = null;
  @Output() close = new EventEmitter<void>();
  
  imageUrl: string | null = null;

  constructor(
    private favoriteService: FavoriteService,
    private destinationService: DestinationService,
    private http: HttpClient
  ) {}

  ngOnChanges() {
    this.imageUrl = null;
    if (this.hotel) {
      this.fetchImage();
    }
  }

  fetchImage() {
    if (!this.hotel) return;
    
    if (!this.hotel.latitude || !this.hotel.longitude) {
      this.applyFallback();
      return;
    }

    const urlGeo = `https://commons.wikimedia.org/w/api.php?action=query&generator=geosearch&ggsnamespace=6&ggscoord=${this.hotel.latitude}|${this.hotel.longitude}&ggsradius=1000&ggslimit=10&prop=imageinfo&iiprop=url&iiurlwidth=600&format=json&origin=*`;
    
    this.http.get<any>(urlGeo).subscribe({
      next: (res) => {
        const pages = res?.query?.pages;
        if (pages && Object.keys(pages).length > 0) {
          const pageIds = Object.keys(pages);
          for (let id of pageIds) {
            const thumburl = pages[id]?.imageinfo?.[0]?.thumburl;
            if (thumburl && !this.destinationService.isImageUsed(thumburl)) {
              this.imageUrl = thumburl;
              this.destinationService.markImageUsed(thumburl);
              return;
            }
          }
        }
        this.applyFallback();
      },
      error: () => this.applyFallback()
    });
  }

  applyFallback() {
    if (!this.hotel) return;
    const nameLength = this.hotel.name ? this.hotel.name.length : 1;
    let lockId = Math.floor(Math.abs((this.hotel.latitude || nameLength) * 10000)) % 10000;
    
    let fallbackUrl = `https://picsum.photos/seed/${lockId}/600/400`;
    
    // Prevent duplicate fallbacks by incrementing lockId
    while (this.destinationService.isImageUsed(fallbackUrl)) {
      lockId++;
      fallbackUrl = `https://picsum.photos/seed/${lockId}/600/400`;
    }
    
    this.imageUrl = fallbackUrl;
    this.destinationService.markImageUsed(fallbackUrl);
  }

  getDisplayName(): string {
    if (!this.hotel) return '';
    return this.hotel.name || this.hotel.brand || 'Hotel Tidak Diketahui';
  }

  getRegionLabel(): string {
    if (!this.hotel) return '';
    return this.destinationService.getRegionLabel(this.hotel.region);
  }

  getFullAddress(): string {
    if (!this.hotel) return '';
    const parts = [
      this.hotel['addr:street'],
      this.hotel['addr:district'],
      this.hotel['addr:city'],
      this.hotel['addr:province'],
      this.hotel['addr:postcode']
    ].filter(p => !!p);
    return parts.join(', ');
  }

  getStarsArray(): number[] {
    if (!this.hotel || !this.hotel.stars) return [];
    return Array(Math.floor(this.hotel.stars)).fill(0);
  }

  isSmokingAllowed(): boolean {
    if (!this.hotel || !this.hotel.smoking) return false;
    return this.hotel.smoking === 'yes' || this.hotel.smoking === 'true';
  }

  hasFacilities(): boolean {
    if (!this.hotel) return false;
    return !!(this.hotel.internet_access || this.hotel.swimming_pool || this.hotel.pool || 
              this.hotel.breakfast || this.hotel.air_conditioning || this.hotel.smoking || this.hotel.wheelchair);
  }

  isFavorite(): boolean {
    if (!this.hotel) return false;
    return this.favoriteService.isFavorite(this.hotel);
  }

  toggleFavorite() {
    if (this.hotel) {
      this.favoriteService.toggleFavorite(this.hotel);
    }
  }

  closeModal() {
    this.close.emit();
  }
}
