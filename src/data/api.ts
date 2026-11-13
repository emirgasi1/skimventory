import type { InventoryItem } from '@/types';
import { items } from './items';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchItems(options: { fail?: boolean } = {}): Promise<InventoryItem[]> {
  await wait(800);
  if (options.fail) throw new Error('Could not load inventory');
    const many = Array.from({ length: 200 }, (_, i) => ({
    ...items[i % items.length],
    id: String(i + 1),
  }));
  return many;
}