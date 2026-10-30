import ItemCard from '@/components/ItemCard';
import { items } from '@/data/items';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.count}>{items.length} items</Text>
      <View style={{ gap: 12 }}>
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
    backgroundColor: '#F7F4EB',
    flexGrow: 1,
  },
  count: {
    fontSize: 14,
    color: '#6B726A',
  },
});