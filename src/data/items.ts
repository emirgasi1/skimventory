import type { InventoryItem } from '@/types';

export const items: InventoryItem[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    creator: 'F. Scott Fitzgerald',
    category: 'book',
    barcode: '9780743273565',
    year: 1925,
    imageUrl: 'https://picsum.photos/seed/gatsby/600/400',
  },
  {
    id: '2',
    title: 'Cordless Drill',
    creator: 'Bosch',
    category: 'tool',
    barcode: '3165140123456',
    year: 2022,
    imageUrl: 'https://picsum.photos/seed/drill/600/400',
  },
  {
    id: '3',
    title: 'Olive Oil 500ml',
    creator: 'Brajlović',
    category: 'pantry',
    barcode: '3850123456789',
    year: 2026,
    imageUrl: 'https://picsum.photos/seed/oliveoil/600/400',
  },
  {
    id: '4',
    title: 'The Old Man and the Sea',
    creator: 'Ernest Hemingway',
    category: 'book',
    barcode: '9780684801223',
    year: 1952,
    imageUrl: 'https://picsum.photos/seed/hemingway/600/400',
  },
  {
    id: '5',
    title: 'Hammer 500g',
    creator: 'Stanley',
    category: 'tool',
    barcode: '3253561511113',
    year: 2020,
    imageUrl: 'https://picsum.photos/seed/hammer/600/400',
  },
];