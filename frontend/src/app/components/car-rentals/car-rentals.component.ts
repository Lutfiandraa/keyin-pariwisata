import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinationService, Destination } from '../../services/destination.service';
import { DestinationModalComponent } from '../destination-modal/destination-modal.component';

@Component({
  selector: 'app-car-rentals',
  standalone: true,
  imports: [CommonModule, DestinationModalComponent],
  template: `
    <div class="relative min-h-screen overflow-hidden">
      <!-- Background Image with Overlay -->
      <div 
        class="fixed inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out"
        style="background-image: url(assets/default.png); transform: scale(1.05);">
        <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30"></div>
      </div>

      <!-- Content Overlay -->
      <div class="relative z-10 min-h-screen flex flex-col">
        <!-- Title Section with Animation -->
        <div class="pt-20 sm:pt-24 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-12 animate-fade-in-up">
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal leading-tight text-white drop-shadow-lg" 
              style="font-family: 'Odor Mean Chey', serif; text-shadow: 0 2px 10px rgba(0,0,0,0.3);">
            Car Rentals
          </h1>
        </div>

        <!-- Car Cards Section - Aligned with title -->
        <div class="flex-1 flex items-start justify-start px-3 sm:px-4 md:px-6 lg:px-12 pb-12 sm:pb-16 lg:pb-20">
          <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 w-full">
            <div *ngFor="let car of cars; let i = index" 
                 class="bg-white rounded-2xl shadow-2xl overflow-hidden card-hover animate-pop-in" 
                 [class]="'stagger-' + (i + 1)"
                 style="opacity: 0; animation-fill-mode: forwards;">
              <div class="h-[140px] sm:h-[160px] md:h-[180px] lg:h-[200px] overflow-hidden relative group">
                <img [src]="car.image" [alt]="car.name" 
                     class="w-full h-full object-cover image-zoom">
                <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div class="p-3 sm:p-4 bg-white">
                <h3 class="text-sm sm:text-base font-bold text-gray-900 tracking-tight line-clamp-1 mb-3">{{ car.name }}</h3>
                <button (click)="openDestinationModal(car.name)" class="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-3 sm:px-4 rounded-lg transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Destination Modal -->
      <app-destination-modal 
        [destination]="selectedDestination" 
        (close)="closeModal()">
      </app-destination-modal>
    </div>
  `,
  styleUrl: './car-rentals.component.css'
})
export class CarRentalsComponent {
  selectedDestination: Destination | null = null;

  constructor(private destinationService: DestinationService) {}

  openDestinationModal(carName: string) {
    // For cars, we might want to show a different modal or just use the service
    // For now, we'll try to find a matching destination or show car info
    const destination = this.destinationService.getDestinationByName(carName);
    if (destination) {
      this.selectedDestination = destination;
    }
  }

  closeModal() {
    this.selectedDestination = null;
  }

  cars = [
    {
      id: 1,
      name: 'Mercedes-Benz Sprinter',
      price: '$5,42k',
      duration: '10 Days Trip',
      image: 'assets/sprinter.png'
    },
    {
      id: 2,
      name: 'Mercedes-Benz V Class',
      price: '$5,42k',
      duration: '10 Days Trip',
      image: 'assets/vclass.png'
    },
    {
      id: 3,
      name: 'Hyundai Staria',
      price: '$5,42k',
      duration: '10 Days Trip',
      image: 'assets/staria.png'
    },
    {
      id: 4,
      name: 'Mercedes-Benz S Class',
      price: '$5,42k',
      duration: '10 Days Trip',
      image: 'assets/sclass.png'
    },
    {
      id: 5,
      name: 'BMW 720',
      price: '$5,42k',
      duration: '10 Days Trip',
      image: 'assets/bmw720.png'
    }
  ];
}

