import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Car {
  id: number;
  name: string;
  type: string;
  capacity: string;
  transmission: string;
  features: string[];
  description: string;
  image: string;
  price: string;
}

@Component({
  selector: 'app-car-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="car" 
         class="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
         style="position: fixed; z-index: 9999;"
         (click)="closeModal()">
      <div class="bg-white rounded-lg sm:rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] sm:max-h-[85vh] overflow-y-auto animate-pop-in"
           (click)="$event.stopPropagation()">
        <!-- Header with Image -->
        <div class="relative h-48 sm:h-56 overflow-hidden">
          <img [src]="car.image" [alt]="car.name" 
               class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          <button (click)="closeModal()" 
                  class="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white/90 hover:bg-white text-gray-900 rounded-full p-1.5 sm:p-2 transition-all duration-300 transform hover:scale-110 shadow-lg">
            <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <div class="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
            <h2 class="text-xl sm:text-2xl lg:text-3xl font-bold text-white drop-shadow-lg mb-1">{{ car.name }}</h2>
            <p class="text-white/90 text-xs sm:text-sm drop-shadow">{{ car.type }}</p>
          </div>
        </div>
        
        <!-- Content -->
        <div class="p-4 sm:p-5 lg:p-6">
          <!-- Specifications -->
          <div class="grid grid-cols-2 gap-4 mb-5 sm:mb-6">
            <div class="bg-gray-50 rounded-lg p-3 sm:p-4">
              <div class="text-xs sm:text-sm text-gray-600 mb-1">Kapasitas</div>
              <div class="text-base sm:text-lg font-bold text-gray-900">{{ car.capacity }}</div>
            </div>
            <div class="bg-gray-50 rounded-lg p-3 sm:p-4">
              <div class="text-xs sm:text-sm text-gray-600 mb-1">Transmisi</div>
              <div class="text-base sm:text-lg font-bold text-gray-900">{{ car.transmission }}</div>
            </div>
          </div>

          <!-- Features -->
          <div class="mb-5 sm:mb-6">
            <h3 class="text-base sm:text-lg font-bold text-gray-900 mb-3">Fitur Utama</h3>
            <div class="flex flex-wrap gap-2">
              <span *ngFor="let feature of car.features" 
                    class="bg-yellow-100 text-yellow-800 text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full">
                {{ feature }}
              </span>
            </div>
          </div>

          <!-- Description -->
          <div class="mb-5 sm:mb-6">
            <h3 class="text-base sm:text-lg font-bold text-gray-900 mb-2">Deskripsi</h3>
            <p class="text-gray-700 leading-relaxed text-sm sm:text-base">{{ car.description }}</p>
          </div>

          <!-- Price -->
          <div class="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 mb-5 sm:mb-6">
            <div class="text-xs sm:text-sm text-gray-600 mb-1">Harga Sewa</div>
            <div class="text-2xl sm:text-3xl font-bold text-gray-900">{{ car.price }}</div>
          </div>
          
          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-3">
            <button class="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base shadow-lg">
              Book Now
            </button>
            <button (click)="closeModal()" 
                    class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg transition-all duration-300 text-sm sm:text-base">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .animate-fade-in {
      animation: fade-in 0.3s ease-out;
    }
    @keyframes pop-in {
      from { 
        opacity: 0;
        transform: scale(0.9) translateY(10px);
      }
      to { 
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }
    .animate-pop-in {
      animation: pop-in 0.3s ease-out;
    }
  `]
})
export class CarModalComponent implements OnChanges {
  @Input() car: Car | null = null;
  @Output() close = new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['car']) {
      console.log('CarModalComponent - car changed:', this.car);
    }
  }

  closeModal() {
    this.close.emit();
  }
}

