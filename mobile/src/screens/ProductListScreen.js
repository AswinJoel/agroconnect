import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { COLORS, SIZES, globalStyles } from '../theme';
import api from '../services/api';
import { Star } from 'lucide-react-native';

export default function ProductListScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity 
      style={styles.cardContainer}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <View style={[globalStyles.glassPanel, styles.card]}>
        <View style={styles.imagePlaceholder}>
          <Text style={styles.emojiPlaceholder}>
            {item.category === 'Vegetables' ? '🥦' : item.category === 'Fruits' ? '🍎' : '🌾'}
          </Text>
        </View>
        
        <View style={styles.cardInfo}>
          <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.farmName} numberOfLines={1}>
            {item.farmerId?.farmName || 'Local Farm'}
          </Text>
          
          <View style={styles.priceRow}>
            <Text style={styles.price}>₹{item.price}<Text style={styles.unit}>/kg</Text></Text>
          </View>

          {item.aiGrade && (
            <View style={styles.badgeRow}>
              <Star color={COLORS.primary} size={12} fill={COLORS.primary} />
              <Text style={styles.badgeText}> {item.aiGrade}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[globalStyles.container, styles.center]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={renderProduct}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No products found.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: SIZES.padding,
  },
  row: {
    justifyContent: 'space-between',
  },
  cardContainer: {
    width: '48%',
    marginBottom: SIZES.padding,
  },
  card: {
    padding: 0,
    overflow: 'hidden',
  },
  imagePlaceholder: {
    height: 120,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.glassBorder,
  },
  emojiPlaceholder: {
    fontSize: 40,
  },
  cardInfo: {
    padding: 12,
  },
  productName: {
    color: COLORS.text,
    fontSize: SIZES.body,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  farmName: {
    color: COLORS.textSecondary,
    fontSize: SIZES.small,
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  price: {
    color: COLORS.primary,
    fontSize: SIZES.h3,
    fontWeight: 'bold',
  },
  unit: {
    color: COLORS.textSecondary,
    fontSize: SIZES.small,
    fontWeight: 'normal',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 255, 0, 0.1)',
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: 'bold',
  },
  emptyText: {
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 40,
  }
});
