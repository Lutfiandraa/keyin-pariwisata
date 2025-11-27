import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinationService, Destination } from '../../services/destination.service';
import { DestinationModalComponent } from '../destination-modal/destination-modal.component';

@Component({
  selector: 'app-recommend',
  standalone: true,
  imports: [CommonModule, DestinationModalComponent],
  template: `
    <div class="relative min-h-screen bg-gray-50 dark:bg-[#1e1e1e]">
      <!-- Content -->
      <div class="relative z-10 min-h-screen flex flex-col">
        <!-- Title Section with Animation -->
        <div class="pt-20 sm:pt-24 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-12 animate-fade-in-up">
          <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal leading-tight text-gray-900 dark:text-gray-100" 
              style="font-family: 'Odor Mean Chey', serif;">
            Recommended
          </h1>
        </div>

        <!-- Tour Cards Section - Aligned with title -->
        <div class="flex-1 flex items-start justify-start px-3 sm:px-4 md:px-6 lg:px-12 pb-12 sm:pb-16 lg:pb-20">
          <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 w-full">
            <div *ngFor="let tour of tours; let i = index" 
                 class="bg-white dark:bg-[#252526] rounded-2xl shadow-2xl overflow-hidden card-hover animate-pop-in" 
                 [class]="'stagger-' + (i + 1)"
                 style="opacity: 0; animation-fill-mode: forwards;">
              <div class="h-[140px] sm:h-[160px] md:h-[180px] lg:h-[200px] overflow-hidden relative group">
                <img [src]="tour.image" [alt]="tour.name" 
                     class="w-full h-full object-cover image-zoom">
                <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div class="p-3 sm:p-4 bg-white dark:bg-[#252526]">
                <h3 class="text-sm sm:text-base font-bold text-gray-900 dark:text-gray-100 tracking-tight line-clamp-1 mb-3">{{ tour.name }}</h3>
                <button (click)="openDestinationModal(tour.name)" class="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-3 sm:px-4 rounded-lg transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- See More Button - Bottom Right with Animation -->
        <div class="fixed sm:absolute bottom-4 right-4 sm:bottom-8 sm:right-8 lg:bottom-12 lg:right-12 z-20 animate-slide-in-right">
          <button class="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-yellow-400/50 text-xs sm:text-sm lg:text-base button-pulse active:scale-95">
            see more
          </button>
        </div>
      </div>
      
      <!-- Destination Modal -->
      <app-destination-modal 
        [destination]="selectedDestination" 
        (close)="closeModal()">
      </app-destination-modal>
    </div>
  `,
  styleUrl: './recommend.component.css'
})
export class RecommendComponent {
  selectedDestination: Destination | null = null;

  constructor(private destinationService: DestinationService) {}

  openDestinationModal(destinationName: string) {
    const destination = this.destinationService.getDestinationByName(destinationName);
    if (destination) {
      this.selectedDestination = destination;
    }
  }

  closeModal() {
    this.selectedDestination = null;
  }

  tours = [
    {
      id: 1,
      name: 'Mecca',
      price: '$5,42k',
      duration: '10 Days Trip',
      image: 'assets/kabah.png'
    },
    {
      id: 2,
      name: 'Georgia',
      price: '$5,42k',
      duration: '10 Days Trip',
      image: 'assets/georgia.png'
    },
    {
      id: 3,
      name: 'Russia',
      price: '$5,42k',
      duration: '10 Days Trip',
      image: 'assets/rusia.png'
    },
    {
      id: 4,
      name: 'Spain',
      price: '$5,42k',
      duration: '10 Days Trip',
      image: 'assets/Spain.png'
    },
    {
      id: 5,
      name: 'Swiss',
      price: '$5,42k',
      duration: '10 Days Trip',
      image: 'assets/swiss.png'
    },
    {
      id: 6,
      name: 'Turkey',
      price: '$5,42k',
      duration: '10 Days Trip',
      image: 'assets/tukery.png'
    },
    {
      id: 7,
      name: 'Cotswold',
      price: '$5,42k',
      duration: '10 Days Trip',
      image: 'assets/cotswold.jpg'
    },
    {
      id: 8,
      name: 'Denmark',
      price: '$5,42k',
      duration: '10 Days Trip',
      image: 'assets/denmark.jpg'
    },
    {
      id: 9,
      name: 'Al - Ula',
      price: '$5,42k',
      duration: '10 Days Trip',
      image: 'assets/al-ula.png'
    },
    {
      id: 10,
      name: 'Palestine',
      price: '$5,42k',
      duration: '10 Days Trip',
      image: 'assets/palestine.png'
    },
    {
      id: 11,
      name: 'Palm Jumeirah',
      price: '$5,42k',
      duration: '10 Days Trip',
      image: 'assets/palmjumeira.png'
    },
    {
      id: 12,
      name: 'Egypt',
      price: '$5,42k',
      duration: '10 Days Trip',
      image: 'assets/egypt.png'
    },
    {
      id: 13,
      name: 'Monaco',
      price: '$5,42k',
      duration: '10 Days Trip',
      image: 'assets/monaco.png'
    }
  ];
}

