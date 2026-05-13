import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { COLORS, SIZES, globalStyles } from '../theme';
import { MapPin, Star, ShieldCheck, ArrowLeft, ShoppingCart } from 'lucide-react-native';

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;

  return (
    <View style={globalStyles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        {/* Mock Image Header */}
        <View style={styles.imageHeader}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft color={COLORS.text} size={24} />
          </TouchableOpacity>
          <Text style={styles.heroEmoji}>
            {product.category === 'Vegetables' ? '🥦' : product.category === 'Fruits' ? '🍎' : '🌾'}
          </Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.title}>{product.name}</Text>

          <View style={styles.farmRow}>
            <MapPin color={COLORS.primary} size={16} />
            <Text style={styles.farmName}>
              {product.farmerId?.farmName || 'Local Farm'}
            </Text>
          </View>

          {/* AI Grade Badge */}
          {product.aiGrade && (
            <View style={[globalStyles.glassPanel, styles.aiCard]}>
              <View style={styles.aiHeader}>
                <ShieldCheck color={COLORS.primary} size={20} />
                <Text style={styles.aiTitle}> AI Freshness Grade</Text>
              </View>
              <View style={styles.aiScoreRow}>
                <Text style={styles.aiGradeText}>{product.aiGrade}</Text>
                <View style={styles.scorePill}>
                  <Star color={COLORS.background} size={12} fill={COLORS.background} />
                  <Text style={styles.scoreText}> {(product.aiScore * 100).toFixed(0)}%</Text>
                </View>
              </View>
            </View>
          )}

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            Freshly harvested {product.name.toLowerCase()} sourced directly from {product.farmerId?.farmName || 'local farmers'}. 
            Our platform ensures you get the best quality produce without any middlemen, ensuring maximum freshness and fair prices for the farmers.
          </Text>

          <View style={[globalStyles.glassPanel, styles.nutritionCard]}>
            <Text style={styles.nutritionTitle}>Quick Facts</Text>
            <View style={styles.factRow}>
              <Text style={styles.factLabel}>Stock Available:</Text>
              <Text style={styles.factValue}>{product.stock} kg</Text>
            </View>
            <View style={styles.factRow}>
              <Text style={styles.factLabel}>Harvested:</Text>
              <Text style={styles.factValue}>Today</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={[globalStyles.glassPanel, styles.bottomBar]}>
        <View>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.price}>₹{product.price}<Text style={styles.unit}>/kg</Text></Text>
        </View>
        <TouchableOpacity 
          style={styles.buyButton}
          onPress={() => navigation.navigate('Checkout', { product })}
        >
          <ShoppingCart color={COLORS.background} size={20} />
          <Text style={styles.buyButtonText}>Buy Direct</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 100, // space for bottom bar
  },
  imageHeader: {
    height: 300,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: SIZES.padding,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  heroEmoji: {
    fontSize: 100,
  },
  detailsContainer: {
    padding: SIZES.padding,
    marginTop: -20,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  category: {
    color: COLORS.primary,
    fontSize: SIZES.small,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
    marginTop: 8,
  },
  title: {
    color: COLORS.text,
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  farmRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.padding * 1.5,
  },
  farmName: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body,
    marginLeft: 6,
  },
  aiCard: {
    marginBottom: SIZES.padding * 1.5,
    padding: SIZES.padding,
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  aiTitle: {
    color: COLORS.text,
    fontSize: SIZES.h3,
    fontWeight: 'bold',
  },
  aiScoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  aiGradeText: {
    color: COLORS.primary,
    fontSize: SIZES.h2,
    fontWeight: 'bold',
  },
  scorePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  scoreText: {
    color: COLORS.background,
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body,
    lineHeight: 24,
    marginBottom: SIZES.padding * 1.5,
  },
  nutritionCard: {
    padding: SIZES.padding,
  },
  nutritionTitle: {
    color: COLORS.text,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  factRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  factLabel: {
    color: COLORS.textSecondary,
  },
  factValue: {
    color: COLORS.text,
    fontWeight: 'bold',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    paddingVertical: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  priceLabel: {
    color: COLORS.textSecondary,
    fontSize: SIZES.small,
  },
  price: {
    color: COLORS.text,
    fontSize: SIZES.h2,
    fontWeight: 'bold',
  },
  unit: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body,
    fontWeight: 'normal',
  },
  buyButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: SIZES.radius,
  },
  buyButtonText: {
    color: COLORS.background,
    fontWeight: 'bold',
    fontSize: SIZES.body,
    marginLeft: 8,
  }
});
