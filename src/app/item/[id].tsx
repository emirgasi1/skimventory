import EmptyState from '@/components/EmptyState';
import { FontSize, Radius, Spacing } from '@/constants/theme';
import { getItemById } from '@/data/api';
import { useTheme } from '@/hooks/use-theme';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ItemDetailsScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();

  const item = id ? getItemById(id) : undefined;

  if (!item) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: theme.background }]}>
        <Stack.Screen options={{ title: 'Not found' }} />
        <EmptyState
          title="Item not found"
          message="No inventory item matches this ID."
        />
      </View>
    );
  }

  const notesText =
    'notes' in item && typeof item.notes === 'string' && item.notes.trim().length > 0
      ? item.notes
      : 'No notes for this item.';

  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={[
        styles.container,
        { paddingBottom: Spacing.lg + insets.bottom },
      ]}
    >
      <Stack.Screen options={{ title: item.title }} />

      <Image source={{ uri: item.imageUrl }} style={styles.image} />

      <View style={styles.headerBlock}>
        <Text style={[styles.title, { color: theme.text }]}>{item.title}</Text>
        <Text style={[styles.subtitle, { color: theme.muted }]}>
          {item.creator ?? 'Unknown'}
        </Text>
      </View>

      <View style={styles.boxesRow}>
        <View style={[styles.infoBox, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.boxLabel, { color: theme.muted }]}>Category</Text>
          <Text style={[styles.boxValue, { color: theme.text }]}>{item.category}</Text>
        </View>
        <View style={[styles.infoBox, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.boxLabel, { color: theme.muted }]}>ID</Text>
          <Text style={[styles.boxValue, { color: theme.text }]}>{item.id}</Text>
        </View>
      </View>

      <View style={[styles.notesCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Notes</Text>
        <Text style={[styles.notesText, { color: theme.muted }]}>{notesText}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    padding: Spacing.md,
  },
  container: {
    padding: Spacing.md,
    gap: Spacing.md,
  },
  image: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: Radius.md,
  },
  headerBlock: {
    gap: Spacing.xs,
  },
  title: {
    fontSize: FontSize.hero,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: FontSize.body,
  },
  boxesRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  infoBox: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    gap: Spacing.xs,
  },
  boxLabel: {
    fontSize: FontSize.small,
  },
  boxValue: {
    fontSize: FontSize.body,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  notesCard: {
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    gap: Spacing.xs,
  },
  sectionTitle: {
    fontSize: FontSize.title,
    fontWeight: 'bold',
  },
  notesText: {
    fontSize: FontSize.body,
    lineHeight: 22,
  },
});