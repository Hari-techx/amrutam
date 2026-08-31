import React, { useCallback, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getCart, setQuantity } from "../utils/cartService";
import { CartItem } from "../types/product";
import { useAppTheme } from "../../../app/providers/AppProviders";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../../navigation/types";

export default function CartScreen() {
  const { theme } = useAppTheme();

  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList, "Cart">>();

  const [data, setData] = useState<CartItem[]>([]);

  const load = useCallback(() => {
    void getCart().then(setData);
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  const subtotal = data.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
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
      <Text
        style={[
          styles.title,
          {
            color: theme.text,
          },
        ]}
      >
        Cart
      </Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.product.id}
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
            Your cart is empty
          </Text>
        }
        renderItem={({ item }) => (
          <View
            style={[
              styles.row,
              {
                backgroundColor: theme.surface,
                borderColor: theme.border,
              },
            ]}
          >
            <View style={styles.productInfo}>
              <Text
                style={[
                  styles.name,
                  {
                    color: theme.text,
                  },
                ]}
              >
                {item.product.name}
              </Text>

              <Text
                style={{
                  color: theme.muted,
                }}
              >
                ₹{item.product.price}
              </Text>
            </View>

            <View style={styles.qty}>
              <Pressable
                testID="cart-decrease-button"
                accessibilityRole="button"
                accessibilityLabel="Decrease quantity"
                onPress={async () => {
                  const cart = await setQuantity(
                    item.product.id,
                    item.quantity - 1,
                  );

                  setData(cart);
                }}
              >
                <Text style={styles.qtyText}>−</Text>
              </Pressable>

              <Text
                style={[
                  styles.quantity,
                  {
                    color: theme.text,
                  },
                ]}
              >
                {item.quantity}
              </Text>

              <Pressable
                testID="cart-increase-button"
                accessibilityRole="button"
                accessibilityLabel="Increase quantity"
                onPress={async () => {
                  const cart = await setQuantity(
                    item.product.id,
                    item.quantity + 1,
                  );

                  setData(cart);
                }}
              >
                <Text style={styles.qtyText}>+</Text>
              </Pressable>
            </View>
          </View>
        )}
      />

      {data.length > 0 && (
        <View
          style={[
            styles.summary,
            {
              backgroundColor: theme.surface,
            },
          ]}
        >
          <Text
            style={[
              styles.total,
              {
                color: theme.text,
              },
            ]}
          >
            Subtotal ₹{subtotal}
          </Text>

          <Text
            style={{
              color: theme.muted,
            }}
          >
            Taxes and delivery calculated at checkout.
          </Text>

          <Pressable
            testID="checkout-button"
            accessibilityRole="button"
            onPress={() => navigation.navigate("Checkout")}
            style={[
              styles.button,
              {
                backgroundColor: theme.primary,
              },
            ]}
          >
            <Text style={styles.buttonText}>Checkout Summary</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  title: {
    fontSize: 27,
    fontWeight: "800",
    marginBottom: 16,
  },

  row: {
    flexDirection: "row",
    padding: 14,
    borderWidth: 1,
    borderRadius: 14,
    marginBottom: 10,
    alignItems: "center",
  },

  productInfo: {
    flex: 1,
  },

  name: {
    fontWeight: "700",
    fontSize: 15,
  },

  qty: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  qtyText: {
    fontSize: 24,
    color: "#2E6B45",
  },

  quantity: {
    fontWeight: "700",
  },

  summary: {
    padding: 16,
    borderRadius: 14,
    marginTop: 8,
  },

  total: {
    fontSize: 20,
    fontWeight: "800",
  },

  button: {
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "800",
  },

  emptyText: {
    textAlign: "center",
    marginTop: 40,
  },
});
