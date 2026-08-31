import React, { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../../navigation/types";
import { addToCart } from "../utils/cartService";
import { useAppTheme, useToast } from "../../../app/providers/AppProviders";
type Props = NativeStackScreenProps<MainStackParamList, "ProductDetails">;
export default function ProductDetailsScreen({ route }: Props) {
  const { product } = route.params;
  const { theme } = useAppTheme();
  const { show } = useToast();
  const [loading, setLoading] = useState(false);
  const add = async () => {
    setLoading(true);
    try {
      await addToCart(product);
      show(`${product.name} added to cart`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={styles.container}
    >
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={[styles.name, { color: theme.text }]}>{product.name}</Text>
      <Text style={{ color: theme.muted }}>
        {product.category} • ⭐ {product.rating}
      </Text>
      <Text style={[styles.price, { color: theme.primary }]}>
        ₹{product.price}
      </Text>
      <Text style={[styles.desc, { color: theme.text }]}>
        {product.description}
      </Text>
      <Pressable
        disabled={loading}
        onPress={add}
        style={[styles.button, { backgroundColor: theme.primary }]}
      >
        <Text style={styles.buttonText}>
          {loading ? "Adding..." : "Add to cart"}
        </Text>
      </Pressable>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { padding: 20 },
  image: { width: "100%", height: 280, borderRadius: 18 },
  name: { fontSize: 25, fontWeight: "800", marginTop: 18 },
  price: { fontSize: 22, fontWeight: "800", marginTop: 14 },
  desc: { fontSize: 16, lineHeight: 24, marginTop: 18 },
  button: {
    height: 52,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  buttonText: { color: "#fff", fontWeight: "800" },
});
