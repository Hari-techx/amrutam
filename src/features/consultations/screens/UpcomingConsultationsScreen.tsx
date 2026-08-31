import React, { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { listUpcoming, cancelBooking } from "../utils/bookingService";
import { Booking } from "../types/booking";
import { useAppTheme } from "../../../app/providers/AppProviders";

export default function UpcomingConsultationsScreen() {
  const { theme } = useAppTheme();
  const [data, setData] = useState<Booking[]>([]);
  const load = useCallback(() => {
    void listUpcoming().then(setData);
  }, []);
  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={data}
        keyExtractor={(x) => x.id}
        ListHeaderComponent={
          <Text style={[styles.title, { color: theme.text }]}>
            Upcoming Consultations
          </Text>
        }
        ListEmptyComponent={
          <Text
            style={{ color: theme.muted, textAlign: "center", marginTop: 30 }}
          >
            No upcoming consultations
          </Text>
        }
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
          >
            <Text style={[styles.name, { color: theme.text }]}>
              {item.doctor.name}
            </Text>
            <Text style={{ color: theme.muted }}>
              {item.doctor.specialization}
            </Text>
            <Text style={[styles.time, { color: theme.primary }]}>
              {item.slot.date} • {item.slot.startTime} - {item.slot.endTime}
            </Text>
            <Pressable
              onPress={() =>
                Alert.alert("Cancel consultation", "Are you sure?", [
                  { text: "Keep" },
                  {
                    text: "Cancel",
                    style: "destructive",
                    onPress: async () => {
                      await cancelBooking(item.id);
                      load();
                    },
                  },
                ])
              }
              style={styles.cancel}
            >
              <Text style={{ color: theme.danger, fontWeight: "700" }}>
                Cancel booking
              </Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 26, fontWeight: "800", marginBottom: 16, marginTop: 8 },
  card: { padding: 16, borderWidth: 1, borderRadius: 14, marginBottom: 12 },
  name: { fontSize: 18, fontWeight: "800" },
  time: { marginTop: 8, fontWeight: "700" },
  cancel: { marginTop: 14, alignSelf: "flex-start" },
});
