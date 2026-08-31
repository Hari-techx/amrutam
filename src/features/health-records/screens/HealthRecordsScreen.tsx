import React, { memo, useCallback, useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { MainStackParamList } from "../../../navigation/types";
import { records } from "../utils/mockRecords";
import { RecordKind } from "../types/record";
import { useAppTheme } from "../../../app/providers/AppProviders";

type Nav = NativeStackNavigationProp<MainStackParamList, "HomeTabs">;

type HealthRecord = (typeof records)[number];

const PAGE_SIZE = 40;

const kinds: ("All" | RecordKind)[] = [
  "All",
  "Lab Report",
  "Prescription",
  "Consultation",
  "Vaccination",
  "Allergy",
];

/**
 * Convert YYYY-MM into a readable month.
 *
 * Kept outside the component so it isn't recreated
 * for every render.
 */
function formatMonth(month: string) {
  const [year, monthNumber] = month.split("-").map(Number);

  const date = new Date(year, monthNumber - 1, 1);

  return date.toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });
}

export default function HealthRecordsScreen() {
  const { theme } = useAppTheme();

  const navigation = useNavigation<Nav>();

  const [query, setQuery] = useState("");
  const [selectedKind, setSelectedKind] = useState<"All" | RecordKind>("All");

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredRecords = useMemo(() => {
    const search = query.trim().toLowerCase();

    let result = records;

    if (selectedKind !== "All") {
      result = result.filter((record) => record.kind === selectedKind);
    }

    if (search) {
      result = result.filter((record) => {
        const title = record.title.toLowerCase();

        const tags = record.tags.join(" ").toLowerCase();

        return title.includes(search) || tags.includes(search);
      });
    }

    return result;
  }, [query, selectedKind]);

  /*
   * Only the current page is passed to FlatList.
   */
  const visibleRecords = useMemo(
    () => filteredRecords.slice(0, visibleCount),
    [filteredRecords, visibleCount],
  );

  /*
   * Reset pagination.
   */
  const resetPagination = useCallback(() => {
    setVisibleCount(PAGE_SIZE);
  }, []);

  /*
   * Search.
   */
  const handleSearch = useCallback(
    (value: string) => {
      setQuery(value);
      resetPagination();
    },
    [resetPagination],
  );

  /*
   * Record type.
   */
  const handleKind = useCallback(
    (value: "All" | RecordKind) => {
      setSelectedKind(value);
      resetPagination();
    },
    [resetPagination],
  );

  /*
   * Load another page.
   */
  const handleEndReached = useCallback(() => {
    if (visibleCount >= filteredRecords.length) {
      return;
    }

    setVisibleCount((current) =>
      Math.min(current + PAGE_SIZE, filteredRecords.length),
    );
  }, [visibleCount, filteredRecords.length]);

  /*
   * Open record.
   */
  const handleOpenRecord = useCallback(
    (record: HealthRecord) => {
      navigation.navigate("RecordDetails", {
        record,
      });
    },
    [navigation],
  );

  /*
   * Render record.
   */
  const renderItem = useCallback(
    ({ item, index }: { item: HealthRecord; index: number }) => {
      const previous = visibleRecords[index - 1];

      const showMonth = index === 0 || previous?.month !== item.month;

      return (
        <RecordCard
          record={item}
          showMonth={showMonth}
          onPress={handleOpenRecord}
          theme={theme}
        />
      );
    },
    [visibleRecords, handleOpenRecord, theme],
  );

  /*
   * Header.
   *
   * This is part of the same vertical FlatList.
   */
  const header = useMemo(
    () => (
      <View>
        <Text
          style={[
            styles.title,
            {
              color: theme.text,
            },
          ]}
        >
          Health Records
        </Text>

        {/* Search */}

        <TextInput
          value={query}
          onChangeText={handleSearch}
          placeholder="Search records or tags"
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

        {/* Filter chips */}

        <FlatList
          horizontal
          data={kinds}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipContainer}
          renderItem={({ item }) => {
            const selected = selectedKind === item;

            return (
              <Pressable
                onPress={() => handleKind(item)}
                style={[
                  styles.chip,
                  {
                    borderColor: theme.border,
                  },
                  selected && {
                    backgroundColor: theme.primary,
                    borderColor: theme.primary,
                  },
                ]}
              >
                <Text
                  numberOfLines={1}
                  style={[
                    styles.chipText,
                    {
                      color: selected ? "#fff" : String(theme.text),
                    },
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            );
          }}
        />

        {/* Result count */}

        <Text
          style={[
            styles.resultText,
            {
              color: theme.muted,
            },
          ]}
        >
          Showing {visibleRecords.length} of {filteredRecords.length} records
        </Text>
      </View>
    ),
    [
      theme,
      query,
      handleSearch,
      selectedKind,
      handleKind,
      visibleRecords.length,
      filteredRecords.length,
    ],
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
      <FlatList
        data={visibleRecords}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={header}
        contentContainerStyle={styles.listContent}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.2}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        updateCellsBatchingPeriod={50}
        windowSize={5}
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
            No health records found
          </Text>
        }
      />
    </View>
  );
}

