import ItemCard from '@/components/ItemCard';
import { FontSize, Radius, Spacing } from '@/constants/theme';
import { items } from '@/data/items';
import { useTheme } from '@/hooks/use-theme';
import { ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const columns = width >= 900 ? 3 : width >= 600 ? 2 : 1;
  
  const cardWidth = (width - 2 * Spacing.md - (columns - 1) * Spacing.md) / columns;

  const totalItems = items.length;
  const uniqueCategories = new Set(items.map((i) => i.category)).size;
  const totalValue = 450;


  
  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={[
        styles.container,
        { paddingBottom: Spacing.md + insets.bottom },
      ]}
    >
      <View style={styles.summaryRow}>
        <StatBox label="Items" value={totalItems.toString()} theme={theme} />
        <StatBox label="Categories" value={uniqueCategories.toString()} theme={theme} />
        <StatBox label="Value (KM)" value={totalValue.toString()} theme={theme} />
      </View>
      
      
      <View style={[styles.grid, { gap: Spacing.md }]}>
        {items.map((item) => (
          <ItemCard 
            key={item.id} 
            item={item} 
            style={{ width: cardWidth }} 
          />
        ))}
      </View>
    </ScrollView>
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
  summaryRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.md, 
  },
  grid: {
    flexDirection: 'row',
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