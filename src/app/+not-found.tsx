import { FontSize, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function NotFoundScreen() {
  const theme = useTheme();

  return (
    <>
      <Stack.Screen options={{ title: 'Not Found' }} />
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.title, { color: theme.text }]}>Page not found</Text>
        <Text style={[styles.message, { color: theme.muted }]}>
          That screen does not exist in Skimventory.
        </Text>
        <Link
          href="/"
          replace
          style={[
            styles.link,
            { backgroundColor: theme.primary, color: theme.onPrimary },
          ]}
        >
          Back to inventory
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  title: {
    fontSize: FontSize.title,
    fontWeight: 'bold',
  },
  message: {
    fontSize: FontSize.body,
    textAlign: 'center',
  },
  link: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
    fontSize: FontSize.body,
    fontWeight: 'bold',
    overflow: 'hidden',
  },
});