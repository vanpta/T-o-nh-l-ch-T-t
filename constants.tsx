
import { StylePreset, Costume } from './types';

export const STYLE_PROMPTS: Record<StylePreset, string> = {
  [StylePreset.PEACH_MIST]: "In a blooming pink peach blossom garden in morning mist, soft spring sunlight, bokeh effect, dreamy atmosphere, cinematic lighting",
  [StylePreset.YELLOW_APRICOT]: "In a vibrant yellow Ochna integerrima flower garden, bright sunlight, blue sky, depth of field, sharp focus on flowers, festive atmosphere",
  [StylePreset.MUSTARD_FIELD]: "In a vast field of yellow mustard flowers, rustic countryside setting, soft natural lighting, wide angle, spring vibe",
  [StylePreset.HANOI_OLD_STREET]: "On a street in Hanoi Old Quarter, yellow mossy walls, green wooden windows, Vietnamese flag hanging, vintage texture, nostalgic mood",
  [StylePreset.ANCIENT_TEMPLE]: "In front of an ancient Asian temple gate, red lanterns hanging, incense smoke swirling, mossy stone steps, spiritual and serene",
  [StylePreset.HUE_IMPERIAL]: "In a royal palace corridor of Hue Imperial City, red and gold lacquered pillars, intricate traditional patterns, symmetrical composition, majestic lighting",
  [StylePreset.NORTHERN_HOUSE]: "Inside a traditional Northern Vietnamese wooden house, antique furniture, a vase of peach blossoms, warm cozy firelight tet atmosphere",
  [StylePreset.CALLIGRAPHY_STREET]: "At a calligraphy street, red paper with black ink hanging, bamboo brushes, festive vibrant red color palette, cultural detail",
  [StylePreset.INCENSE_VILLAGE]: "In an incense village drying yard, bundles of red incense sticks arranged in circular patterns, vibrant red and magenta colors",
  [StylePreset.LANTERN_STREET]: "On a Hoi An ancient town street at night, illuminated by hundreds of colorful silk lanterns, magical bokeh lights, romantic atmosphere",
  [StylePreset.BANH_CHUNG_KITCHEN]: "In a rustic countryside kitchen corner, wood fire cooking a large pot of Banh Chung, green Dong leaves scattered, warm firelight",
  [StylePreset.MINIMAL_RED_STUDIO]: "In a minimalist studio with deep red backdrop, artistic dry peach branch, dramatic fashion lighting, elegant and luxurious",
  [StylePreset.ETHEREAL_SILK]: "In an ethereal setting with layers of sheer silk fabric, pastel pink and white colors, falling flower petals, soft romantic lighting",
  [StylePreset.RETRO_SAIGON]: "In a 1960s Saigon interior, patterned cement tile floor, pastel teal walls, retro furniture, nostalgic vintage pop-art vibe",
  [StylePreset.VINTAGE_TAILOR]: "In a vintage tailor shop, sewing machine, rolls of colorful silk fabrics, measuring tape, warm cozy fashion atelier vibe"
};

export const COSTUME_PROMPTS: Record<Costume, string> = {
  [Costume.LUXURY_RED_VELVET]: "wearing a luxurious deep red velvet Ao Dai set with black silk trousers, intricate golden phoenix embroidery, regal high collar",
  [Costume.PURE_WHITE_SILK]: "wearing a pure white silk traditional Vietnamese Ao Dai, sheer flowing fabric, elegant and simple",
  [Costume.NHAT_BINH_ROYAL]: "wearing a traditional Vietnamese Nhat Binh royal robe, square collar, large sleeves with colorful stripes, exquisite embroidery",
  [Costume.AO_TAC_CLASSIC]: "wearing a Vietnamese Ao Tac costume, emerald green silk five-panel dress with wide loose sleeves",
  
  [Costume.OFFICE_SILK_SUIT]: "wearing a high-end tailored red silk power suit, sharp shoulders, fitted trousers, modern Vietnamese businesswoman style",
  [Costume.BLAZER_MINIMALIST]: "wearing an oversized beige linen blazer with a thin red silk scarf, minimalist smart-casual look, contemporary fashion",
  [Costume.SILK_SHIRT_TROUSERS]: "wearing a premium mulberry silk cream shirt with high-waisted wide-leg charcoal trousers, minimalist luxury",
  
  [Costume.TWEED_LUXURY]: "wearing a luxury white and gold tweed jacket and skirt set, pearl buttons, elegant Chanel-inspired style",
  [Costume.DRAPED_SILK_GOWN]: "wearing a floor-length draped silk gown in pastel peach, artistic pleated details, soft feminine luxury",
  [Costume.COQUETTE_LACE_DRESS]: "wearing a delicate white lace coquette dress with red ribbon bows, dreamy and romantic aesthetic",
  [Costume.PARISIAN_CHIC]: "wearing a black turtleneck, red beret, and a pleated wool midi skirt, Parisian chic meets Vietnamese Tet",

  [Costume.CYBER_TET_TECHWEAR]: "wearing futuristic techwear with neon red accents, tactical straps, tech-fabric materials, cyberpunk aesthetic for 2026 Lunar New Year",
  [Costume.LEATHER_JACKET_CHIC]: "wearing a sleek black leather biker jacket over a vibrant red silk slip dress, edgy contrast, high-fashion street style",
  [Costume.AVANT_GARDE_FUSION]: "wearing an avant-garde deconstructed Ao Dai with asymmetrical layers, bold metallic accessories, haute couture concept",
  [Costume.DENIM_RECONSTRUCTED]: "wearing a reconstructed denim ensemble with traditional indigo dye patterns, raw edges, edgy urban fashion",

  [Costume.STREET_OVERSIZE_TET]: "wearing an oversized crimson hoodie with a large gold embroidered dragon/horse on the back, chunky sneakers, hypebeast streetwear style",
  [Costume.BOMBER_TRADITIONAL]: "wearing a silk bomber jacket with traditional Vietnamese clouds and cranes patterns, street fashion vibe",
  [Costume.STREET_CARGO_CHIC]: "wearing red cargo pants with a black fitted crop-top, silver chains, modern energetic street style",
  [Costume.VINTAGE_STREET_HANOI]: "wearing a vintage 90s style denim jacket, wide leg corduroy pants, retro sunglasses, old Hanoi street vibe",

  [Costume.MODERN_PUFFY_SLEEVE]: "wearing a modern stylized Ao Dai in peach pink, puffy short sleeves, organza layered fabric",
  [Costume.YEM_FOLK]: "wearing a traditional Vietnamese Yem bodice top in lotus pink silk, paired with a long black silk skirt",
  [Costume.MODERN_AO_BA_BA]: "wearing a modern violet silk Ao Ba Ba set, fitted cut, raglan sleeves"
};

export const VIETNAMESE_MONTHS = [
  "Tháng Một", "Tháng Hai", "Tháng Ba", "Tháng Tư", "Tháng Năm", "Tháng Sáu",
  "Tháng Bảy", "Tháng Tám", "Tháng Chín", "Tháng Mười", "Tháng Mười Một", "Tháng Mười Hai"
];

export const DAYS_OF_WEEK = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
