import type { InventoryItem } from '@/types';
import { items } from './items';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchItems(options: { fail?: boolean } = {}): Promise<InventoryItem[]> {
  await wait(800);
  if (options.fail) throw new Error('Could not load inventory');
  return items;
}