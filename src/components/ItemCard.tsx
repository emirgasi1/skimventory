import type { InventoryItem } from '@/types';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

type ItemCardProps = {
  item: InventoryItem;
};

export default function ItemCard({ item }: ItemCardProps) {
  return (
    <Pressable
      onPress={() => console.log('Open', item.id)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.body}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.meta}>
          {item.category} · {item.creator ?? 'Unknown'}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#EDE9DD',
  },
  pressed: {
    opacity: 0.6,
  },
  image: {
    width: '100%',
    height: 160,
  },
  body: {
    padding: 12,
    gap: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1F1C',
  },
  meta: {
    fontSize: 13,
    color: '#6B726A',
  },
});