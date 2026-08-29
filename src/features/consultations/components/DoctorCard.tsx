import React, { memo } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Doctor } from '../types/doctor';

interface DoctorCardProps {
  doctor: Doctor;
  onPress: (doctor: Doctor) => void;
}

function DoctorCard({
  doctor,
  onPress,
}: DoctorCardProps) {
  return (
    <Pressable
      onPress={() => onPress(doctor)}
      style={styles.card}
    >
      <Image
        source={{ uri: doctor.image }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.name}>
          {doctor.name}
        </Text>

        <Text style={styles.specialization}>
          {doctor.specialization}
        </Text>

        <Text style={styles.experience}>
          {doctor.experience} years experience
        </Text>

        <Text style={styles.rating}>
          ⭐ {doctor.rating}
        </Text>

        <Text style={styles.fee}>
          ₹{doctor.consultationFee}
        </Text>
      </View>
    </Pressable>
  );
}

export default memo(DoctorCard);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },

  content: {
    flex: 1,
    marginLeft: 12,
  },

  name: {
    fontSize: 17,
    fontWeight: '700',
  },

  specialization: {
    marginTop: 4,
    fontSize: 14,
  },

  experience: {
    marginTop: 4,
    fontSize: 13,
  },

  rating: {
    marginTop: 4,
    fontSize: 13,
  },

  fee: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '600',
  },
});