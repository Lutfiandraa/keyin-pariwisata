import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Hotel } from './destination.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favoritesSubject = new BehaviorSubject<Hotel[]>([]);
  favorites$ = this.favoritesSubject.asObservable();

  constructor() {
    // Load from localStorage if available
    const saved = localStorage.getItem('hotel_favorites');
    if (saved) {
      try {
        this.favoritesSubject.next(JSON.parse(saved));
      } catch(e) {
        console.error('Failed to parse favorites', e);
      }
    }
  }

  addFavorite(hotel: Hotel): void {
    const current = this.favoritesSubject.value;
    if (!this.isFavorite(hotel)) {
      const updated = [...current, hotel];
      this.favoritesSubject.next(updated);
      localStorage.setItem('hotel_favorites', JSON.stringify(updated));
    }
  }

  removeFavorite(hotel: Hotel): void {
    const current = this.favoritesSubject.value;
    const updated = current.filter(f => !(f.name === hotel.name && f.latitude === hotel.latitude && f.longitude === hotel.longitude));
    this.favoritesSubject.next(updated);
    localStorage.setItem('hotel_favorites', JSON.stringify(updated));
  }

  toggleFavorite(hotel: Hotel): void {
    if (this.isFavorite(hotel)) {
      this.removeFavorite(hotel);
    } else {
      this.addFavorite(hotel);
    }
  }

  getFavorites(): Hotel[] {
    return this.favoritesSubject.value;
  }

  isFavorite(hotel: Hotel): boolean {
    return this.favoritesSubject.value.some(f => f.name === hotel.name && f.latitude === hotel.latitude && f.longitude === hotel.longitude);
  }
}
