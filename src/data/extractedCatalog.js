/**
 * BOOKCASE App - Extracted Book Catalog & Literary Categories
 */

export const CATEGORIES = [
  { id: 'all', name: 'All Books', icon: 'book-open' },
  { id: 'Trending', name: 'Trending Now', icon: 'trending-up' },
  { id: 'Bestsellers', name: 'All-Time Bestsellers', icon: 'star' },
  { id: 'Education', name: 'Education', icon: 'graduation-cap' },
  { id: 'Novels', name: 'Novels', icon: 'book' },
  { id: 'Translations', name: 'Translations', icon: 'globe' },
  { id: 'Short Stories', name: 'Short Stories', icon: 'feather' },
  { id: 'Sci-Fi', name: 'Sci-Fi', icon: 'zap' },
  { id: 'Fiction', name: 'Fiction', icon: 'compass' },
  { id: 'Poetry', name: 'Poetry', icon: 'heart' },
];

export const INITIAL_BOOKS = [
  {
    id: 'b1',
    title: 'Mandodari (මන්දෝදරී)',
    author: 'Mohan Raj Madawala',
    category: 'Trending',
    priceLKR: 2850,
    discountPercent: 20,
    stockStatus: 'In Stock',
    quantity: 15,
    rating: 4.9,
    reviewsCount: 142,
    imageKey: 'mandodari.jpg',
    isFeatured: true,
    description: 'Epic historical literary fiction detailing the unsung tales of Queen Mandodari. Highly acclaimed narrative masterpiece blending folklore and royal intrigue.'
  },
  {
    id: 'b2',
    title: 'Senkottan (සෙන්කොට්ටන්)',
    author: 'Mahinda Prasad Masimbula',
    category: 'Bestsellers',
    priceLKR: 1950,
    discountPercent: 10,
    stockStatus: 'In Stock',
    quantity: 25,
    rating: 4.8,
    reviewsCount: 98,
    imageKey: 'Ata_Massa.jpg',
    isFeatured: true,
    description: 'Captivating narrative capturing the rich rural heritage, human resilience, and traditional Sri Lankan village culture.'
  },
  {
    id: 'b3',
    title: 'Guru Geethaya (ගුරු ගීතය)',
    author: 'Chinghiz Aitmatov (Trans. Swarna Kanthi)',
    category: 'Translations',
    priceLKR: 1450,
    discountPercent: 15,
    stockStatus: 'In Stock',
    quantity: 30,
    rating: 5.0,
    reviewsCount: 230,
    imageKey: 'Guru_Geethaya_-___35360.jpg',
    isFeatured: false,
    description: 'Heartwarming timeless classic about a passionate teacher in a remote Soviet village inspiring generations of students.'
  },
  {
    id: 'b4',
    title: 'Manikkawatha (මැණික්කාවත)',
    author: 'Mahinda Prasad Masimbula',
    category: 'Novels',
    priceLKR: 2200,
    discountPercent: 0,
    stockStatus: 'In Stock',
    quantity: 18,
    rating: 4.9,
    reviewsCount: 85,
    imageKey: 'Manikkawatha.jpg',
    isFeatured: false,
    description: 'Deeply moving novel exploring the rural life, struggle, and emotional bonds set against traditional Sri Lankan landscapes.'
  },
  {
    id: 'b5',
    title: 'May Mara Prasangaya (මැයි මාර ප්‍රසංගය)',
    author: 'Mohan Raj Madawala',
    category: 'Trending',
    priceLKR: 2600,
    discountPercent: 12,
    stockStatus: 'In Stock',
    quantity: 10,
    rating: 4.7,
    reviewsCount: 64,
    imageKey: 'May Mara Prasangaya.jpg',
    isFeatured: false,
    description: 'A vibrant, poetic exploration of love, loss, and memory woven with rich contemporary literary prose.'
  },
  {
    id: 'b6',
    title: 'Ata Massa (ඇට මැස්සා)',
    author: 'Mahinda Prasad Masimbula',
    category: 'Novels',
    priceLKR: 1750,
    discountPercent: 5,
    stockStatus: 'In Stock',
    quantity: 14,
    rating: 4.6,
    reviewsCount: 42,
    imageKey: 'Ata_Massa.jpg',
    isFeatured: false,
    description: 'Thought-provoking story reflecting socio-cultural transformations in Sri Lankan rural communities.'
  },
  {
    id: 'b7',
    title: 'Advanced Mathematics Guide',
    author: 'Prof. K. A. Perera',
    category: 'Education',
    priceLKR: 3200,
    discountPercent: 0,
    stockStatus: 'In Stock',
    quantity: 40,
    rating: 4.7,
    reviewsCount: 65,
    imageKey: 'ganitha vinodaya.jpg',
    isFeatured: false,
    description: 'Comprehensive study reference guide for Sri Lanka G.C.E. Advanced Level mathematics students.'
  },
  {
    id: 'b8',
    title: 'Kantalai Flowers (කන්තරයේ කුසුම)',
    author: 'Various Authors',
    category: 'Fiction',
    priceLKR: 1800,
    discountPercent: 10,
    stockStatus: 'In Stock',
    quantity: 12,
    rating: 4.5,
    reviewsCount: 38,
    imageKey: 'kantharaye kusuma.png',
    isFeatured: false,
    description: 'Rich fiction depicting survival, beauty, and strength amidst dry zone hardship.'
  },
  {
    id: 'b9',
    title: 'Amazonia (ඇමසෝනියා)',
    author: 'James Rollins (Trans.)',
    category: 'Sci-Fi',
    priceLKR: 2950,
    discountPercent: 15,
    stockStatus: 'In Stock',
    quantity: 8,
    rating: 4.8,
    reviewsCount: 92,
    imageKey: 'amazonia.png',
    isFeatured: false,
    description: 'High-octane science fiction thrill ride through unexplored jungle mysteries and bio-tech secrets.'
  },
  {
    id: 'b10',
    title: 'Rare Classic Translation Collection',
    author: 'World Literary Masterworks',
    category: 'Translations',
    priceLKR: 1500,
    discountPercent: 0,
    stockStatus: 'Out of Stock',
    quantity: 0,
    rating: 4.5,
    reviewsCount: 30,
    imageKey: 'Disparue.jpg',
    isFeatured: false,
    description: 'Rare translated classic literature currently out of stock and awaiting official print re-issue.'
  },
  {
    id: 'b11',
    title: 'Nil Katrol (නිල් කැටරොල්)',
    author: 'Saman Wickramarachchi',
    category: 'Short Stories',
    priceLKR: 1350,
    discountPercent: 10,
    stockStatus: 'In Stock',
    quantity: 20,
    rating: 4.6,
    reviewsCount: 51,
    imageKey: 'nil katrol.jpg',
    isFeatured: false,
    description: 'Poignant anthology of short stories capturing subtle human emotions and urban ironies.'
  },
  {
    id: 'b12',
    title: 'Poetry Sanctuary Collection (කාව්‍ය සංග්‍රහය)',
    author: 'Selected Sri Lankan Poets',
    category: 'Poetry',
    priceLKR: 1200,
    discountPercent: 5,
    stockStatus: 'In Stock',
    quantity: 15,
    rating: 4.9,
    reviewsCount: 77,
    imageKey: 'Lilac.jpg',
    isFeatured: false,
    description: 'A soothing luxury anthology of romantic, philosophical, and reflective verses.'
  }
];

