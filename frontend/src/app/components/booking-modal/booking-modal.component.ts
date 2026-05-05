import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgIf, NgForOf, NgClass, CommonModule } from '@angular/common';

export interface BookingDetails {
  itemName: string;
  price: string;
  dates?: string;
  type?: string; // 'car' or 'bundle'
}

@Component({
  selector: 'app-booking-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="details" 
         class="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in"
         (click)="closeModal()">
      <div class="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-pop-in border border-gray-200 dark:border-gray-800"
           (click)="$event.stopPropagation()">
        
        <!-- Success Header -->
        <div class="bg-yellow-400 p-6 text-center">
          <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounce-short">
            <svg class="w-10 h-10 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-900">Booking Summary</h2>
          <p class="text-gray-800/80 text-sm font-medium">Thank you for choosing KeyIn Travel</p>
        </div>

        <!-- Bill Details -->
        <div class="p-6">
          <div class="space-y-4">
            <div class="flex justify-between items-start pb-4 border-b border-gray-100 dark:border-gray-800">
              <div>
                <p class="text-xs text-gray-500 uppercase tracking-wider mb-1">Item Reserved</p>
                <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100 leading-tight">{{ details.itemName }}</h3>
                <p *ngIf="details.dates" class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ details.dates }}</p>
              </div>
              <div class="text-right">
                <p class="text-xs text-gray-500 uppercase tracking-wider mb-1">Reference</p>
                <p class="text-sm font-mono font-bold text-yellow-600 dark:text-yellow-400">#KYI-{{ bookingRef }}</p>
              </div>
            </div>

            <div class="space-y-3 pt-2">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Base Price</span>
                <span class="font-semibold text-gray-900 dark:text-gray-100">{{ details.price }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Service Fee (5%)</span>
                <span class="font-semibold text-gray-900 dark:text-gray-100">${{ serviceFee }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600 dark:text-gray-400">Tax & Levies</span>
                <span class="font-semibold text-gray-900 dark:text-gray-100">$0.00</span>
              </div>
              
              <div class="pt-4 mt-2 border-t-2 border-dashed border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <span class="text-lg font-bold text-gray-900 dark:text-gray-100">Total Amount</span>
                <span class="text-2xl font-black text-yellow-500">{{ totalPrice }}</span>
              </div>
            </div>
          </div>

          <!-- Note -->
          <div class="mt-6 p-3 bg-gray-50 dark:bg-[#252526] rounded-xl border border-gray-100 dark:border-gray-800">
            <p class="text-[11px] text-gray-500 text-center leading-relaxed">
              A confirmation email has been sent to your registered address. Please complete the payment within 24 hours to secure your booking.
            </p>
          </div>

          <!-- Actions -->
          <div class="mt-8 flex flex-col gap-3">
            <button (click)="closeModal()" class="w-full bg-gray-900 dark:bg-yellow-400 text-white dark:text-gray-900 font-bold py-3 rounded-xl transition-all hover:scale-[1.02] shadow-xl">
              Proceed to Payment
            </button>
            <button (click)="closeModal()" class="w-full bg-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-sm font-semibold py-2">
              Download PDF Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes bounce-short {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-5px); }
    }
    .animate-bounce-short {
      animation: bounce-short 2s infinite;
    }
  `]
})
export class BookingModalComponent {
  @Input() details: BookingDetails | null = null;
  @Output() close = new EventEmitter<void>();

  bookingRef = Math.random().toString(36).substring(2, 8).toUpperCase();

  get serviceFee(): string {
    if (!this.details) return '0.00';
    const priceNum = parseFloat(this.details.price.replace(/[^0-9.]/g, ''));
    return (priceNum * 0.05).toFixed(2);
  }

  get totalPrice(): string {
    if (!this.details) return '$0.00';
    const priceNum = parseFloat(this.details.price.replace(/[^0-9.]/g, ''));
    const total = priceNum + parseFloat(this.serviceFee);
    return '$' + total.toLocaleString();
  }

  closeModal() {
    this.close.emit();
  }
}
