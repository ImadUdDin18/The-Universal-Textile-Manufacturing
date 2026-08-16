import { CurrencyCode, CurrencyRate, Language } from '../types';

export const CURRENCY_RATES: Record<CurrencyCode, CurrencyRate> = {
  MYR: { code: 'MYR', symbol: 'RM', rateToMYR: 1.0, flag: '🇲🇾' },
  USD: { code: 'USD', symbol: '$', rateToMYR: 0.225, flag: '🇺🇸' },
  EUR: { code: 'EUR', symbol: '€', rateToMYR: 0.208, flag: '🇪🇺' },
  GBP: { code: 'GBP', symbol: '£', rateToMYR: 0.177, flag: '🇬🇧' },
  PKR: { code: 'PKR', symbol: '₨', rateToMYR: 62.8, flag: '🇵🇰' },
  SGD: { code: 'SGD', symbol: 'S$', rateToMYR: 0.304, flag: '🇸🇬' },
};

export const TRANSLATIONS: Record<
  Language,
  {
    nav: {
      home: string;
      catalog: string;
      categories: string;
      b2bWholesale: string;
      customPrint: string;
      certifications: string;
      factoryShowroom: string;
      contactUs: string;
      trackOrder: string;
      admin: string;
      requestQuote: string;
      callNow: string;
      cart: string;
      searchPlaceholder: string;
    };
    hero: {
      badge: string;
      titleLine1: string;
      titleLine2: string;
      subtitle: string;
      ctaCatalog: string;
      ctaQuote: string;
      statMeters: string;
      statRating: string;
      statExport: string;
      statLocation: string;
    };
    filter: {
      all: string;
      category: string;
      priceRange: string;
      gsmWeight: string;
      color: string;
      useCase: string;
      search: string;
      reset: string;
      showingResults: string;
      sortBy: string;
      sortPopular: string;
      sortPriceLow: string;
      sortPriceHigh: string;
      sortGsmHigh: string;
    };
    productCard: {
      perMeter: string;
      moq: string;
      inStock: string;
      orderSwatch: string;
      addToCart: string;
      requestBulkQuote: string;
      viewDetails: string;
      gsm: string;
      width: string;
    };
    detail: {
      specs: string;
      composition: string;
      weave: string;
      width: string;
      gsm: string;
      yarnCount: string;
      shrinkage: string;
      certifications: string;
      leadTime: string;
      selectColor: string;
      quantityMeters: string;
      swatchKit: string;
      orderSampleSwatch: string;
      bulkDiscountNotice: string;
      chatWhatsApp: string;
      downloadTechSheet: string;
      deliveryMalaysia: string;
      internationalShipping: string;
    };
    b2b: {
      title: string;
      subtitle: string;
      companyName: string;
      contactName: string;
      email: string;
      phone: string;
      country: string;
      fabricSelect: string;
      metersRequired: string;
      customColorOrPantone: string;
      intendedUse: string;
      timeline: string;
      notes: string;
      submitBtn: string;
      instantWhatsAppQuote: string;
      successMsg: string;
    };
    cart: {
      title: string;
      emptyTitle: string;
      emptyDesc: string;
      continueShopping: string;
      swatchLabel: string;
      subtotal: string;
      shippingEstimate: string;
      freeShippingThreshold: string;
      checkoutBtn: string;
      clearCart: string;
      meters: string;
    };
    trust: {
      madeInMalaysia: string;
      madeInMalaysiaDesc: string;
      rating5: string;
      rating5Desc: string;
      oekoCert: string;
      oekoCertDesc: string;
      worldwideShipping: string;
      worldwideShippingDesc: string;
      factoryDirect: string;
      factoryDirectDesc: string;
    };
  }
