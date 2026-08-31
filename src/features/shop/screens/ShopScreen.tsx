import React, { memo, useCallback, useMemo, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { MainStackParamList } from "../../../navigation/types";
import { products } from "../utils/mockProducts";
import { Product } from "../types/product";
import { addToCart } from "../utils/cartService";
import { useAppTheme, useToast } from "../../../app/providers/AppProviders";

type Nav = NativeStackNavigationProp<MainStackParamList, "HomeTabs">;

const PAGE_SIZE = 30;

const categories = [
  "All",
  "Herbal Care",
  "Digestive Wellness",
  "Immunity",
  "Skin Care",
  "Hair Care",
  "Daily Wellness",
];

export default function ShopScreen() {
  const { theme } = useAppTheme();
  const navigation = useNavigation<Nav>();
  const { show } = useToast();

  const [q, setQ] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<"price" | "rating">("rating");
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  const filteredProducts = useMemo(() => {
    const query = q.trim().toLowerCase();

    return products
      .filter((product) => {
        const matchesCategory =
          category === "All" || product.category === category;

        const matchesRating = product.rating >= minRating;
        const matchesPrice = product.price <= maxPrice;

        const matchesSearch =
          !query || product.name.toLowerCase().includes(query);

        return (
          matchesCategory && matchesRating && matchesPrice && matchesSearch
        );
      })
      .sort((a, b) => {
        if (sort === "price") {
          return a.price - b.price;
        }

        return b.rating - a.rating;
      });
  }, [q, category, sort, minRating, maxPrice]);

  const visibleProducts = useMemo(() => {
    return filteredProducts.slice(0, limit);
  }, [filteredProducts, limit]);

  const resetPagination = useCallback(() => {
    setLimit(PAGE_SIZE);
  }, []);

  const handleSearch = useCallback(
    (value: string) => {
      setQ(value);
      resetPagination();
    },
    [resetPagination],
  );

  const handleCategory = useCallback(
    (value: string) => {
      setCategory(value);
      resetPagination();
    },
    [resetPagination],
  );

  const handleSort = useCallback(
    (value: "price" | "rating") => {
      setSort(value);
      resetPagination();
    },
    [resetPagination],
  );

  const toggleRatingFilter = useCallback(() => {
    setMinRating((current) => (current === 4.5 ? 0 : 4.5));
    resetPagination();
  }, [resetPagination]);

  const togglePriceFilter = useCallback(() => {
    setMaxPrice((current) => (current === 500 ? 1000 : 500));
    resetPagination();
  }, [resetPagination]);

  const handleWish = useCallback((productId: string) => {
    setWishlist((previous) => {
      const next = new Set(previous);

      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }

      return next;
    });
  }, []);

  const handleOpen = useCallback(
    (product: Product) => {
      navigation.navigate("ProductDetails", {
        product,
      });
    },
    [navigation],
  );

  const handleAdd = useCallback(
    async (product: Product) => {
      await addToCart(product);
      show(`${product.name} added to cart`);
    },
    [show],
  );

  const loadMore = useCallback(() => {
    if (limit >= filteredProducts.length) {
      return;
    }

    setLimit((current) =>
      Math.min(current + PAGE_SIZE, filteredProducts.length),
    );
  }, [limit, filteredProducts.length]);

  const renderItem = useCallback(
    ({ item }: { item: Product }) => (
      <ProductCard
        product={item}
        wished={wishlist.has(item.id)}
        onWish={handleWish}
        onOpen={handleOpen}
        onAdd={handleAdd}
        theme={theme}
      />
    ),
    [wishlist, handleWish, handleOpen, handleAdd, theme],
  );

  const ListHeader = useMemo(
    () => (
      <View>
        <View style={styles.top}>
          <View>
            <Text
              style={[
                styles.title,
                {
                  color: theme.text,
                },
              ]}
            >
              Shop
            </Text>

            <Text
              style={{
                color: theme.muted,
              }}
            >
              20,000 products
            </Text>
          </View>

          <Pressable
            testID="shop-cart-button"
            accessibilityRole="button"
            onPress={() => navigation.navigate("Cart")}
            style={styles.cartButton}
          >
            <Text
              style={{
                color: theme.primary,
                fontWeight: "800",
              }}
            >
              Cart
            </Text>
          </Pressable>
        </View>

        <TextInput
          value={q}
          onChangeText={handleSearch}
          placeholder="Search products"
          placeholderTextColor={String(theme.muted)}
          style={[
            styles.input,
            {
              backgroundColor: theme.surface,
              borderColor: theme.border,
              color: theme.text,
            },
          ]}
        />

        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
          renderItem={({ item }) => {
            const selected = category === item;

            return (
              <Pressable
                onPress={() => handleCategory(item)}
                style={[
                  styles.chip,
                  {
                    borderColor: theme.border,
                  },
                  selected && {
                    backgroundColor: theme.primary,
                    borderColor: theme.primary,
                  },
                ]}
              >
                <Text
                  numberOfLines={1}
                  style={[
                    styles.chipText,
                    {
                      color: selected ? "#fff" : String(theme.text),
                    },
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            );
          }}
        />

        <View style={styles.controls}>
          <Text
            style={[
              styles.filterTitle,
              {
                color: theme.text,
              },
            ]}
          >
            Sort & Filter
          </Text>

          <View style={styles.controlRow}>
            <Pressable
              onPress={() => handleSort("rating")}
              style={[
                styles.controlButton,
                sort === "rating" && {
                  borderColor: theme.primary,
                  backgroundColor: theme.surface,
                },
              ]}
            >
              <Text
                numberOfLines={1}
                style={[
                  styles.controlText,
                  {
                    color:
                      sort === "rating"
                        ? String(theme.primary)
                        : String(theme.muted),
                  },
                ]}
              >
                Top rated
              </Text>
            </Pressable>

            <Pressable
              onPress={() => handleSort("price")}
              style={[
                styles.controlButton,
                sort === "price" && {
                  borderColor: theme.primary,
                  backgroundColor: theme.surface,
                },
              ]}
            >
              <Text
                numberOfLines={1}
                style={[
                  styles.controlText,
                  {
                    color:
                      sort === "price"
                        ? String(theme.primary)
                        : String(theme.muted),
                  },
                ]}
              >
                Price low
              </Text>
            </Pressable>
          </View>

          <View style={styles.controlRow}>
            <Pressable
              onPress={toggleRatingFilter}
              style={[
                styles.controlButton,
                minRating === 4.5 && {
                  borderColor: theme.primary,
                  backgroundColor: theme.surface,
                },
              ]}
            >
              <Text
                numberOfLines={1}
                style={[
                  styles.controlText,
                  {
                    color:
                      minRating === 4.5
                        ? String(theme.primary)
                        : String(theme.muted),
                  },
                ]}
              >
                Rating 4.5+
              </Text>
            </Pressable>

            <Pressable
              onPress={togglePriceFilter}
              style={[
                styles.controlButton,
                maxPrice === 500 && {
                  borderColor: theme.primary,
                  backgroundColor: theme.surface,
                },
              ]}
            >
              <Text
                numberOfLines={1}
                style={[
                  styles.controlText,
                  {
                    color:
                      maxPrice === 500
                        ? String(theme.primary)
                        : String(theme.muted),
                  },
                ]}
              >
                Under ₹500
              </Text>
            </Pressable>
          </View>
        </View>

        <Text
          style={[
            styles.resultText,
            {
              color: theme.muted,
            },
          ]}
        >
          Showing {visibleProducts.length} of {filteredProducts.length} products
        </Text>
      </View>
    ),
    [
      theme,
      navigation,
      q,
      handleSearch,
      category,
      handleCategory,
      sort,
      handleSort,
      minRating,
      toggleRatingFilter,
      maxPrice,
      togglePriceFilter,
      visibleProducts.length,
      filteredProducts.length,
    ],
  );

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <FlatList
        testID="shop-product-list"
        data={visibleProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={ListHeader}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.productList}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.2}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        windowSize={5}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text
            style={[
              styles.emptyText,
              {
                color: theme.muted,
              },
            ]}
          >
            No products found
          </Text>
        }
      />
    </View>
  );
}

