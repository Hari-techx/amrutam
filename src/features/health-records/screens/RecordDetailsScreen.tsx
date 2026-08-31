import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { MainStackParamList } from "../../../navigation/types";
import { useAppTheme } from "../../../app/providers/AppProviders";

type Props = NativeStackScreenProps<MainStackParamList, "RecordDetails">;

export default function RecordDetailsScreen({ route }: Props) {
  const { record } = route.params;
  const { theme } = useAppTheme();

  const [imageError, setImageError] = useState(false);

  const isImage = record.attachment?.type === "image";

  return (
    <ScrollView
      style={{
        backgroundColor: theme.background,
      }}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Record type */}

      <Text
        style={[
          styles.kind,
          {
            color: theme.primary,
          },
        ]}
      >
        {record.kind}
      </Text>

      {/* Title */}

      <Text
        style={[
          styles.title,
          {
            color: theme.text,
          },
        ]}
      >
        {record.title}
      </Text>

      {/* Date */}

      <Text
        style={{
          color: theme.muted,
        }}
      >
        {record.date}
      </Text>

      {/* Summary */}

      <Text
        style={[
          styles.summary,
          {
            color: theme.text,
          },
        ]}
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
            }}
          >
            #{tag}
          </Text>
        ))}
      </View>

      {/* Attachment */}

      {isImage && !imageError ? (
        <Image
          source={{
            uri: record.attachment!.uri,
          }}
          style={styles.image}
          resizeMode="cover"
          onError={() => {
            setImageError(true);
          }}
        />
      ) : isImage ? (
        <View
          style={[
            styles.imageFallback,
            {
              backgroundColor: theme.surface,
              borderColor: theme.border,
            },
          ]}
        >
          <Text style={styles.imageIcon}>🖼️</Text>

          <Text
            style={[
              styles.fallbackTitle,
              {
                color: theme.text,
              },
            ]}
          >
            Image attachment
          </Text>

          <Text
            style={{
              color: theme.muted,
            }}
          >
            Image unavailable
          </Text>
        </View>
      ) : (
        <View
          style={[
            styles.pdf,
            {
              backgroundColor: theme.surface,
              borderColor: theme.border,
            },
          ]}
        >
          <Text style={styles.pdfIcon}>📄</Text>

          <Text
            style={[
              styles.pdfText,
              {
                color: theme.text,
              },
            ]}
          >
            PDF attachment
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },

  kind: {
    fontSize: 15,
    fontWeight: "800",
  },

  title: {
    fontSize: 25,
    fontWeight: "800",
    marginTop: 8,
  },

  summary: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 24,
  },

  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 18,
  },

  image: {
    width: "100%",
    height: 240,
    borderRadius: 16,
    marginTop: 24,
  },

  imageFallback: {
    width: "100%",
    height: 240,
    borderWidth: 1,
    borderRadius: 16,
    marginTop: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  imageIcon: {
    fontSize: 42,
  },

  fallbackTitle: {
    fontSize: 18,
    fontWeight: "800",
    marginTop: 10,
    marginBottom: 4,
  },

  pdf: {
    height: 220,
    borderWidth: 1,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },

  pdfIcon: {
    fontSize: 42,
  },

  pdfText: {
    fontSize: 18,
    fontWeight: "800",
    marginTop: 10,
  },
});
