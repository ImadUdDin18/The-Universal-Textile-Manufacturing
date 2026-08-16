# 🧵 The Universal Textile Manufacturing Sdn Bhd
### Enterprise B2B Wholesale & Luxury Fabric E-Commerce Platform

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black&style=for-the-badge)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white&style=for-the-badge)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white&style=for-the-badge)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white&style=for-the-badge)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-D4AF37?style=for-the-badge)](LICENSE)

---

## 📌 Executive Overview

**The Universal Textile Manufacturing Sdn Bhd** is a production-grade digital platform engineered for high-volume fabric distribution, bespoke mill contracts, and international textile commerce. Headquartered at **Menara City One, Jalan Munshi Abdullah, Kuala Lumpur, Malaysia**, the platform serves global fashion houses, uniform contractors, interior designers, and bespoke ateliers.

This application unites client-facing luxury retail shopping, high-volume B2B contract quoting (RFQ), real-time logistics tracking, technical textile specification guides (GSM, yarn count, weave structure), and an integrated administrative inventory portal.

---

## ✨ Key Architectural Capabilities & Modules

### 🏛️ 1. Multi-View Architecture & Dynamic Routing
- **Home (`/`)**: Luxury showcase featuring ready warehouse counters (500,000+ meters in KL), trust badges, 48-hour global air dispatch, and curated fabric reels.
- **Product Catalog (`/catalog`)**: High-performance catalog of 24+ technical fabrics with multi-angle photography, real-time GSM sliders, fiber family filters, price ranges, and an instant **Grid View ↔ Wholesale Table View** toggle.
- **Textile & Weave Matrix (`/categories`)**: Technical textile encyclopedia detailing Pure Mulberry Silk, Giza Egyptian Cotton, French Normandy Linen, Technical Ripstop Poly, Super 150s Merino Wool, and Royal Songket Jacquard.
- **B2B Wholesale Hub (`/b2b`)**: Mill contract gateway with tiered volume discount brackets (10% to 30% off) and an **Interactive Order & Cargo Weight Estimator**.
- **Heritage & Manufacturing (`/about`)**: Story of the mill since 2008, Swiss Sulzer projectile loom technology, Kyocera 2400 DPI printheads, and OEKO-TEX® Standard 100 Class I certifications.
- **VIP Showroom & Inquiries (`/contact`)**: Showroom booking engine, transit directions (Masjid Jamek / Dang Wangi LRT), and direct WhatsApp API dispatch.
- **Shipment Telemetry (`/track-order`)**: Order progress telemetry tracker with timeline milestones from loom inspection and bolt cutting to customs clearance and final delivery.
- **Admin Inventory & Quotation Portal (`/admin`)**: Real-time stock meter adjustments, pricing controls, sample swatch cost updates, new SKU creator, and live customer quotation management.

---

### 🧮 2. Smart B2B Pricing & Volume Engine
Automated volume calculation formula with real-time currency conversion:
* **Tier 1 (Sample / Cut Length)**: 1 – 49 meters → *Standard Unit Rate*
* **Tier 2 (Roll Wholesale)**: 50 – 499 meters → **10% Instant Discount**
* **Tier 3 (Factory Contract)**: 500 – 1,999 meters → **20% Bulk Discount**
* **Tier 4 (Mill Container Lots)**: 2,000+ meters → **30% Enterprise Discount**

Includes an automated **Weight & Roll Calculation Module**:
$$\text{Total Weight (kg)} = \frac{\text{Length (m)} \times \text{Width (m)} \times \text{GSM}}{1000}$$
$$\text{Total Rolls} = \left\lceil \frac{\text{Length (m)}}{50\text{ m/roll}} \right\rceil$$

---

### 🌍 3. International Commerce & Localization
- **Multi-Currency Converter**: Live dynamic switching across **MYR (RM)**, **USD ($)**, **EUR (€)**, **GBP (£)**, **SGD (S$)**, and **PKR (Rs)**.
- **Trilingual Localization Engine**:
  - 🇬🇧 English (`en`)
  - 🇲🇾 Bahasa Melayu (`ms`)
  - 🇵🇰 Urdu / اردو (`ur` with RTL typography support)
- **Direct WhatsApp API Gateway**: One-click custom quotation dispatching formatted WhatsApp payloads directly to the factory floor (+60 16-249 2162).

---

## 🛠️ Technology Stack & Libraries

| Domain | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | **React 18** | Modern component-driven frontend architecture |
| **Language** | **TypeScript 5** | Strict type safety, shared domain interfaces & models |
| **Build Tool** | **Vite 5** | Lightning-fast HMR and optimized production bundling |
| **Styling** | **Tailwind CSS 3** | Bespoke luxury dark theme (`#0A0A0A`, `#D4AF37` metallic gold) |
| **Icons** | **Lucide React** | Clean, accessible SVG iconography |
| **Animations** | **Motion / CSS3** | Fluid modal transitions, backdrop blurs, and hover states |
| **State Management** | **React Context API** | Unified shop state, cart persistence, multi-currency rates |

---

## 📁 Project Directory Structure

```text
├── src/
│   ├── components/              # Reusable UI & Modal components
│   │   ├── CartDrawer.tsx       # Slide-out shopping cart & checkout drawer
│   │   ├── Footer.tsx           # Enterprise footer with newsletter & links
│   │   ├── GsmCalculatorModal.tsx # Fabric weight & air freight estimator
│   │   ├── Navbar.tsx           # Multi-level header, language/currency selectors
│   │   ├── ProductCard.tsx      # Fabric card with swatch & bolt add actions
│   │   ├── ProductDetailModal.tsx # Full-screen technical spec sheet
│   │   ├── RequestQuoteModal.tsx # B2B RFQ quotation modal
│   │   └── Toast.tsx            # Global notification system
│   ├── context/
│   │   └── ShopContext.tsx      # Global state (Cart, Filters, Currency, Lang)
│   ├── data/
│   │   ├── products.ts          # 24+ Fabric SKUs, company metadata, specs
│   │   └── translations.ts      # EN / MS / UR localization dictionaries
│   ├── pages/
│   │   ├── AboutPage.tsx        # Mill heritage & machinery certifications
│   │   ├── AdminPortal.tsx      # Inventory management & quote overview
│   │   ├── B2BPage.tsx          # Wholesale contract schedule & discount calc
│   │   ├── CatalogPage.tsx      # Filterable fabric archive with table/grid
│   │   ├── CategoriesPage.tsx   # Textile weave encyclopedia & swatch boxes
│   │   ├── ContactPage.tsx      # Showroom booking & Google Maps embed
│   │   ├── HomePage.tsx         # Brand hero, trust grid, curated collections
│   │   └── TrackOrderPage.tsx   # Real-time courier dispatch tracker
│   ├── types.ts                 # TypeScript type declarations & interfaces
│   ├── App.tsx                  # Root application router & view switcher
│   ├── main.tsx                 # Application entry point
│   └── index.css                # Tailwind global imports & luxury typography
├── package.json                 # Project dependencies & build scripts
├── vite.config.ts               # Vite configuration
└── metadata.json                # Project identity configuration
