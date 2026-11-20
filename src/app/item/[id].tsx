import EmptyState from '@/components/EmptyState';
import { FontSize, Spacing } from '@/constants/theme';
import { getItemById } from '@/data/api';
import { useTheme } from '@/hooks/use-theme';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function ItemDetailsScreen() {
  const theme = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();

  const item = id ? getItemById(id) : undefined;

  if (!item) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <EmptyState
          title="Item not found"
          message="No inventory item matches this ID."
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>{item.title}</Text>
      <Text style={[styles.meta, { color: theme.muted }]}>Category: {item.category}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  title: {
    fontSize: FontSize.title,
    fontWeight: 'bold',
  },
  meta: {
    fontSize: FontSize.body,
  },
});