// Helper asset resolver
export const ASSET_MAP = {
  'mandodari.jpg': require('../assets/mandodari.jpg'),
  'Ata_Massa.jpg': require('../assets/Ata_Massa.jpg'),
  'Guru_Geethaya_-___35360.jpg': require('../assets/Guru_Geethaya_-___35360.jpg'),
  'Manikkawatha.jpg': require('../assets/Manikkawatha.jpg'),
  'May Mara Prasangaya.jpg': require('../assets/May Mara Prasangaya.jpg'),
  'ganitha vinodaya.jpg': require('../assets/ganitha vinodaya.jpg'),
  'kantharaye kusuma.png': require('../assets/kantharaye kusuma.png'),
  'amazonia.png': require('../assets/amazonia.png'),
  'Disparue.jpg': require('../assets/Disparue.jpg'),
  'nil katrol.jpg': require('../assets/nil katrol.jpg'),
  'Lilac.jpg': require('../assets/Lilac.jpg'),
  'logo.png': require('../assets/logo.png'),
  'luxury_gold_seal.png': require('../assets/luxury_gold_seal.png'),
  'hero_luxury_showcase.png': require('../assets/hero_luxury_showcase.png'),
};

export const getBookImage = (imageKey) => {
  if (ASSET_MAP[imageKey]) {
    return ASSET_MAP[imageKey];
  }
  return ASSET_MAP['mandodari.jpg'];
};
