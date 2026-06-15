import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export interface Hotel {
  name: string;
  region: string;
  tourism: string | null;
  stars: number | null;
  rooms: number | null;
  'addr:street': string | null;
  'addr:city': string | null;
  'addr:district': string | null;
  'addr:postcode': string | null;
  'addr:province': string | null;
  phone: string | null;
  'contact:phone': string | null;
  'contact:email': string | null;
  'contact:website': string | null;
  website: string | null;
  opening_hours: string | null;
  internet_access: string | null;
  swimming_pool: string | null;
  pool: string | null;
  breakfast: string | null;
  air_conditioning: string | null;
  smoking: string | null;
  wheelchair: string | null;
  operator: string | null;
  brand: string | null;
  'building:levels': number | null;
  latitude: number;
  longitude: number;
}

export interface HotelWithImage extends Hotel {
  imageUrl?: string;
}

export const REGION_MAP: { [key: string]: string } = {
  'DKI Jakarta, Indonesia': 'DKI Jakarta',
  'Kota Bandung, Jawa Barat, Indonesia': 'Bandung',
  'Kota Bandar Lampung, Lampung, Indonesia': 'Lampung',
  'Bali, Indonesia': 'Bali'
};

@Injectable({
  providedIn: 'root'
})
export class DestinationService {
  private hotelsSubject = new BehaviorSubject<Hotel[]>([]);
  hotels$ = this.hotelsSubject.asObservable();
  
  // Track used image URLs to prevent duplicates across components
  private usedImageUrls = new Set<string>();

  isImageUsed(url: string): boolean {
    return this.usedImageUrls.has(url);
  }

  markImageUsed(url: string): void {
    this.usedImageUrls.add(url);
  }

  fetchImage(hotel: HotelWithImage) {
    if (!hotel.latitude || !hotel.longitude) {
      this.applyFallback(hotel);
      return;
    }

    const urlGeo = `https://commons.wikimedia.org/w/api.php?action=query&generator=geosearch&ggsnamespace=6&ggscoord=${hotel.latitude}|${hotel.longitude}&ggsradius=1000&ggslimit=10&prop=imageinfo&iiprop=url&iiurlwidth=600&format=json&origin=*`;
    
    this.http.get<any>(urlGeo).subscribe({
      next: (res) => {
        const pages = res?.query?.pages;
        if (pages && Object.keys(pages).length > 0) {
          const pageIds = Object.keys(pages);
          for (let id of pageIds) {
            const thumburl = pages[id]?.imageinfo?.[0]?.thumburl;
            if (thumburl && !this.isImageUsed(thumburl)) {
              hotel.imageUrl = thumburl;
              this.markImageUsed(thumburl);
              return;
            }
          }
        }
        this.applyFallback(hotel);
      },
      error: () => this.applyFallback(hotel)
    });
  }

  applyFallback(hotel: HotelWithImage) {
    const nameLength = hotel.name ? hotel.name.length : 1;
    let lockId = Math.floor(Math.abs((hotel.latitude || nameLength) * 10000)) % 10000;
    
    let fallbackUrl = `https://picsum.photos/seed/${lockId}/600/400`;
    
    while (this.isImageUsed(fallbackUrl)) {
      lockId++;
      fallbackUrl = `https://picsum.photos/seed/${lockId}/600/400`;
    }
    
    hotel.imageUrl = fallbackUrl;
    this.markImageUsed(fallbackUrl);
  }

  constructor(private http: HttpClient) {
    this.loadHotels();
  }

  private loadHotels() {
    this.http.get<Hotel[]>('assets/datahotel/hotels_indonesia.json').subscribe({
      next: (data) => {
        this.hotelsSubject.next(data);
      },
      error: (err) => console.error('Gagal memuat data hotel', err)
    });
  }

  getHotels(): Hotel[] {
    return this.hotelsSubject.value;
  }

  getHotelsByRegion(region: string): Hotel[] {
    return this.getHotels().filter(h => h.region === region);
  }

  getRandomHotels(count: number): Hotel[] {
    const shuffled = [...this.getHotels()].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  getRandomHotelsByRegion(region: string, count: number): Hotel[] {
    const regionHotels = region.includes('Bali') 
      ? this.getHotels().filter(h => h.region.includes('Bali'))
      : this.getHotelsByRegion(region);
    const shuffled = [...regionHotels].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  getRegionLabel(fullRegion: string): string {
    if (fullRegion.includes('Bali')) return 'Bali';
    return REGION_MAP[fullRegion] || fullRegion;
  }
}
