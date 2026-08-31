import React, { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getCart, saveCart } from "../utils/cartService";
import { CartItem } from "../types/product";
import { useAppTheme, useToast } from "../../../app/providers/AppProviders";
export default function CheckoutScreen() {
  const { theme } = useAppTheme();
  const { show } = useToast();
  const [data, setData] = useState<CartItem[]>([]);
  const load = useCallback(() => {
    void getCart().then(setData);
  }, []);
  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );
  const subtotal = data.reduce((s, x) => s + x.product.price * x.quantity, 0);
  const delivery = subtotal >= 999 || subtotal === 0 ? 0 : 49;
  const total = subtotal + delivery;
  const navigation = useNavigation();
  const placeOrder = async () => {
    if (!data.length) return;
    await saveCart([]);
    show("Order placed successfully");
    Alert.alert("Order confirmed", `Total ₹${total}`, [
      {
        text: "OK",
        onPress: () => navigation.goBack(),
      },
    ]);
  };
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>
        Checkout Summary
      </Text>
      <FlatList
        data={data}
        keyExtractor={(x) => x.product.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.row,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
          >
            <Text style={{ color: theme.text, flex: 1 }}>
              {item.product.name} × {item.quantity}
            </Text>
            <Text style={{ color: theme.text, fontWeight: "700" }}>
              ₹{item.product.price * item.quantity}
            </Text>
          </View>
        )}
      />
      <View style={[styles.summary, { backgroundColor: theme.surface }]}>
        <Text style={{ color: theme.muted }}>Subtotal: ₹{subtotal}</Text>
        <Text style={{ color: theme.muted, marginTop: 8 }}>
          Delivery: ₹{delivery}
        </Text>
        <Text style={[styles.total, { color: theme.text }]}>
          Total: ₹{total}
        </Text>
        <Pressable
          disabled={!data.length}
          onPress={placeOrder}
          style={[
            styles.button,
            { backgroundColor: data.length ? theme.primary : "#AAB5AC" },
          ]}
        >
          <Text style={styles.buttonText}>Place order</Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 27, fontWeight: "800", marginBottom: 16 },
  row: {
    padding: 14,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 8,
    flexDirection: "row",
  },
  summary: { padding: 16, borderRadius: 14, marginTop: 10 },
  total: { fontSize: 22, fontWeight: "800", marginTop: 12 },
  button: {
    height: 52,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  buttonText: { color: "#fff", fontWeight: "800" },
});
