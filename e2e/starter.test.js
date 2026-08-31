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
    // 1. Verify Login screen
    await expect(element(by.text("Welcome back"))).toBeVisible();

    // 2. Login
    await element(by.label("Email")).replaceText("demo@amrutam.app");
    await element(by.label("Password")).replaceText("password");
    await element(by.text("Login")).tap();

    // 3. Wait until the main application is loaded
    await waitFor(element(by.text("Shop")))
      .toBeVisible()
      .withTimeout(15000);

    // 4. Open Shop
    await element(by.text("Shop")).tap();

    // 5. Verify Shop screen
    await expect(element(by.text("20,000 products"))).toBeVisible();

    // 6. Scroll down to the products
    await element(by.id("shop-product-list")).scroll(500, "down");

    // 7. Find the top-rated product
    await waitFor(element(by.id("add-to-cart-product-10")))
      .toBeVisible()
      .withTimeout(10000);

    // 8. Add product to cart
    await element(by.id("add-to-cart-product-10")).tap();

    // 9. Scroll back up to the Cart button
    await element(by.id("shop-product-list")).scroll(500, "up");

    // 10. Wait for Cart button
    await waitFor(element(by.id("shop-cart-button")))
      .toBeVisible()
      .withTimeout(10000);

    // 11. Open Cart
    await element(by.id("shop-cart-button")).tap();

    // 12. Verify Cart screen
    await waitFor(element(by.id("cart-screen-title")))
      .toBeVisible()
      .withTimeout(10000);

    // 13. Verify checkout button
    await waitFor(element(by.id("checkout-button")))
      .toBeVisible()
      .withTimeout(10000);

    // 14. Open Checkout Summary
    await element(by.id("checkout-button")).tap();

    // 15. Verify Checkout screen
    await waitFor(element(by.text("Checkout Summary")))
      .toBeVisible()
      .withTimeout(10000);

    // 16. Verify Place Order button
    await expect(element(by.text("Place order"))).toBeVisible();
  });
});
