import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isScrolled = false;
  isNavbarVisible = true;
  isManuallyHidden = false; // Track manual hide state
  lastScrollTop = 0;
  scrollThreshold = 10; // Minimum scroll distance to trigger hide/show
  isDarkMode = false; // Dark mode state
  menuItems = [
    { label: 'Home', route: '/', active: false },
    { label: 'Recommend', route: '/recommend', active: false },
    { label: 'Bundling', route: '/bundling', active: false },
    { label: 'Car Rentals', route: '/car-rentals', active: false }
  ];

  constructor(private router: Router) {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    // Don't auto-hide/show if manually controlled
    if (this.isManuallyHidden) {
      return;
    }

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    
    // Update isScrolled for background change
    this.isScrolled = scrollPosition > 50;
    
    // Hide/show navbar based on scroll direction
    if (scrollPosition < this.scrollThreshold) {
      // At the top, always show navbar
      this.isNavbarVisible = true;
    } else if (scrollPosition > this.lastScrollTop && scrollPosition > 100) {
      // Scrolling down and past 100px - hide navbar
      this.isNavbarVisible = false;
    } else if (scrollPosition < this.lastScrollTop) {
      // Scrolling up - show navbar
      this.isNavbarVisible = true;
    }
    
    // Update last scroll position
    this.lastScrollTop = scrollPosition <= 0 ? 0 : scrollPosition;
  }

  toggleNavbar() {
    if (this.isNavbarVisible) {
      this.isManuallyHidden = true;
      this.isNavbarVisible = false;
    } else {
      this.isManuallyHidden = false;
      this.isNavbarVisible = true;
    }
  }

  ngOnInit() {
    // Set active based on current route
    this.updateActiveRoute(this.router.url);
    
    // Listen to route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.updateActiveRoute(event.url);
      });

    // Load dark mode preference from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode = true;
      this.applyDarkMode(true);
    } else {
      this.isDarkMode = false;
      this.applyDarkMode(false);
    }
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.applyDarkMode(this.isDarkMode);
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  applyDarkMode(isDark: boolean) {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  updateActiveRoute(url: string) {
    this.menuItems.forEach(menu => {
      if (url === menu.route || (menu.route === '/' && url === '/')) {
        menu.active = true;
      } else {
        menu.active = false;
      }
    });
  }

  setActive(item: any) {
    this.menuItems.forEach(menu => menu.active = false);
    item.active = true;
  }
}
