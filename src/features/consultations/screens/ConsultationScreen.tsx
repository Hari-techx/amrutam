import React, { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import DoctorCard from "../components/DoctorCard";
import { doctors } from "../utils/mockDoctors";
import {
  SPECIALIZATIONS,
  RATING_OPTIONS,
  FEE_OPTIONS,
  DEFAULT_MIN_RATING,
  DEFAULT_MAX_FEE,
} from "../utils/consultationFilters";
import { MainStackParamList } from "../../../navigation/types";
import { useAppTheme } from "../../../app/providers/AppProviders";
type Nav = NativeStackNavigationProp<MainStackParamList, "HomeTabs">;
export default function ConsultationScreen() {
  const navigation = useNavigation<Nav>();
  const { theme } = useAppTheme();
  const [q, setQ] = useState("");
  const [spec, setSpec] = useState("");
  const [rating, setRating] = useState(DEFAULT_MIN_RATING);
  const [fee, setFee] = useState(DEFAULT_MAX_FEE);
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return doctors.filter(
      (d) =>
        (!query ||
          d.name.toLowerCase().includes(query) ||
          d.specialization.toLowerCase().includes(query)) &&
        (!spec || d.specialization === spec) &&
        d.rating >= rating &&
        d.consultationFee <= fee,
    );
  }, [q, spec, rating, fee]);
  const clear = () => {
    setQ("");
    setSpec("");
    setRating(DEFAULT_MIN_RATING);
    setFee(DEFAULT_MAX_FEE);
  };
  const header = (
    <View>
      <View style={styles.headerRow}>
        <View>
          <Text style={[styles.title, { color: theme.text }]}>
            Consultations
          </Text>
          <Text style={[styles.subtitle, { color: theme.muted }]}>
            Find trusted Ayurvedic specialists
          </Text>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.navigate("UpcomingConsultations")}
        >
          <Text style={{ color: theme.primary, fontWeight: "700" }}>
            Upcoming
          </Text>
        </Pressable>
      </View>
      <TextInput
        value={q}
        onChangeText={setQ}
        placeholder="Search doctors or specialization"
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
      <Text style={[styles.section, { color: theme.text }]}>
        Specialization
      </Text>
      <View style={styles.wrap}>
        {SPECIALIZATIONS.map((x) => (
          <Pressable
            key={x}
            onPress={() => setSpec(spec === x ? "" : x)}
            style={[
              styles.chip,
              { borderColor: theme.border },
              spec === x && {
                backgroundColor: theme.primary,
                borderColor: theme.primary,
              },
            ]}
          >
            <Text
              style={{
                color: spec === x ? "#fff" : String(theme.text),
                fontSize: 12,
              }}
            >
              {x}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={[styles.section, { color: theme.text }]}>
        Minimum rating
      </Text>
      <View style={styles.row}>
        {RATING_OPTIONS.map((x) => (
          <Pressable
            key={x}
            onPress={() => setRating(x)}
            style={[
              styles.chip,
              { borderColor: theme.border },
              rating === x && {
                backgroundColor: theme.primary,
                borderColor: theme.primary,
              },
            ]}
          >
            <Text style={{ color: rating === x ? "#fff" : String(theme.text) }}>
              {x === 0 ? "All" : `${x}+`}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={[styles.section, { color: theme.text }]}>Maximum fee</Text>
      <View style={styles.row}>
        {FEE_OPTIONS.map((x) => (
          <Pressable
            key={x}
            onPress={() => setFee(x)}
            style={[
              styles.chip,
              { borderColor: theme.border },
              fee === x && {
                backgroundColor: theme.primary,
                borderColor: theme.primary,
              },
            ]}
          >
            <Text style={{ color: fee === x ? "#fff" : String(theme.text) }}>
              ₹{x}
            </Text>
          </Pressable>
        ))}
      </View>
      <Pressable onPress={clear} style={styles.clear}>
        <Text style={{ color: theme.primary, fontWeight: "700" }}>
          Clear filters
        </Text>
      </Pressable>
    </View>
  );
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <FlatList
        data={filtered}
        ListHeaderComponent={header}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <DoctorCard
            doctor={item}
            onPress={(d) => navigation.navigate("DoctorDetails", { doctor: d })}
          />
        )}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews
        ListEmptyComponent={
          <Text
            style={{ textAlign: "center", color: theme.muted, marginTop: 24 }}
          >
            No doctors found
          </Text>
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 16,
  },
  title: { fontSize: 27, fontWeight: "800" },
  subtitle: { marginTop: 3 },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  section: { fontSize: 16, fontWeight: "700", marginBottom: 8 },
  wrap: { flexDirection: "row", flexWrap: "wrap", marginBottom: 12 },
  row: { flexDirection: "row", flexWrap: "wrap", marginBottom: 12 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 20,
    marginRight: 7,
    marginBottom: 7,
  },
  clear: { alignSelf: "flex-end", marginBottom: 10 },
});
