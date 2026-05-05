import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface FavoriteItem {
  id: string | number;
  name: string;
  price: string;
  image: string;
  type: 'car' | 'bundle' | 'destination';
  dates?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favoritesSubject = new BehaviorSubject<FavoriteItem[]>([]);
  favorites$ = this.favoritesSubject.asObservable();

  constructor() {
    // Load from localStorage if available
    const saved = localStorage.getItem('keyin_favorites');
    if (saved) {
      this.favoritesSubject.next(JSON.parse(saved));
    }
  }

  toggleFavorite(item: FavoriteItem) {
    const current = this.favoritesSubject.value;
    const index = current.findIndex(f => f.id === item.id && f.type === item.type);
    
    let updated;
    if (index >= 0) {
      updated = current.filter((_, i) => i !== index);
    } else {
      updated = [...current, item];
    }
    
    this.favoritesSubject.next(updated);
    localStorage.setItem('keyin_favorites', JSON.stringify(updated));
  }

  isFavorite(id: string | number, type: string): boolean {
    return this.favoritesSubject.value.some(f => f.id === id && f.type === type);
  }

  getFavoriteCount(): number {
    return this.favoritesSubject.value.length;
  }
}
