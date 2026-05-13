import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Leaf, Search, ArrowRight } from 'lucide-react-native';
import { COLORS, SIZES, globalStyles } from '../theme';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome to</Text>
            <Text style={styles.brandName}>AgroConnect</Text>
          </View>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => navigation.navigate('FarmerDashboard')}
          >
            <Search color={COLORS.primary} size={24} />
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <View style={[globalStyles.glassPanel, styles.heroCard]}>
          <Leaf color={COLORS.primary} size={40} style={styles.heroIcon} />
          <Text style={styles.heroTitle}>Fresh from the Farm</Text>
          <Text style={styles.heroSubtitle}>Directly to your doorstep. No middlemen, just fresh produce.</Text>
          
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => navigation.navigate('ProductList')}
          >
            <Text style={styles.primaryButtonText}>Shop Now</Text>
            <ArrowRight color={COLORS.background} size={20} />
          </TouchableOpacity>
        </View>

        {/* Categories / Highlights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hScroll}>
            {['Vegetables', 'Fruits', 'Dairy', 'Organic'].map((cat, index) => (
              <TouchableOpacity key={index} style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: SIZES.padding,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.padding * 2,
    marginTop: SIZES.padding,
  },
  greeting: {
    color: COLORS.textSecondary,
    fontSize: SIZES.h3,
  },
  brandName: {
    color: COLORS.primary,
    fontSize: SIZES.h1,
    fontWeight: 'bold',
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroCard: {
    alignItems: 'flex-start',
    paddingVertical: SIZES.padding * 2,
    marginBottom: SIZES.padding * 2,
  },
  heroIcon: {
    marginBottom: SIZES.padding,
  },
  heroTitle: {
    color: COLORS.text,
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    marginBottom: SIZES.radiusSm,
  },
  heroSubtitle: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body,
    marginBottom: SIZES.padding * 1.5,
    lineHeight: 22,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: SIZES.radius,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: COLORS.background,
    fontWeight: 'bold',
    fontSize: SIZES.body,
    marginRight: SIZES.radiusSm,
  },
  section: {
    marginBottom: SIZES.padding * 2,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    marginBottom: SIZES.padding,
  },
  hScroll: {
    flexDirection: 'row',
  },
  categoryBadge: {
    backgroundColor: COLORS.surface,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
  },
  categoryText: {
    color: COLORS.text,
    fontWeight: '600',
  }
});
