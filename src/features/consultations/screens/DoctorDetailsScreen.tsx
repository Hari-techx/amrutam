import React, { useMemo, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../../navigation/types";
import { generateDoctorSlots } from "../utils/mockSlots";
import { createBooking } from "../utils/bookingService";
import { useAppTheme } from "../../../app/providers/AppProviders";
type Props = NativeStackScreenProps<MainStackParamList, "DoctorDetails">;
function addDays(date: Date, n: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d.toISOString().split("T")[0];
}
export default function DoctorDetailsScreen({ route, navigation }: Props) {
  const { doctor } = route.params;
  const { theme } = useAppTheme();
  const [date, setDate] = useState(addDays(new Date(), 1));
  const [selected, setSelected] = useState<string | null>(null);
  const slots = useMemo(
    () => generateDoctorSlots(doctor.id, date),
    [doctor.id, date],
  );
  const book = async () => {
    const slot = slots.find((s) => s.id === selected);
    if (!slot) return;
    try {
      await createBooking(doctor, slot);
      Alert.alert("Booking confirmed", "Your consultation has been booked.", [
        {
          text: "View upcoming",
          onPress: () => navigation.navigate("UpcomingConsultations"),
        },
        { text: "Done" },
      ]);
      setSelected(null);
    } catch (e) {
      Alert.alert(
        "Unable to book",
        e instanceof Error ? e.message : "Please try again.",
      );
    }
  };
  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={styles.container}
    >
      <Image source={{ uri: doctor.image }} style={styles.image} />
      <Text style={[styles.name, { color: theme.text }]}>{doctor.name}</Text>
      <Text style={[styles.spec, { color: theme.primary }]}>
        {doctor.specialization}
      </Text>
      <Text style={[styles.info, { color: theme.muted }]}>
        {doctor.experience} years experience • ⭐ {doctor.rating}
      </Text>
      <Text style={[styles.fee, { color: theme.text }]}>
        ₹{doctor.consultationFee} consultation
      </Text>
      <Text style={[styles.heading, { color: theme.text }]}>Choose date</Text>
      <View style={styles.row}>
        {[1, 2, 3].map((n) => {
          const d = addDays(new Date(), n);
          const active = d === date;
          return (
            <Pressable
              key={d}
              onPress={() => {
                setDate(d);
                setSelected(null);
              }}
              style={[
                styles.date,
                { borderColor: theme.border },
                active && {
                  backgroundColor: theme.primary,
                  borderColor: theme.primary,
                },
              ]}
            >
              <Text
                style={{
                  color: active ? "#fff" : String(theme.text),
                  fontWeight: "700",
                }}
              >
                {n === 1
                  ? "Tomorrow"
                  : new Date(d).toLocaleDateString(undefined, {
                      weekday: "short",
                    })}
              </Text>
              <Text
                style={{
                  color: active ? "#fff" : String(theme.muted),
                  fontSize: 12,
                }}
              >
                {d.slice(5)}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <Text style={[styles.heading, { color: theme.text }]}>
        Available slots
      </Text>
      <View style={styles.grid}>
        {slots.map((s) => {
          const disabled = s.isBooked;
          const active = s.id === selected;
          return (
            <Pressable
              key={s.id}
              disabled={disabled}
              onPress={() => setSelected(s.id)}
              accessibilityState={{ disabled, selected: active }}
              style={[
                styles.slot,
                { borderColor: theme.border },
                disabled && styles.disabled,
                active && {
                  backgroundColor: theme.primary,
                  borderColor: theme.primary,
                },
              ]}
            >
              <Text
                style={{
                  color: active ? "#fff" : String(theme.text),
                  textAlign: "center",
                  fontWeight: "600",
                }}
              >
                {s.startTime}
              </Text>
              <Text
                style={{
                  color: disabled
                    ? String(theme.muted)
                    : active
                      ? "#fff"
                      : String(theme.primary),
                  fontSize: 11,
                  textAlign: "center",
                  marginTop: 3,
                }}
              >
                {disabled ? "Booked" : s.endTime}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <Pressable
        disabled={!selected}
        onPress={book}
        style={[
          styles.book,
          { backgroundColor: selected ? theme.primary : "#AAB5AC" },
        ]}
      >
        <Text style={styles.bookText}>
          {selected ? "Confirm booking" : "Select a slot"}
        </Text>
      </Pressable>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { padding: 20, alignItems: "center" },
  image: { width: 130, height: 130, borderRadius: 65, marginBottom: 18 },
  name: { fontSize: 25, fontWeight: "800" },
  spec: { fontSize: 16, marginTop: 6, fontWeight: "700" },
  info: { marginTop: 8 },
  fee: { fontSize: 18, fontWeight: "800", marginTop: 10 },
  heading: {
    alignSelf: "stretch",
    fontSize: 18,
    fontWeight: "800",
    marginTop: 28,
    marginBottom: 12,
  },
  row: { alignSelf: "stretch", flexDirection: "row", flexWrap: "wrap" },
  date: {
    width: "31%",
    padding: 12,
    borderWidth: 1,
    borderRadius: 12,
    marginRight: "2%",
    marginBottom: 8,
    alignItems: "center",
  },
  grid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  slot: {
    width: "48%",
    padding: 12,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 10,
  },
  disabled: { opacity: 0.35 },
  book: {
    width: "100%",
    height: 52,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
    marginBottom: 20,
  },
  bookText: { color: "#fff", fontWeight: "800", fontSize: 16 },
});
