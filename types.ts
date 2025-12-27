
export enum AspectRatio {
  LANDSCAPE = '16:9',
  PORTRAIT = '9:16',
  SQUARE = '1:1'
}

export enum StylePreset {
  // Nhóm 1: Thiên nhiên & Hoa cỏ
  PEACH_MIST = 'Vườn Đào Phai (Sương Sớm)',
  YELLOW_APRICOT = 'Vườn Mai Vàng (Nắng Xuân)',
  MUSTARD_FIELD = 'Cánh Đồng Hoa Cải',
  // Nhóm 2: Kiến trúc & Hoài niệm
  HANOI_OLD_STREET = 'Phố Cổ Hà Nội (Hoài Niệm)',
  ANCIENT_TEMPLE = 'Cổng Chùa/Đền Cổ Kính',
  HUE_IMPERIAL = 'Cung Đình Huế (Tráng Lệ)',
  NORTHERN_HOUSE = 'Nhà Cổ Bắc Bộ (Ấm Cúng)',
  // Nhóm 3: Văn hóa & Lễ hội
  CALLIGRAPHY_STREET = 'Phố Ông Đồ (Thư Pháp)',
  INCENSE_VILLAGE = 'Làng Hương (Rực Rỡ)',
  LANTERN_STREET = 'Phố Đèn Lồng (Huyền Ảo)',
  BANH_CHUNG_KITCHEN = 'Góc Bếp Nấu Bánh Chưng',
  // Nhóm 4: Concept Nghệ thuật
  MINIMAL_RED_STUDIO = 'Studio Phông Đỏ (Tối Giản)',
  ETHEREAL_SILK = 'Rèm Lụa & Hoa (Mơ Mộng)',
  RETRO_SAIGON = 'Cô Ba Sài Gòn (Retro)',
  VINTAGE_TAILOR = 'Tiệm May Cổ Điển'
}

export enum Costume {
  // Truyền Thống
  LUXURY_RED_VELVET = 'Áo Dài Nhung Đỏ (Phượng)',
  PURE_WHITE_SILK = 'Áo Dài Lụa Trắng (Tinh Khôi)',
  NHAT_BINH_ROYAL = 'Áo Nhật Bình (Cung Đình)',
  AO_TAC_CLASSIC = 'Áo Tấc (Ngũ Thân)',
  
  // Công Sở & Sang Trọng
  OFFICE_SILK_SUIT = 'Suit Lụa Công Sở (Modern)',
  BLAZER_MINIMALIST = 'Blazer Tối Giản (Smart Casual)',
  SILK_SHIRT_TROUSERS = 'Sơ Mi Lụa & Quần Tây Silk',
  
  // Tiểu Thư & Quý Phái
  TWEED_LUXURY = 'Set Dạ Tweed (Tiểu Thư)',
  DRAPED_SILK_GOWN = 'Đầm Lụa Xếp Ly (Thanh Lịch)',
  COQUETTE_LACE_DRESS = 'Váy Ren Coquette (Ngọt Ngào)',
  PARISIAN_CHIC = 'Phong Cách Parisian (Cổ Điển)',

  // Cá Tính & Phá Cách
  CYBER_TET_TECHWEAR = 'Techwear Bính Ngọ (Futuristic)',
  LEATHER_JACKET_CHIC = 'Áo Khoác Da & Chân Váy Silk',
  AVANT_GARDE_FUSION = 'Thời Trang Phá Cấu Trúc',
  DENIM_RECONSTRUCTED = 'Denim Tái Cấu Trúc (Edgy)',

  // Hip-hop & Streetwear
  STREET_OVERSIZE_TET = 'Oversize Hoodie (Thêu Rồng)',
  BOMBER_TRADITIONAL = 'Áo Bomber Họa Tiết Cổ',
  STREET_CARGO_CHIC = 'Quần Cargo & Crop-top Tet',
  VINTAGE_STREET_HANOI = 'Streetwear Hà Nội Những Năm 90',

  // Khác (Dân gian & Cách tân)
  MODERN_PUFFY_SLEEVE = 'Áo Dài Cách Tân (Tay Bồng)',
  YEM_FOLK = 'Áo Yếm & Váy Đụp',
  MODERN_AO_BA_BA = 'Áo Bà Ba Cách Tân'
}

export enum CalendarMode {
  SINGLE_MONTH = 'Một Tháng',
  FULL_YEAR_2026 = 'Trọn Năm 2026'
}

export interface GenerationSettings {
  aspectRatio: AspectRatio;
  style: StylePreset;
  costume: Costume;
  prompt: string;
  calendarMode: CalendarMode;
  selectedMonth: number;
}

export interface GeneratedResult {
  imageUrl: string;
  timestamp: string;
}
