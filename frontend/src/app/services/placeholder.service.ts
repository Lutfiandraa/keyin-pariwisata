import { Injectable } from '@angular/core';
import { BehaviorSubject, from, of, timer } from 'rxjs';
import { concatMap, delay, repeat, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlaceholderService {
  private destinations = [
    "Mecca", "Georgia", "Russia", "Spain", "Swiss", "Turkey", 
    "Cotswold", "Denmark", "Al - Ula", "Palestine", 
    "Palm Jumeirah", "Egypt", "Monaco"
  ];
  
  private placeholderSubject = new BehaviorSubject<string>('');
  public currentPlaceholder$ = this.placeholderSubject.asObservable();

  constructor() {
    this.startTypewriter();
  }

  private startTypewriter() {
    let i = 0;
    const typeNext = () => {
      const word = this.destinations[i];
      this.typeWord(word).then(() => {
        setTimeout(() => {
          this.deleteWord(word).then(() => {
            i = (i + 1) % this.destinations.length;
            typeNext();
          });
        }, 1500); // Wait 1.5s after finishing word
      });
    };
    typeNext();
  }

  private async typeWord(word: string) {
    for (let j = 0; j <= word.length; j++) {
      this.placeholderSubject.next(word.substring(0, j) + '|');
      await new Promise(res => setTimeout(res, 100)); // Typing speed
    }
    this.placeholderSubject.next(word); // Remove cursor at end
  }

  private async deleteWord(word: string) {
    for (let j = word.length; j >= 0; j--) {
      this.placeholderSubject.next(word.substring(0, j) + '|');
      await new Promise(res => setTimeout(res, 50)); // Deleting speed
    }
  }
}