const ProductCard = memo(function ProductCard({
  product,
  onOpen,
  onAdd,
  onWish,
  wished,
  theme,
}: {
  product: Product;
  onOpen: (product: Product) => void;
  onAdd: (product: Product) => void;
  onWish: (productId: string) => void;
  wished: boolean;
  theme: any;
}) {
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
        },
      ]}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={
          wished
            ? `Remove ${product.name} from wishlist`
            : `Add ${product.name} to wishlist`
        }
        onPress={() => onWish(product.id)}
        style={styles.heart}
      >
        <Text style={styles.heartText}>{wished ? "♥" : "♡"}</Text>
      </Pressable>

      <Pressable
        onPress={() => onOpen(product)}
        accessibilityRole="button"
        accessibilityLabel={`Open ${product.name}`}
      >
        <Image
          source={{
            uri: product.image,
          }}
          style={styles.productImage}
        />

        <Text
          numberOfLines={2}
          style={[
            styles.pname,
            {
              color: theme.text,
            },
          ]}
        >
          {product.name}
        </Text>

        <Text
          numberOfLines={1}
          style={{
            color: theme.muted,
          }}
        >
          {product.category}
        </Text>

        <Text
          style={[
            styles.rating,
            {
              color: theme.muted,
            },
          ]}
        >
          ⭐ {product.rating}
        </Text>

        <Text
          style={[
            styles.price,
            {
              color: theme.primary,
            },
          ]}
        >
          ₹{product.price}
        </Text>
      </Pressable>

      <Pressable
        testID={`add-to-cart-${product.id}`}
        accessibilityRole="button"
        accessibilityLabel={`Add ${product.name} to cart`}
        onPress={() => onAdd(product)}
        style={[
          styles.add,
          {
            backgroundColor: theme.primary,
          },
        ]}
      >
        <Text style={styles.addText}>Add</Text>
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  title: {
    fontSize: 27,
    fontWeight: "800",
  },

  cartButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 10,
  },

  categoryContainer: {
    paddingVertical: 4,
    paddingRight: 8,
  },

  chip: {
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderWidth: 1,
    borderRadius: 18,
    marginRight: 7,
    flexShrink: 0,
  },

  chipText: {
    fontSize: 14,
    fontWeight: "600",
    flexShrink: 0,
  },

  controls: {
    paddingVertical: 10,
    gap: 8,
  },

  filterTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 2,
  },

  controlRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },

  controlButton: {
    flex: 1,
    minHeight: 42,
    paddingHorizontal: 12,
    paddingVertical: 9,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },

  controlText: {
    fontSize: 14,
    fontWeight: "700",
    flexShrink: 0,
  },

  resultText: {
    fontSize: 13,
    marginBottom: 10,
  },

  productList: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 30,
  },

  columnWrapper: {
    gap: 10,
  },

  card: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderRadius: 14,
    marginBottom: 10,
    position: "relative",
  },

  heart: {
    position: "absolute",
    zIndex: 2,
    right: 8,
    top: 8,
    padding: 6,
  },

  heartText: {
    fontSize: 22,
  },

  productImage: {
    width: "100%",
    height: 125,
    borderRadius: 10,
  },

  pname: {
    fontWeight: "700",
    marginTop: 8,
  },

  rating: {
    marginTop: 4,
  },

  price: {
    fontSize: 16,
    fontWeight: "800",
    marginTop: 5,
  },

  add: {
    height: 38,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },

  addText: {
    color: "#fff",
    fontWeight: "800",
  },

  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
  },
});
