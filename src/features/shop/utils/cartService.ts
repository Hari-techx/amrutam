import { storage } from "../../../services/storage/storage";
import { CartItem, Product } from "../types/product";
import { enqueueMutation } from "../../../services/sync/syncQueue";
const KEY = "@amrutam/cart";
export const getCart = () => storage.get<CartItem[]>(KEY, []);
export async function saveCart(items: CartItem[]) {
  await storage.set(KEY, items);
  await enqueueMutation({
    id: `cart-${Date.now()}`,
    type: "CART_UPDATE",
    payload: items,
    createdAt: new Date().toISOString(),
  });
}
export async function addToCart(product: Product) {
  const c = await getCart();
  const i = c.findIndex((x) => x.product.id === product.id);
  const next =
    i < 0
      ? [...c, { product, quantity: 1 }]
      : c.map((x, n) => (n === i ? { ...x, quantity: x.quantity + 1 } : x));
  await saveCart(next);
  return next;
}
export async function setQuantity(productId: string, quantity: number) {
  const c = await getCart();
  const next =
    quantity <= 0
      ? c.filter((x) => x.product.id !== productId)
      : c.map((x) => (x.product.id === productId ? { ...x, quantity } : x));
  await saveCart(next);
  return next;
}
