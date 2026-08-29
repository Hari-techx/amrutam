import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { MainStackParamList } from '../../../navigation/types';
import DoctorCard from '../components/DoctorCard';
import { doctors } from '../utils/mockDoctors';
import {
  SPECIALIZATIONS,
  RATING_OPTIONS,
  FEE_OPTIONS,
  DEFAULT_MIN_RATING,
  DEFAULT_MAX_FEE,
} from '../utils/consultationFilters';

export default function ConsultationScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] =
    useState('');
  const [minRating, setMinRating] = useState(DEFAULT_MIN_RATING);
  const [maxFee, setMaxFee] = useState(DEFAULT_MAX_FEE);



  type NavigationProp =
  NativeStackNavigationProp<
    MainStackParamList,
    'Consultations'
  >;

const navigation = useNavigation<NavigationProp>();


  const filteredDoctors = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return doctors.filter((doctor) => {
      const matchesSearch =
        !query ||
        doctor.name.toLowerCase().includes(query) ||
        doctor.specialization.toLowerCase().includes(query);

      const matchesSpecialization =
        !selectedSpecialization ||
        doctor.specialization === selectedSpecialization;

      const matchesRating = doctor.rating >= minRating;

      const matchesFee =
        doctor.consultationFee <= maxFee;

      return (
        matchesSearch &&
        matchesSpecialization &&
        matchesRating &&
        matchesFee
      );
    });
  }, [
    searchQuery,
    selectedSpecialization,
    minRating,
    maxFee,
  ]);

  const clearFilters = () => {
    setSelectedSpecialization('');
    setMinRating(DEFAULT_MIN_RATING);
    setMaxFee(DEFAULT_MAX_FEE);
  };

  const renderHeader = () => {
    return (
      <View>
        <Text style={styles.title}>
          Consultations
        </Text>

        {/* Search */}
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search doctors or specialization"
          style={styles.searchInput}
        />

        {/* Specialization */}
        <Text style={styles.sectionTitle}>
          Specialization
        </Text>

        <View style={styles.filterContainer}>
          {SPECIALIZATIONS.map((specialization) => {
            const isSelected =
              selectedSpecialization === specialization;

            return (
              <Pressable
                key={specialization}
                onPress={() =>
                  setSelectedSpecialization(
                    isSelected ? '' : specialization,
                  )
                }
                style={[
                  styles.filterButton,
                  isSelected &&
                    styles.selectedFilterButton,
                ]}
              >
                <Text
                  style={[
                    styles.filterText,
                    isSelected &&
                      styles.selectedFilterText,
                  ]}
                >
                  {specialization}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Rating */}
        <Text style={styles.sectionTitle}>
          Minimum Rating
        </Text>

        <View style={styles.optionRow}>
          {RATING_OPTIONS.map((rating) => {
            const isSelected =
              minRating === rating;

            return (
              <Pressable
                key={rating}
                onPress={() => setMinRating(rating)}
                style={[
                  styles.optionButton,
                  isSelected &&
                    styles.selectedFilterButton,
                ]}
              >
                <Text
                  style={[
                    styles.filterText,
                    isSelected &&
                      styles.selectedFilterText,
                  ]}
                >
                  {rating === 0
                    ? 'All'
                    : `${rating}+`}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Maximum Fee */}
        <Text style={styles.sectionTitle}>
          Maximum Consultation Fee
        </Text>

        <View style={styles.optionRow}>
          {FEE_OPTIONS.map((fee) => {
            const isSelected = maxFee === fee;

            return (
              <Pressable
                key={fee}
                onPress={() => setMaxFee(fee)}
                style={[
                  styles.optionButton,
                  isSelected &&
                    styles.selectedFilterButton,
                ]}
              >
                <Text
                  style={[
                    styles.filterText,
                    isSelected &&
                      styles.selectedFilterText,
                  ]}
                >
                  ₹{fee}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Clear Filters */}
        <Pressable
          onPress={clearFilters}
          style={styles.clearButton}
        >
          <Text style={styles.clearButtonText}>
            Clear Filters
          </Text>
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredDoctors}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
  <DoctorCard
    doctor={item}
    onPress={(doctor) =>
      navigation.navigate('DoctorDetails', {
        doctor,
      })
    }
  />
)}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No doctors found
          </Text>
        }
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 16,
  },

  searchInput: {
    height: 48,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },

  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },

  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },

  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },

  optionButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },

  selectedFilterButton: {
    backgroundColor: '#000',
  },

  filterText: {
    fontSize: 13,
  },

  selectedFilterText: {
    color: '#fff',
  },

  clearButton: {
    alignSelf: 'flex-end',
    marginBottom: 16,
  },

  clearButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 15,
  },
});