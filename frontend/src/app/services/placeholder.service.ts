import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaceholderService {
  private destinations = [
    "Jakarta", "Bandung", "Bandar Lampung", "Bali",
    "Badung", "Gianyar", "Karangasem", "Klungkung"
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
        }, 1500);
      });
    };
    typeNext();
  }

  private async typeWord(word: string) {
    for (let j = 0; j <= word.length; j++) {
      this.placeholderSubject.next(word.substring(0, j) + '|');
      await new Promise(res => setTimeout(res, 100));
    }
    this.placeholderSubject.next(word);
  }

  private async deleteWord(word: string) {
    for (let j = word.length; j >= 0; j--) {
      this.placeholderSubject.next(word.substring(0, j) + '|');
      await new Promise(res => setTimeout(res, 50));
    }
  }
}