/**
 * Memoized record card.
 *
 * Prevents unaffected records from rendering
 * again when another record/state changes.
 */
const RecordCard = memo(function RecordCard({
  record,
  showMonth,
  onPress,
  theme,
}: {
  record: HealthRecord;
  showMonth: boolean;
  onPress: (record: HealthRecord) => void;
  theme: any;
}) {
  return (
    <View>
      {showMonth && (
        <Text
          style={[
            styles.month,
            {
              color: theme.primary,
            },
          ]}
        >
          {formatMonth(record.month)}
        </Text>
      )}

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Open ${record.title}`}
        onPress={() => onPress(record)}
        style={[
          styles.card,
          {
            backgroundColor: theme.surface,
            borderColor: theme.border,
          },
        ]}
      >
        {/* Type + date */}

        <View style={styles.kindRow}>
          <Text
            style={{
              color: theme.primary,
              fontWeight: "800",
            }}
          >
            {record.kind}
          </Text>

          <Text
            style={{
              color: theme.muted,
            }}
          >
            {record.date}
          </Text>
        </View>

        {/* Title */}

        <Text
          numberOfLines={2}
          style={[
            styles.name,
            {
              color: theme.text,
            },
          ]}
        >
          {record.title}
        </Text>

        {/* Summary */}

        <Text
          numberOfLines={2}
          style={{
            color: theme.muted,
          }}
        >
          {record.summary}
        </Text>

        {/* Tags */}

        <View style={styles.tags}>
          {record.tags.map((tag) => (
            <Text
              key={tag}
              style={{
                color: theme.primary,
                fontSize: 12,
              }}
            >
              #{tag}
            </Text>
          ))}
        </View>

        {/* Attachment */}

        <Text
          style={{
            color: theme.muted,
            marginTop: 7,
          }}
        >
          {record.attachment?.type === "pdf"
            ? "📄 PDF attachment"
            : "🖼 Image attachment"}
        </Text>
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 30,
  },

  title: {
    fontSize: 27,
    fontWeight: "800",
    marginBottom: 14,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 10,
  },

  chipContainer: {
    paddingVertical: 4,
    paddingRight: 8,
  },

  chip: {
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderWidth: 1,
    borderRadius: 18,
    marginRight: 7,
    flexShrink: 0,
  },

  chipText: {
    fontSize: 14,
    fontWeight: "600",
    flexShrink: 0,
  },

  resultText: {
    fontSize: 13,
    marginTop: 10,
    marginBottom: 4,
  },

  month: {
    fontSize: 18,
    fontWeight: "800",
    marginTop: 14,
    marginBottom: 8,
  },

  card: {
    padding: 14,
    borderWidth: 1,
    borderRadius: 14,
    marginBottom: 10,
  },

  kindRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  name: {
    fontSize: 16,
    fontWeight: "800",
    marginTop: 7,
  },

  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
  },
});
