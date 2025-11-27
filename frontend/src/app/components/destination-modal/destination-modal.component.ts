import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Destination } from '../../services/destination.service';

@Component({
  selector: 'app-destination-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="destination" 
         class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
         (click)="closeModal()">
      <div class="bg-white dark:bg-[#252526] rounded-lg sm:rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] sm:max-h-[85vh] overflow-y-auto animate-pop-in"
           (click)="$event.stopPropagation()">
        <!-- Header -->
        <div class="relative h-40 sm:h-48 overflow-hidden">
          <img [src]="destination.image" [alt]="destination.name" 
               class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          <button (click)="closeModal()" 
                  class="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white/90 dark:bg-[#2d2d30]/90 hover:bg-white dark:hover:bg-[#2d2d30] text-gray-900 dark:text-gray-100 rounded-full p-1.5 sm:p-2 transition-all duration-300 transform hover:scale-110">
            <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <div class="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
            <h2 class="text-xl sm:text-2xl font-bold text-white drop-shadow-lg mb-1">{{ destination.name }}</h2>
            <p class="text-white/90 text-xs sm:text-sm drop-shadow line-clamp-2">{{ destination.description }}</p>
          </div>
        </div>
        
        <!-- Content -->
        <div class="p-4 sm:p-5">
          <div class="prose max-w-none">
            <h3 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">About {{ destination.name }}</h3>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base line-clamp-6">{{ destination.article }}</p>
          </div>
          
          <!-- Action Buttons -->
          <div class="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-3">
            <button class="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
              Book Now
            </button>
            <button (click)="closeModal()" 
                    class="flex-1 bg-gray-200 dark:bg-[#3e3e42] hover:bg-gray-300 dark:hover:bg-[#454545] text-gray-900 dark:text-gray-100 font-semibold px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg transition-all duration-300 text-sm sm:text-base">
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
  `]
})
export class DestinationModalComponent {
  @Input() destination: Destination | null = null;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}

