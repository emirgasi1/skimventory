import { FontSize, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { InventoryItem } from '@/types';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

type Props = {
  item: InventoryItem;
};

export default function ItemDetails({ item }: Props) {
  const theme = useTheme();

  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={styles.scrollContainer}
    >
      <View style={styles.contentWrapper}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        
        <Text style={[styles.title, { color: theme.text }]}>{item.title}</Text>
        {item.creator ? (
          <Text style={[styles.creator, { color: theme.muted }]}>{item.creator}</Text>
        ) : null}
        
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Row label="Category" value={item.category} theme={theme} />
          <Row label="Barcode" value={item.barcode} theme={theme} />
          {item.year ? <Row label="Year" value={String(item.year)} theme={theme} /> : null}
        </View>
        
        {item.notes ? (
          <Text style={[styles.notes, { color: theme.text }]}>{item.notes}</Text>
        ) : null}
      </View>
    </ScrollView>
  );
}

function Row({ label, value, theme }: { label: string; value: string; theme: any }) {
  return (
    <View style={styles.row}>
      <Text style={[styles.label, { color: theme.muted }]}>{label}</Text>
      <Text style={[styles.value, { color: theme.text }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: Spacing.md,
    flexGrow: 1,
  },
  contentWrapper: {
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
    gap: Spacing.md,
  },
  image: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: Radius.md,
  },
  title: {
    fontSize: FontSize.hero,
    fontWeight: 'bold',
  },
  creator: {
    fontSize: FontSize.body,
    marginTop: -Spacing.sm,
  },
  card: {
    borderRadius: Radius.md,
    borderWidth: 1,
    padding: Spacing.md,
    gap: Spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: FontSize.small,
  },
  value: {
    fontSize: FontSize.body,
    flexShrink: 1,
    textAlign: 'right',
  },
  notes: {
    fontSize: FontSize.body,
    lineHeight: 24,
  },
});