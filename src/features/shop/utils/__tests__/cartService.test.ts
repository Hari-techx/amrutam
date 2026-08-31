import { addToCart, setQuantity } from "../cartService";

import { products } from "../mockProducts";

import { storage } from "../../../../services/storage/storage";
import { enqueueMutation } from "../../../../services/sync/syncQueue";

jest.mock("../../../../services/storage/storage", () => ({
  storage: {
    get: jest.fn(),
    set: jest.fn(),
  },
}));

jest.mock("../../../../services/sync/syncQueue", () => ({
  enqueueMutation: jest.fn(),
}));

const mockedStorage = storage as jest.Mocked<typeof storage>;

const mockedEnqueueMutation = enqueueMutation as jest.MockedFunction<
  typeof enqueueMutation
>;

const product = products[0];
const product2 = products[1];

describe("Cart business logic", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockedStorage.get.mockResolvedValue([]);

    mockedStorage.set.mockResolvedValue(undefined);

    mockedEnqueueMutation.mockResolvedValue(undefined);
  });

  test("adds a new product to an empty cart", async () => {
    const result = await addToCart(product);

    expect(result).toHaveLength(1);

    expect(result[0].product.id).toBe(product.id);

    expect(result[0].quantity).toBe(1);

    expect(mockedStorage.set).toHaveBeenCalled();

    expect(mockedEnqueueMutation).toHaveBeenCalled();
  });

  test("increases quantity when product already exists", async () => {
    mockedStorage.get.mockResolvedValue([
      {
        product,
        quantity: 1,
      },
    ]);

    const result = await addToCart(product);

    expect(result).toHaveLength(1);

    expect(result[0].product.id).toBe(product.id);

    expect(result[0].quantity).toBe(2);
  });

  test("updates product quantity", async () => {
    mockedStorage.get.mockResolvedValue([
      {
        product,
        quantity: 1,
      },
    ]);

    const result = await setQuantity(product.id, 5);

    expect(result).toHaveLength(1);

    expect(result[0].quantity).toBe(5);

    expect(result[0].product.id).toBe(product.id);
  });

  test("removes product when quantity is zero", async () => {
    mockedStorage.get.mockResolvedValue([
      {
        product,
        quantity: 2,
      },
    ]);

    const result = await setQuantity(product.id, 0);

    expect(result).toHaveLength(0);
  });

  test("removes product when quantity is negative", async () => {
    mockedStorage.get.mockResolvedValue([
      {
        product,
        quantity: 2,
      },
    ]);

    const result = await setQuantity(product.id, -1);

    expect(result).toHaveLength(0);
  });

  test("keeps other products when updating one product", async () => {
    mockedStorage.get.mockResolvedValue([
      {
        product,
        quantity: 1,
      },
      {
        product: product2,
        quantity: 2,
      },
    ]);

    const result = await setQuantity(product.id, 3);

    expect(result).toHaveLength(2);

    expect(
      result.find((item) => item.product.id === product.id)?.quantity,
    ).toBe(3);

    expect(
      result.find((item) => item.product.id === product2.id)?.quantity,
    ).toBe(2);
  });

  test("saves the cart after adding a product", async () => {
    await addToCart(product);

    expect(mockedStorage.set).toHaveBeenCalledWith("@amrutam/cart", [
      {
        product,
        quantity: 1,
      },
    ]);
  });

  test("queues cart update after changing quantity", async () => {
    mockedStorage.get.mockResolvedValue([
      {
        product,
        quantity: 1,
      },
    ]);

    await setQuantity(product.id, 4);

    expect(mockedEnqueueMutation).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "CART_UPDATE",
        payload: [
          {
            product,
            quantity: 4,
          },
        ],
      }),
    );
  });
});
