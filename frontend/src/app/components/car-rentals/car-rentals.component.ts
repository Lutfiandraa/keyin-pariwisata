import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarModalComponent, Car } from '../car-modal/car-modal.component';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-car-rentals',
  standalone: true,
  imports: [CommonModule, CarModalComponent],
  template: `
    <div class="relative min-h-screen overflow-hidden">
      <!-- Background Image with Overlay -->
      <div 
        class="fixed inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out"
        style="background-image: url(assets/nusa-penida-island-nature.jpg); transform: scale(1.05);">
        <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30"></div>
      </div>

      <!-- Content Overlay -->
      <div class="relative z-10 min-h-screen flex flex-col">
        <!-- Title Section with Animation -->
        <div class="pt-20 sm:pt-24 pb-6 sm:pb-8 px-6 sm:px-8 lg:px-12 animate-fade-in-up">
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal leading-tight text-white drop-shadow-lg" 
              style="font-family: 'Odor Mean Chey', serif; text-shadow: 0 2px 10px rgba(0,0,0,0.3);">
            Rental Mobil
          </h1>
        </div>

        <!-- Car Cards Section -->
        <div class="flex-1 flex items-start justify-start px-5 sm:px-6 md:px-8 lg:px-12 pb-12 sm:pb-16 lg:pb-20">
          <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6 lg:gap-8 w-full">
            <div *ngFor="let car of cars; let i = index" 
                 class="bg-white dark:bg-[#252526] rounded-2xl shadow-2xl overflow-hidden card-hover animate-pop-in" 
                 [class]="'stagger-' + (i + 1)"
                 style="opacity: 0; animation-fill-mode: forwards;">
              <div class="h-[140px] sm:h-[160px] md:h-[180px] lg:h-[200px] overflow-hidden relative group">
                <img [src]="car.image" [alt]="car.name" class="w-full h-full object-cover image-zoom">
                <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                
                <!-- Favorite Button -->
                <button (click)="toggleFavorite(car, $event)" 
                        class="absolute top-2 right-2 z-20 p-1.5 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg"
                        [class]="isFavorite(car) ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-400 hover:text-red-500'">
                  <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" [class.fill-current]="isFavorite(car)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                </button>
              </div>
              <div class="p-3 sm:p-4 bg-white dark:bg-[#252526]">
                <h3 class="text-sm sm:text-base font-bold text-gray-900 dark:text-gray-100 tracking-tight line-clamp-1 mb-3">{{ car.name }}</h3>
                <div class="flex flex-col gap-2">
                  <button (click)="openCarModal(car.id)" class="w-full bg-gray-100 dark:bg-[#3e3e42] text-gray-900 dark:text-gray-100 font-semibold py-1.5 rounded-lg text-xs transition-all hover:bg-gray-200">
                    Detail
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Car Modal -->
      <app-car-modal [car]="selectedCar" (close)="closeModal()"></app-car-modal>
    </div>
  `,
  styleUrl: './car-rentals.component.css'
})
export class CarRentalsComponent {
  selectedCar: any = null;

  constructor(public favoriteService: FavoriteService) {}

  toggleFavorite(car: any, event: MouseEvent) {
    event.stopPropagation();
    // Car favorites use old system — keep compatible
    const item = {
      name: car.name,
      region: '',
      tourism: null,
      stars: null,
      rooms: null,
      'addr:street': null,
      'addr:city': null,
      'addr:district': null,
      'addr:postcode': null,
      'addr:province': null,
      phone: null,
      'contact:phone': null,
      'contact:email': null,
      'contact:website': null,
      website: null,
      opening_hours: null,
      internet_access: null,
      swimming_pool: null,
      pool: null,
      breakfast: null,
      air_conditioning: null,
      smoking: null,
      wheelchair: null,
      operator: null,
      brand: null,
      'building:levels': null,
      latitude: car.id,
      longitude: car.id,
      imageUrl: car.image
    };
    this.favoriteService.toggleFavorite(item as any);
  }

  isFavorite(car: any): boolean {
    return this.favoriteService.isFavorite({
      name: car.name,
      latitude: car.id,
      longitude: car.id
    } as any);
  }

  openCarModal(carId: number) {
    this.selectedCar = this.carDetails.find(c => c.id === carId) || null;
  }

  closeModal() { this.selectedCar = null; }

  cars = [
    { id: 1, name: 'Mercedes-Benz Sprinter', image: 'assets/sprinter.png' },
    { id: 2, name: 'Mercedes-Benz V Class', image: 'assets/vclass.png' },
    { id: 3, name: 'Hyundai Staria', image: 'assets/staria.png' },
    { id: 4, name: 'Mercedes-Benz S Class', image: 'assets/sclass.png' },
    { id: 5, name: 'BMW 720', image: 'assets/bmw720.png' }
  ];

  carDetails = [
    { id: 1, name: 'Mercedes-Benz Sprinter', type: 'Van Mewah', capacity: '12-15 Penumpang', transmission: 'Otomatis', features: ['AC', 'Audio', 'Kenyamanan'], description: 'Van mewah untuk rombongan besar.', image: 'assets/sprinter.png' },
    { id: 2, name: 'Mercedes-Benz V Class', type: 'MPV Mewah', capacity: '7-8 Penumpang', transmission: 'Otomatis', features: ['AC Premium', 'Kulit'], description: 'MPV mewah untuk bisnis.', image: 'assets/vclass.png' },
    { id: 3, name: 'Hyundai Staria', type: 'MPV Modern', capacity: '7-9 Penumpang', transmission: 'Otomatis', features: ['Desain Modern', 'Keamanan'], description: 'MPV berdesain futuristik.', image: 'assets/staria.png' },
    { id: 4, name: 'Mercedes-Benz S Class', type: 'Sedan Mewah', capacity: '4-5 Penumpang', transmission: 'Otomatis', features: ['MBUX', 'Pijat'], description: 'Kemewahan kelas dunia.', image: 'assets/sclass.png' },
    { id: 5, name: 'BMW 720', type: 'Sedan Mewah', capacity: '4-5 Penumpang', transmission: 'Otomatis', features: ['iDrive', 'Harman Kardon'], description: 'Performa dinamis.', image: 'assets/bmw720.png' }
  ];
}
