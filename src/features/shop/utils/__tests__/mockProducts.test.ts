import { products } from "../mockProducts";
test("supports the required large product dataset", () => {
  expect(products).toHaveLength(20000);
  expect(products[0].id).toBe("product-1");
});
