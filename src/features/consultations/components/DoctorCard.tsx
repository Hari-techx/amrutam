import React, { memo } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { DoctorCardProps } from "../types/doctor";
function DoctorCard({ doctor, onPress }: DoctorCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`View ${doctor.name}`}
      onPress={() => onPress(doctor)}
      style={styles.card}
    >
      <Image source={{ uri: doctor.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{doctor.name}</Text>
        <Text style={styles.specialization}>{doctor.specialization}</Text>
        <Text style={styles.meta}>
          {doctor.experience} yrs • ⭐ {doctor.rating}
        </Text>
        <Text style={styles.fee}>₹{doctor.consultationFee} consultation</Text>
      </View>
    </Pressable>
  );
}
export default memo(DoctorCard);
const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 14,
    marginBottom: 10,
    borderRadius: 14,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E2E7E2",
  },
  image: { width: 76, height: 76, borderRadius: 38 },
  content: { flex: 1, marginLeft: 12 },
  name: { fontSize: 17, fontWeight: "700", color: "#172018" },
  specialization: { marginTop: 4, color: "#4E5A50" },
  meta: { marginTop: 5, color: "#657065" },
  fee: { marginTop: 6, fontWeight: "700", color: "#2E6B45" },
});
