# Pariwisata Frontend - Angular Modern + TypeScript + TailwindCSS

Aplikasi web frontend menggunakan Angular Modern (v18), TypeScript, dan TailwindCSS.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Menjalankan Development Server
```bash
ng serve
# atau
npm start
```

Aplikasi akan otomatis terbuka di browser di `http://localhost:4200`

## 📜 Available Commands

- **`ng serve`** atau **`npm start`** - Menjalankan development server dengan hot reload
- **`ng build`** atau **`npm run build`** - Build aplikasi untuk production
- **`ng build --watch`** atau **`npm run watch`** - Build dan watch untuk perubahan file
- **`ng test`** atau **`npm test`** - Menjalankan unit tests

## 📁 Struktur Project

```
frontend/
├── src/
│   ├── app/
│   │   ├── app.component.ts    # Main component
│   │   └── app.routes.ts       # Routing configuration
│   ├── index.html              # HTML template
│   ├── main.ts                 # Entry point aplikasi
│   └── styles.css              # TailwindCSS styles
├── angular.json                 # Angular CLI configuration
├── package.json
├── tsconfig.json               # TypeScript configuration
└── tailwind.config.js          # TailwindCSS configuration
```

## 🛠️ Teknologi

- **Angular 18.0** - Framework modern untuk web applications
- **TypeScript 5.4** - Superset JavaScript dengan type checking
- **TailwindCSS 3.3.6** - Utility-first CSS framework
- **Angular CLI** - Command line interface untuk Angular

## 🎯 Perbedaan dengan AngularJS

| Fitur | AngularJS (1.x) | Angular Modern (2+) |
|-------|----------------|---------------------|
| CLI | Tidak ada | `ng serve`, `ng build`, dll |
| Command | `npm start` | `ng serve` ✅ |
| TypeScript | Optional | Default |
| Architecture | MVC | Component-based |
| Version | 1.8.3 | 18.0.0 |

## 🔧 Development

Setelah menjalankan `ng serve`, aplikasi akan:
- Berjalan di `http://localhost:4200`
- Auto-reload saat ada perubahan file
- Hot module replacement aktif
- Source maps untuk debugging

## 📝 Catatan

- Gunakan **`ng serve`** untuk development (bukan `npm start` untuk AngularJS)
- Angular Modern menggunakan standalone components secara default
- TailwindCSS sudah dikonfigurasi dan siap digunakan
