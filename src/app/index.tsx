import EmptyState from '@/components/EmptyState';
import FilterChip from '@/components/FilterChip';
import ItemCard from '@/components/ItemCard';
import { FontSize, Radius, Spacing } from '@/constants/theme';
import { fetchItems } from '@/data/api';
import { useTheme } from '@/hooks/use-theme';
import type { InventoryItem } from '@/types';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CATEGORIES = ['all', 'book', 'tool', 'pantry', 'other'] as const;

export default function HomeScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const router = useRouter();

  const [items, setItems] = useState<InventoryItem[]>([]);
  const [status, setStatus] = useState<'loading' | 'error' | 'ready'>('loading');
  const [attempt, setAttempt] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const [sort, setSort] = useState<'default' | 'az' | 'newest'>('default');

  const columns = width >= 900 ? 3 : width >= 600 ? 2 : 1;
  const cardWidth = (width - 2 * Spacing.md - (columns - 1) * Spacing.md) / columns;

  useEffect(() => {
    let ignore = false;
    setStatus('loading');

    fetchItems()
      .then((data) => {
        if (!ignore) {
          setItems(data);
          setStatus('ready');
        }
      })
      .catch(() => {
        if (!ignore) setStatus('error');
      });

    return () => {
      ignore = true;
    };
  }, [attempt]);

  async function onRefresh() {
    setRefreshing(true);
    try {
      const data = await fetchItems();
      setItems(data);
    } catch (e) {
    } finally {
      setRefreshing(false);
    }
  }

  if (status === 'loading') {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  if (status === 'error') {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <Text style={[styles.errorText, { color: theme.text }]}>Could not load inventory</Text>
        <Pressable
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={() => setAttempt((a) => a + 1)}
        >
          <Text style={[styles.buttonText, { color: theme.onPrimary }]}>Try again</Text>
        </Pressable>
      </View>
    );
  }

  let visibleItems = filter === 'all' ? items : items.filter((i) => i.category === filter);

  if (sort === 'az') {
    visibleItems = [...visibleItems].sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === 'newest') {
    visibleItems = [...visibleItems].sort((a, b) => Number(b.id) - Number(a.id));
  }

  const totalItems = items.length;
  const uniqueCategories = new Set(items.map((i) => i.category)).size;
  const totalValue = 450;

  function confirmDelete(item: InventoryItem) {
    Alert.alert('Delete item?', `"${item.title}" will be removed.`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setItems((list) => list.filter((i) => i.id !== item.id)),
      },
    ]);
  }

  return (
    <FlatList
      style={{ backgroundColor: theme.background }}
      refreshing={refreshing}
      onRefresh={onRefresh}
      contentContainerStyle={[
        styles.container,
        { paddingBottom: Spacing.md + insets.bottom },
      ]}
      data={visibleItems}
      keyExtractor={(item) => item.id}
      key={columns}
      numColumns={columns}
      columnWrapperStyle={columns > 1 ? { gap: Spacing.md } : undefined}
      ItemSeparatorComponent={() => <View style={{ height: Spacing.md }} />}
      renderItem={({ item }) => (
        <ItemCard
          item={item}
          style={{ width: cardWidth }}
          onPress={() =>
            router.push({
              pathname: '/item/[id]',
              params: { id: String(item.id) },
            })
          }
          onLongPress={() => confirmDelete(item)}
        />
      )}
      ListEmptyComponent={
        <EmptyState
          title={filter === 'all' ? 'No items yet' : `No ${filter} items`}
          message={filter === 'all' ? 'Your inventory will appear here.' : 'Choose another category.'}
        />
      }
      ListHeaderComponent={
        <>
          <View style={styles.summaryRow}>
            <StatBox label="Items" value={totalItems.toString()} theme={theme} />
            <StatBox label="Categories" value={uniqueCategories.toString()} theme={theme} />
            <StatBox label="Value (KM)" value={totalValue.toString()} theme={theme} />
          </View>

          <View style={styles.filterRow}>
            {CATEGORIES.map((cat) => (
              <FilterChip
                key={cat}
                label={cat}
                selected={filter === cat}
                onPress={() => setFilter(cat)}
              />
            ))}
          </View>

          <View style={styles.filterRow}>
            <FilterChip label="Default" selected={sort === 'default'} onPress={() => setSort('default')} />
            <FilterChip label="A-Z" selected={sort === 'az'} onPress={() => setSort('az')} />
            <FilterChip label="Newest" selected={sort === 'newest'} onPress={() => setSort('newest')} />
          </View>
        </>
      }
      ListHeaderComponentStyle={{ marginBottom: Spacing.md }}
    />
  );
}

function StatBox({ label, value, theme }: { label: string; value: string; theme: any }) {
  return (
    <View style={[styles.statBox, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Text style={[styles.statValue, { color: theme.text }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: theme.muted }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.md,
    flexGrow: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  errorText: {
    fontSize: FontSize.body,
    textAlign: 'center',
  },
  button: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
  },
  buttonText: {
    fontSize: FontSize.body,
    fontWeight: 'bold',
  },
  summaryRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  filterRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.md,
    flexWrap: 'wrap',
  },
  statBox: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: FontSize.title,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: FontSize.small,
    marginTop: Spacing.xs,
  },
});