> = {
  en: {
    nav: {
      home: 'Home',
      catalog: 'Shop All Fabrics',
      categories: 'Categories & Weaves',
      b2bWholesale: 'B2B Wholesale & Custom',
      customPrint: 'Custom Digital Printing',
      certifications: 'Mill Certifications',
      factoryShowroom: 'About Mill & Showroom',
      contactUs: 'Contact & VIP Visit',
      trackOrder: 'Track Order',
      admin: 'Admin Portal',
      requestQuote: 'Request B2B Quote',
      callNow: 'Direct Line',
      cart: 'Cart',
      searchPlaceholder: 'Search fabric by name, GSM, composition, or use-case...',
    },
    hero: {
      badge: 'ESTABLISHED 2008 • MENARA CITY ONE, KUALA LUMPUR',
      titleLine1: 'WORLD-CLASS TEXTILE',
      titleLine2: 'MANUFACTURING & WHOLESALE',
      subtitle:
        'Supplying Southeast Asia and global fashion houses with Grade-6A Silk, Giza 87 Egyptian Cotton, Normandy Flax Linen, Anti-Microbial Uniform Twill, and Bespoke 2400 DPI Digital Prints directly from our Kuala Lumpur mill.',
      ctaCatalog: 'Explore Luxury Catalog',
      ctaQuote: 'Request B2B Bulk Quote',
      statMeters: 'Ready Stock in KL (Meters)',
      statRating: 'Verified Google Rating',
      statExport: 'Global Export Nations',
      statLocation: 'Menara City One, KL HQ',
    },
    filter: {
      all: 'All Categories',
      category: 'Fabric Category',
      priceRange: 'Price Range',
      gsmWeight: 'Fabric Weight (GSM)',
      color: 'Color Swatch',
      useCase: 'Target Application',
      search: 'Search Catalog',
      reset: 'Reset Filters',
      showingResults: 'Showing fabrics matching your criteria',
      sortBy: 'Sort By',
      sortPopular: 'Most Popular / Featured',
      sortPriceLow: 'Price: Low to High',
      sortPriceHigh: 'Price: High to Low',
      sortGsmHigh: 'Heavyweight to Lightweight',
    },
    productCard: {
      perMeter: 'per meter',
      moq: 'MOQ',
      inStock: 'Ready Stock in KL',
      orderSwatch: 'Order Swatch (RM 20)',
      addToCart: 'Add to Bag',
      requestBulkQuote: 'Request Bulk Quote',
      viewDetails: 'View Fabric Specs',
      gsm: 'GSM',
      width: 'Width',
    },
    detail: {
      specs: 'Technical Fabric Specifications',
      composition: 'Material Composition',
      weave: 'Weave Structure',
      width: 'Fabric Width',
      gsm: 'Weight (GSM)',
      yarnCount: 'Yarn Count / Filaments',
      shrinkage: 'Pre-Shrunk Tolerance',
      certifications: 'International Certifications',
      leadTime: 'Dispatch Time from KL',
      selectColor: 'Select Colorway',
      quantityMeters: 'Quantity (Meters)',
      swatchKit: 'Sample Swatch Kit (10cm x 15cm sample + physical color ring card)',
      orderSampleSwatch: 'Order Sample Swatch Kit',
      bulkDiscountNotice: 'Bulk Tier Discount: >100m (10% OFF) • >500m (25% OFF) • >2,000m (Mill Contract Rate)',
      chatWhatsApp: 'Chat on WhatsApp with Textile Specialist',
      downloadTechSheet: 'Download Technical PDF Datasheet',
      deliveryMalaysia: '1-2 Days Express Delivery across Peninsular Malaysia & East Malaysia',
      internationalShipping: 'Express Air Freight (DHL/FedEx) & Container FCL/LCL Sea Freight to 38+ Countries',
    },
    b2b: {
      title: 'B2B Wholesale & Custom Milling Request',
      subtitle: 'Direct mill pricing for fashion brands, garment factories, uniform tenders, and hotel chains worldwide.',
      companyName: 'Company / Brand Name',
      contactName: 'Contact Person Name',
      email: 'Corporate Email',
      phone: 'Phone / WhatsApp (with Country Code)',
      country: 'Destination Country / Port',
      fabricSelect: 'Select Fabric Type',
      metersRequired: 'Estimated Quantity (Meters / Rolls)',
      customColorOrPantone: 'Custom Pantone TCX / TPX Code (Optional)',
      intendedUse: 'Intended Garment or Product Use-Case',
      timeline: 'Required Target Delivery Date',
      notes: 'Special Specifications (Fire retardant, water repellent, custom roll packaging...)',
      submitBtn: 'Submit RFQ to Mill Management',
      instantWhatsAppQuote: 'Instant WhatsApp RFQ (+60 16-249 2162)',
      successMsg: 'Thank you! Your quote request has been routed to our Senior Textile Director in Menara City One. Expect a formal proforma quotation within 2 hours.',
    },
    cart: {
      title: 'Your Luxury Fabric Cart',
      emptyTitle: 'Your Fabric Cart is Empty',
      emptyDesc: 'Discover our world-class raw silk, Egyptian cotton, French linen, and technical fabrics.',
      continueShopping: 'Continue Exploring Fabrics',
      swatchLabel: 'PHYSICAL SAMPLE SWATCH',
      subtotal: 'Cart Subtotal',
      shippingEstimate: 'Calculated at checkout based on meterage weight',
      freeShippingThreshold: 'Complimentary Express Delivery in Malaysia on orders above RM 500',
      checkoutBtn: 'Proceed to Secure Checkout',
      clearCart: 'Clear Cart',
      meters: 'meters',
    },
    trust: {
      madeInMalaysia: 'Direct Manufacturer in Kuala Lumpur',
      madeInMalaysiaDesc: 'Physical headquarters & showroom at Menara City One, Jalan Munshi Abdullah with 500,000m ready inventory.',
      rating5: '5.0 Star Rated Institution',
      rating5Desc: 'Trusted by luxury couturiers, hotel conglomerates, and international apparel brands across 38+ countries.',
      oekoCert: 'OEKO-TEX & ISO 9001 Certified',
      oekoCertDesc: 'Zero AZO toxic dyes, eco-certified sustainable processes, and stringent lab tensile quality controls.',
      worldwideShipping: 'Global Air & Sea Cargo Dispatch',
      worldwideShippingDesc: 'Rapid 48-hour dispatch for in-stock bolts. Full commercial customs documentation & CO certificates provided.',
      factoryDirect: 'True Mill-Direct Pricing',
      factoryDirectDesc: 'No middlemen markup. Access wholesale container-tier pricing whether buying 50 meters or 50,000 meters.',
    },
  },
  ms: {
    nav: {
      home: 'Laman Utama',
      catalog: 'Beli Semua Fabrik',
      categories: 'Kategori & Tenunan',
      b2bWholesale: 'Borong Pukal B2B',
      customPrint: 'Cetakan Digital Khas',
      certifications: 'Pensijilan Kilang',
      factoryShowroom: 'Mengenai Kilang & Showroom',
      contactUs: 'Hubungi & Tempah Lawatan',
      trackOrder: 'Jejak Pesanan',
      admin: 'Portal Admin',
      requestQuote: 'Mohon Sebut Harga',
      callNow: 'Talian Terus',
      cart: 'Troli',
      searchPlaceholder: 'Cari kain mengikut nama, GSM, komposisi atau kegunaan...',
    },
    hero: {
      badge: 'DITUBUHKAN 2008 • MENARA CITY ONE, KUALA LUMPUR',
      titleLine1: 'PENGELUAR TEKSTIL',
      titleLine2: 'DAN PEMBORONG BERTARAF DUNIA',
      subtitle:
        'Membekalkan sutera gred 6A, kapas Giza 87 Mesir, linen Normandy Perancis, fabrik seragam anti-mikrobial, dan cetakan digital 2400 DPI terus dari kilang kami di Kuala Lumpur ke seluruh Malaysia dan dunia.',
      ctaCatalog: 'Lihat Katalog Mewah',
      ctaQuote: 'Minta Sebut Harga Pukal',
      statMeters: 'Stok Sedia di KL (Meter)',
      statRating: 'Penilaian 5.0 Bintang',
      statExport: 'Negara Eksport Global',
      statLocation: 'Ibu Pejabat Menara City One, KL',
    },
    filter: {
      all: 'Semua Kategori',
      category: 'Kategori Fabrik',
      priceRange: 'Julat Harga',
      gsmWeight: 'Berat Kain (GSM)',
      color: 'Pilihan Warna',
      useCase: 'Kegunaan Fabrik',
      search: 'Cari Katalog',
      reset: 'Tetapkan Semula',
      showingResults: 'Menunjukkan fabrik yang sepadan',
      sortBy: 'Susun Mengikut',
      sortPopular: 'Paling Popular / Pilihan',
      sortPriceLow: 'Harga: Rendah ke Tinggi',
      sortPriceHigh: 'Harga: Tinggi ke Rendah',
      sortGsmHigh: 'Kain Tebal ke Ringan',
    },
    productCard: {
      perMeter: 'per meter',
      moq: 'Pesanan Min',
      inStock: 'Stok Sedia di KL',
      orderSwatch: 'Pesan Sampel (RM 20)',
      addToCart: 'Tambah ke Beg',
      requestBulkQuote: 'Minta Sebut Harga',
      viewDetails: 'Lihat Spesifikasi',
      gsm: 'GSM',
      width: 'Bidang',
    },
    detail: {
      specs: 'Spesifikasi Teknikal Fabrik',
      composition: 'Komposisi Bahan',
      weave: 'Struktur Tenunan',
      width: 'Bidang Kain',
      gsm: 'Berat (GSM)',
      yarnCount: 'Kiraan Benang / Filamen',
      shrinkage: 'Toleransi Pengecutan',
      certifications: 'Pensijilan Antarabangsa',
      leadTime: 'Masa Penghantaran dari KL',
      selectColor: 'Pilih Warna',
      quantityMeters: 'Kuantiti (Meter)',
      swatchKit: 'Kit Sampel Fabrik (Sampel 10cm x 15cm + kad warna fizikal)',
      orderSampleSwatch: 'Pesan Kit Sampel',
      bulkDiscountNotice: 'Diskaun Pukal: >100m (Diskaun 10%) • >500m (Diskaun 25%) • >2,000m (Kadar Kontrak Kilang)',
      chatWhatsApp: 'Hubungi Pakar Tekstil di WhatsApp',
      downloadTechSheet: 'Muat Turun Lembaran Data PDF',
      deliveryMalaysia: 'Penghantaran Pantas 1-2 Hari ke seluruh Semenanjung & Sabah/Sarawak',
      internationalShipping: 'Kargo Udara & Kontena Laut ke lebih 38 buah negara',
    },
    b2b: {
      title: 'Permohonan Sebut Harga Borong B2B & Tenunan Khas',
      subtitle: 'Harga terus dari kilang untuk jenama fesyen, kilang jahit, tender seragam, dan hotel di seluruh dunia.',
      companyName: 'Nama Syarikat / Jenama',
      contactName: 'Nama Wakil',
      email: 'Emel Korporat',
      phone: 'No. Telefon / WhatsApp',
      country: 'Negara / Pelabuhan Destinasi',
      fabricSelect: 'Pilih Jenis Fabrik',
      metersRequired: 'Anggaran Kuantiti (Meter / Gulung)',
      customColorOrPantone: 'Kod Pantone TCX / TPX (Pilihan)',
      intendedUse: 'Kegunaan Pakaian / Produk',
      timeline: 'Tarikh Sasaran Diperlukan',
      notes: 'Spesifikasi Khas (Kalis api, kalis air, pembungkusan gulung khas...)',
      submitBtn: 'Hantar Permohonan ke Pengurusan Kilang',
      instantWhatsAppQuote: 'Sebut Harga Pantas WhatsApp (+60 16-249 2162)',
      successMsg: 'Terima kasih! Permohonan anda telah dihantar ke Pengarah Tekstil di Menara City One. Sebut harga rasmi akan dihantar dalam masa 2 jam.',
    },
    cart: {
      title: 'Troli Fabrik Mewah Anda',
      emptyTitle: 'Troli Fabrik Anda Kosong',
      emptyDesc: 'Terokai koleksi sutera mentah, kapas Mesir, linen Perancis, dan kain seragam bertaraf antarabangsa.',
      continueShopping: 'Teruskan Membeli-belah',
      swatchLabel: 'SAMPEL FABRIK FIZIKAL',
      subtotal: 'Jumlah Kecil Troli',
      shippingEstimate: 'Dikira semasa pembayaran berdasarkan berat pesanan',
      freeShippingThreshold: 'Penghantaran Percuma di Malaysia untuk pesanan melebihi RM 500',
      checkoutBtn: 'Teruskan ke Pembayaran Selamat',
      clearCart: 'Kosongkan Troli',
      meters: 'meter',
    },
    trust: {
      madeInMalaysia: 'Pengeluar Terus di Kuala Lumpur',
      madeInMalaysiaDesc: 'Ibu pejabat & bilik pameran di Menara City One, Jalan Munshi Abdullah dengan 500,000m stok siap sedia.',
      rating5: 'Penilaian 5.0 Bintang Disahkan',
      rating5Desc: 'Dipercayai oleh pereka fesyen ternama, rangkaian hotel, dan jenama pakaian antarabangsa di 38+ negara.',
      oekoCert: 'Pensijilan OEKO-TEX & ISO 9001',
      oekoCertDesc: 'Bebas bahan kimia berbahaya AZO, proses mampan, dan kawalan kualiti ketat di makmal.',
      worldwideShipping: 'Penghantaran Udara & Laut Global',
      worldwideShippingDesc: 'Penghantaran 48 jam untuk stok sedia ada. Dokumen kastam & sijil asal (CO) disediakan lengkap.',
      factoryDirect: 'Harga Terus Dari Kilang',
      factoryDirectDesc: 'Tiada caj orang tengah. Dapatkan harga borong sebenar sama ada beli 50 meter atau 50,000 meter.',
    },
  },
  ur: {
    nav: {
      home: 'ہوم',
      catalog: 'تمام فیبرکس خریدیں',
      categories: 'کیٹیگریز اور بناوٹ',
      b2bWholesale: 'بی ٹو بی ہول سیل اور کسٹم',
      customPrint: 'کسٹم ڈیجیٹل پرنٹنگ',
      certifications: 'مل سرٹیفیکیشنز',
      factoryShowroom: 'مل اور شوروم کے بارے میں',
      contactUs: 'رابطہ اور شوروم وزٹ',
      trackOrder: 'آرڈر ٹریک کریں',
      admin: 'ایڈمن پورٹل',
      requestQuote: 'کوٹیشن طلب کریں',
      callNow: 'براہ راست کال',
      cart: 'کارٹ',
      searchPlaceholder: 'کپڑا، جی ایس ایم، مٹیریل یا استعمال کے لحاظ سے تلاش کریں...',
    },
    hero: {
      badge: 'قائم شدہ 2008 • منارہ سٹی ون، کوالالمپور، ملائیشیا',
      titleLine1: 'ورلڈ کلاس ٹیکسٹائل مینوفیکچرنگ',
      titleLine2: 'اور گلوبل ہول سیل سپلائر',
      subtitle:
        'گریڈ 6A ملبری سلک، مصری گیزا 87 کاٹن، فرانسیسی نارمنڈی لینن، اینٹی مائکروبیل یونیفارم ٹوِل اور کسٹم ڈیجیٹل پرنٹس براہ راست کوالالمپور مل سے حاصل کریں۔',
      ctaCatalog: 'کیٹلاگ دیکھیں',
      ctaQuote: 'تھوک کوٹیشن حاصل کریں',
      statMeters: 'ریڈی اسٹاک (میٹرز)',
      statRating: '5.0 اسٹار ریٹنگ',
      statExport: 'ایکسپورٹ ممالک',
      statLocation: 'منارہ سٹی ون ہیڈکوارٹر',
    },
    filter: {
      all: 'تمام کیٹیگریز',
      category: 'فیبرک کیٹیگری',
      priceRange: 'قیمت کی حد',
      gsmWeight: 'وزن (جی ایس ایم)',
      color: 'رنگ کے نمونے',
      useCase: 'استعمال',
      search: 'تلاش کریں',
      reset: 'ری سیٹ',
      showingResults: 'مطلوبہ فیبرکس کے نتائج',
      sortBy: 'ترتیب دیں',
      sortPopular: 'مقبول ترین',
      sortPriceLow: 'قیمت: کم سے زیادہ',
      sortPriceHigh: 'قیمت: زیادہ سے کم',
      sortGsmHigh: 'بھاری سے ہلکا فیبرک',
    },
    productCard: {
      perMeter: 'فی میٹر',
      moq: 'کم از کم آرڈر',
      inStock: 'کوالالمپور اسٹاک دستیاب',
      orderSwatch: 'نمونہ حاصل کریں (RM 20)',
      addToCart: 'بیگ میں شامل کریں',
      requestBulkQuote: 'بلک کوٹیشن مانگیں',
      viewDetails: 'تفصیلات دیکھیں',
      gsm: 'جی ایس ایم',
      width: 'عرض',
    },
    detail: {
      specs: 'تکنیکی تفصیلات',
      composition: 'مٹیریل کمپوزیشن',
      weave: 'بناوٹ کا طریقہ',
      width: 'فیبرک کا عرض',
      gsm: 'وزن (GSM)',
      yarnCount: 'دھاگے کی قسم',
      shrinkage: 'سکڑاؤ کی شرح',
      certifications: 'بین الاقوامی سرٹیفکیٹ',
      leadTime: 'ڈسپیچ کا وقت',
      selectColor: 'رنگ منتخب کریں',
      quantityMeters: 'مقدار (میٹرز)',
      swatchKit: 'فزیکل سیمپل کٹ (10x15 سینٹی میٹر نمونہ + رنگ کارڈ)',
      orderSampleSwatch: 'سیمپل کٹ آرڈر کریں',
      bulkDiscountNotice: 'بلک ڈسکاؤنٹ: 100m سے زائد پر 10%، 500m پر 25% رعایت',
      chatWhatsApp: 'واٹس ایپ پر ٹیکسٹائل ایکسپرٹ سے بات کریں',
      downloadTechSheet: 'ٹیکنیکل ڈیٹا شیٹ ڈاؤن لوڈ کریں',
      deliveryMalaysia: 'ملائیشیا میں 1-2 دن میں ایکسپریس ڈیلیوری',
      internationalShipping: '38 سے زائد ممالک میں بذریعہ ائیر کارگو اور بحری کنٹینر ترسیل',
    },
    b2b: {
      title: 'بی ٹو بی ہول سیل اور کسٹم ملنگ ریکویسٹ',
      subtitle: 'فیشن برانڈز، ملبوسات فیکٹریوں، یونیفارم ٹھیکیداروں اور ہوٹلوں کے لیے براہ راست فیکٹری ریٹس۔',
      companyName: 'کمپنی / برانڈ کا نام',
      contactName: 'رابطہ کار کا نام',
      email: 'کارپوریٹ ای میل',
      phone: 'فون نمبر / واٹس ایپ',
      country: 'ملک / پورٹ',
      fabricSelect: 'کپڑے کی قسم منتخب کریں',
      metersRequired: 'مطلوبہ مقدار (میٹرز)',
      customColorOrPantone: 'پینٹون کوڈ (اختیاری)',
      intendedUse: 'استعمال کی تفصیل',
      timeline: 'ڈیلیوری کی آخری تاریخ',
      notes: 'خصوصی ہدایات (فائر پروف، واٹر پروف وغیرہ)',
      submitBtn: 'درخواست مل انتظامیہ کو بھیجیں',
      instantWhatsAppQuote: 'فوری واٹس ایپ کوٹیشن (+60 16-249 2162)',
      successMsg: 'شکریہ! آپ کی درخواست موصول ہوگئی ہے۔ سینئر ڈائریکٹر جلد ہی واٹس ایپ اور ای میل پر مکمل کوٹیشن فراہم کریں گے۔',
    },
    cart: {
      title: 'آپ کا شاپنگ کارٹ',
      emptyTitle: 'کارٹ خالی ہے',
      emptyDesc: 'ہمارے اعلیٰ معیار کے ریشم، مصری کاٹن اور فرنچ لینن کا جائزہ لیں۔',
      continueShopping: 'شاپنگ جاری رکھیں',
      swatchLabel: 'فزیکل سیمپل سواچ',
      subtotal: 'سب ٹوٹل',
      shippingEstimate: 'چیک آؤٹ پر وزن کے مطابق طے ہوگا',
      freeShippingThreshold: 'ملائیشیا میں RM 500 سے زائد پر مفت ترسیل',
      checkoutBtn: 'محفوظ چیک آؤٹ کی طرف بڑھیں',
      clearCart: 'کارٹ صاف کریں',
      meters: 'میٹرز',
    },
    trust: {
      madeInMalaysia: 'کوالالمپور میں فیکٹری اور ہیڈ کوارٹر',
      madeInMalaysiaDesc: 'منارہ سٹی ون، ملائیشیا میں 500,000 میٹر ریڈی اسٹاک کی دستیابی۔',
      rating5: '5.0 اسٹار مصدقہ ریٹنگ',
      rating5Desc: 'دنیا بھر کے لگژری برانڈز اور ہوٹل چینز کا قابلِ اعتماد انتخاب۔',
      oekoCert: 'OEKO-TEX اور ISO 9001 سرٹیفائیڈ',
      oekoCertDesc: 'نقصان دہ کیمیکلز سے پاک اور بین الاقوامی ماحولیاتی معیارات کے مطابق۔',
      worldwideShipping: 'عالمی ائیر اور سی کارگو سروس',
      worldwideShippingDesc: 'اسٹاک آرڈرز کی 48 گھنٹوں میں روانگی اور تمام ضروری کسٹم دستاویزات۔',
      factoryDirect: 'براہ راست مل ریٹس',
      factoryDirectDesc: 'بغیر کسی درمیانی کمیشن کے حقیقی ہول سیل قیمتیں۔',
    },
  },
};
