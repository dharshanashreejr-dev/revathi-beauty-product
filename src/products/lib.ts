import type { CartItem } from './types';
export const FREE_SHIP = 4999;
export const subtotalOf = (items: CartItem[]) => items.reduce((t, i) => t + i.product.price * i.qty, 0);
export const shipFee = (sub: number, method: 'standard' | 'express') => (method === 'express' ? 299 : sub >= FREE_SHIP ? 0 : 149);
export const COD_FEE = 99;
