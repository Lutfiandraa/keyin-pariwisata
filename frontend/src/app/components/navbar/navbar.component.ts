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
  menuItems = [
    { label: 'Home', route: '/', active: false },
    { label: 'Recommend', route: '/recommend', active: false },
    { label: 'Bundling', route: '/bundling', active: false },
    { label: 'Car Rentals', route: '/car-rentals', active: false }
  ];

  constructor(private router: Router) {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = scrollPosition > 50;
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
