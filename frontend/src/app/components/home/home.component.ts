import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DestinationService, Destination } from '../../services/destination.service';
import { DestinationModalComponent } from '../destination-modal/destination-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, DestinationModalComponent],
  template: `
    <div class="relative min-h-screen bg-gray-50 dark:bg-[#1e1e1e]">
      <!-- Hero Section with Search Bar -->
      <div class="relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px] overflow-hidden">
      <!-- Background Image -->
      <div 
          class="absolute inset-0 bg-cover bg-center bg-no-repeat"
          [style.background-image]="'url(assets/default.png)'"
          style="transform: scale(1.1);">
          <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
      </div>

        <!-- Hero Content -->
        <div class="relative z-10 h-full flex flex-col items-center justify-center px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
          <div class="w-full max-w-4xl animate-fade-in-up">
            <div class="flex justify-center mb-3 sm:mb-4">
              <img src="assets/KeyInLogo.png" alt="KeyIn Logo" 
                   class="h-24 sm:h-32 md:h-40 lg:h-48 xl:h-56 w-auto max-w-full"
                   style="filter: drop-shadow(0 10px 25px rgba(0, 0, 0, 0.5)) drop-shadow(0 5px 10px rgba(0, 0, 0, 0.3)) contrast(1.2) brightness(1.1) saturate(1.15); image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;">
            </div>
            <p class="text-white/90 text-center text-sm sm:text-base md:text-lg mb-4 sm:mb-6 md:mb-8 drop-shadow px-2">
              Discover the World's Grandeur with Key-In.
            </p>

            <!-- Search Bar -->
            <div class="bg-white dark:bg-[#252526] rounded-xl sm:rounded-2xl shadow-2xl p-3 sm:p-4 lg:p-6">
              <div class="flex flex-col md:flex-row gap-3 sm:gap-4">
                <div class="flex-1">
                  <label class="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1 sm:mb-2">Destination</label>
                  <input 
                    type="text" 
                    [(ngModel)]="searchQuery"
                    (keyup.enter)="onSearch()"
                    placeholder="Where are you going?"
                    class="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400">
                </div>
                <div class="md:w-48">
                  <label class="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1 sm:mb-2">Check-in</label>
                  <input 
                    type="date" 
                    class="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-gray-100">
                </div>
                <div class="md:w-48">
                  <label class="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1 sm:mb-2">Check-out</label>
                  <input 
                    type="date" 
                    class="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-gray-100">
                </div>
                <div class="flex items-end">
                  <button (click)="onSearch()" class="w-full md:w-auto bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="container mx-auto px-3 sm:px-4 lg:px-8 py-8 sm:py-10 lg:py-12">
        <!-- Section Title -->
        <div class="mb-6 sm:mb-8">
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1 sm:mb-2">Popular Destinations</h2>
          <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">Explore these amazing places</p>
              </div>

        <!-- Grid Layout for Cards -->
        <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          <div *ngFor="let tour of tours; let i = index" 
               class="bg-white dark:bg-[#252526] rounded-xl shadow-lg overflow-hidden card-hover animate-pop-in" 
               [class]="'stagger-' + (i + 1)"
               style="opacity: 0; animation-fill-mode: forwards;">
            <div class="h-[140px] sm:h-[160px] md:h-[180px] lg:h-[200px] overflow-hidden relative group">
              <img [src]="tour.image" [alt]="tour.name" 
                   class="w-full h-full object-cover image-zoom">
              <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div class="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4">
                <h3 class="text-white font-bold text-sm sm:text-base lg:text-xl drop-shadow-lg line-clamp-1">{{ tour.name }}</h3>
              </div>
                </div>
            <div class="p-3 sm:p-4 lg:p-5">
              <button (click)="openDestinationModal(tour.name)" class="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-3 sm:px-4 rounded-lg transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm lg:text-base">
                View Details
              </button>
            </div>
          </div>
        </div>

        <!-- View More Section -->
        <div class="mt-8 sm:mt-10 lg:mt-12 text-center">
          <button routerLink="/recommend" class="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            See More Destinations
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
  styleUrl: './home.component.css'
})
export class HomeComponent {
  searchQuery: string = '';
  selectedDestination: Destination | null = null;

  constructor(private destinationService: DestinationService) {}

  onSearch() {
    if (!this.searchQuery.trim()) {
      return;
    }
    
    const destination = this.destinationService.getDestinationByName(this.searchQuery);
    if (destination) {
      this.selectedDestination = destination;
    } else {
      // If not found, navigate to recommend page
      window.location.href = '/recommend';
    }
  }

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
      name: 'Manhattan Penthouse',
      price: '$5,42k',
      duration: '10 Days Trip',
      image: 'assets/manhattan.png'
    },
    {
      id: 2,
      name: 'Al - Ula',
      price: '$5,42k',
      duration: '10 Days Trip',
      image: 'assets/al-ula.png'
    },
    {
      id: 3,
      name: 'Palestine',
      price: '$5,42k',
      duration: '10 Days Trip',
      image: 'assets/palestine.png'
    },
    {
      id: 4,
      name: 'Palm Jumeirah',
      price: '$5,42k',
      duration: '10 Days Trip',
      image: 'assets/palmjumeira.png'
    }
  ];
}

