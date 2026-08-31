import AsyncStorage from "@react-native-async-storage/async-storage";
import { storage } from "../storage";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

const mockedAsyncStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>;

describe("storage utility", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("get returns parsed stored value", async () => {
    mockedAsyncStorage.getItem.mockResolvedValue(
      JSON.stringify({ name: "Hari", age: 25 }),
    );

    const result = await storage.get("@test/user", {});

    expect(result).toEqual({
      name: "Hari",
      age: 25,
    });

    expect(mockedAsyncStorage.getItem).toHaveBeenCalledWith("@test/user");
  });

  test("get returns fallback when no value exists", async () => {
    mockedAsyncStorage.getItem.mockResolvedValue(null);

    const fallback: string[] = [];

    const result = await storage.get("@test/items", fallback);

    expect(result).toBe(fallback);
  });

  test("get returns fallback when stored JSON is invalid", async () => {
    mockedAsyncStorage.getItem.mockResolvedValue("invalid-json");

    const fallback = {
      value: "fallback",
    };

    const result = await storage.get("@test/data", fallback);

    expect(result).toBe(fallback);
  });

  test("get returns fallback when AsyncStorage fails", async () => {
    mockedAsyncStorage.getItem.mockRejectedValue(new Error("Storage error"));

    const fallback = "default";

    const result = await storage.get("@test/key", fallback);

    expect(result).toBe(fallback);
  });

  test("set stores JSON stringified value", async () => {
    mockedAsyncStorage.setItem.mockResolvedValue();

    const value = {
      name: "Hari",
      active: true,
    };

    await storage.set("@test/user", value);

    expect(mockedAsyncStorage.setItem).toHaveBeenCalledWith(
      "@test/user",
      JSON.stringify(value),
    );
  });

  test("remove deletes the stored value", async () => {
    mockedAsyncStorage.removeItem.mockResolvedValue();

    await storage.remove("@test/user");

    expect(mockedAsyncStorage.removeItem).toHaveBeenCalledWith("@test/user");
  });
});
