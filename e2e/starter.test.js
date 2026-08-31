describe("Amrutam shopping flow", () => {
  beforeAll(async () => {
    await device.launchApp({
      newInstance: true,
    });
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("should complete a shopping checkout flow", async () => {
    // 1. Verify Shop screen
    await expect(element(by.text("Shop"))).toBeVisible();

    // 2. Add first product to cart
    await element(by.id("add-to-cart-product-1")).tap();

    // 3. Open cart
    await element(by.id("shop-cart-button")).tap();

    // 4. Verify Cart screen
    await expect(element(by.text("Cart"))).toBeVisible();

    // 5. Go to checkout
    await element(by.id("checkout-button")).tap();

    // 6. Verify Checkout screen
    await expect(element(by.text("Checkout Summary"))).toBeVisible();

    // 7. Place order
    await element(by.id("place-order-button")).tap();

    // 8. Verify order confirmation
    await expect(element(by.text("Order confirmed"))).toBeVisible();
  });
});
