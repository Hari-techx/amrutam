import { Product } from "../types/product";
const cats = [
  "Herbal Care",
  "Digestive Wellness",
  "Immunity",
  "Skin Care",
  "Hair Care",
  "Daily Wellness",
];
export const products: Product[] = Array.from({ length: 20000 }, (_, i) => ({
  id: `product-${i + 1}`,
  name: `Ayurvedic Product ${i + 1}`,
  category: cats[i % cats.length],
  price: 199 + (i % 15) * 50,
  rating: Number((4 + (i % 10) / 10).toFixed(1)),
  image: `https://picsum.photos/seed/amrutam-product-${i}/160/160`,
  description:
    "A thoughtfully selected Ayurvedic wellness product for everyday care.",
}));
