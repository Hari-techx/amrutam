import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { MainStackParamList } from '../../../navigation/types';
import { generateDoctorSlots } from '../utils/mockSlots';

type Props = NativeStackScreenProps<
  MainStackParamList,
  'DoctorDetails'
>;

export default function DoctorDetailsScreen({
  route,
}: Props) {
  const { doctor } = route.params;

  const today = new Date()
    .toISOString()
    .split('T')[0];

  const slots = generateDoctorSlots(
    doctor.id,
    today,
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Doctor Image */}
      <Image
        source={{ uri: doctor.image }}
        style={styles.image}
      />

      {/* Doctor Information */}
      <Text style={styles.name}>
        {doctor.name}
      </Text>

      <Text style={styles.specialization}>
        {doctor.specialization}
      </Text>

      <Text style={styles.info}>
        {doctor.experience} years experience
      </Text>

      <Text style={styles.info}>
        ⭐ {doctor.rating} rating
      </Text>

      <Text style={styles.fee}>
        ₹{doctor.consultationFee}
      </Text>

      {/* Available Slots */}
      <Text style={styles.slotsTitle}>
        Available Slots
      </Text>

      <View style={styles.slotsContainer}>
        {slots.map((slot) => {
          const disabled = slot.isBooked;

          return (
            <Pressable
              key={slot.id}
              disabled={disabled}
              style={[
                styles.slot,
                disabled && styles.bookedSlot,
              ]}
            >
              <Text
                style={[
                  styles.slotText,
                  disabled &&
                    styles.bookedSlotText,
                ]}
              >
                {slot.startTime} - {slot.endTime}
              </Text>

              <Text style={styles.slotStatus}>
                {disabled ? 'Booked' : 'Available'}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  contentContainer: {
    padding: 20,
    alignItems: 'center',
  },

  image: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 20,
  },

  name: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },

  specialization: {
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
  },

  info: {
    fontSize: 15,
    marginTop: 8,
  },

  fee: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 12,
  },

  slotsTitle: {
    alignSelf: 'flex-start',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 30,
    marginBottom: 12,
  },

  slotsContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  slot: {
    width: '48%',
    padding: 14,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },

  bookedSlot: {
    opacity: 0.4,
  },

  slotText: {
    textAlign: 'center',
    fontSize: 14,
  },

  bookedSlotText: {
    textDecorationLine: 'line-through',
  },

  slotStatus: {
    textAlign: 'center',
    marginTop: 6,
    fontSize: 12,
  },
});