import { FontSize, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AboutScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={[
        styles.container,
        { paddingBottom: Spacing.lg + insets.bottom },
      ]}
    >
      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.heading, { color: theme.text }]}>Skimventory</Text>
        <Text style={[styles.body, { color: theme.muted }]}>
          A scan-first personal inventory app for books, tools, pantry items, and everyday gear.
          Scan barcodes with your camera to look up item details, organize categories, and keep
          track of what you own.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.md,
    flexGrow: 1,
  },
  card: {
    padding: Spacing.lg,
    borderRadius: Radius.md,
    borderWidth: 1,
    gap: Spacing.sm,
  },
  heading: {
    fontSize: FontSize.title,
    fontWeight: 'bold',
  },
  body: {
    fontSize: FontSize.body,
    lineHeight: 22,
  },
});