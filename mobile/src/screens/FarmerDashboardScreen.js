import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES, globalStyles } from '../theme';
import { TrendingUp, Package, Star, AlertCircle, ArrowLeft } from 'lucide-react-native';

export default function FarmerDashboardScreen({ navigation }) {
  
  const mockOrders = [
    { id: 'ORD-101', item: 'Organic Heirloom Tomatoes', qty: '2 kg', status: 'Pending', time: '10 mins ago' },
    { id: 'ORD-100', item: 'Fresh Spinach', qty: '1 kg', status: 'Shipped', time: '2 hours ago' },
  ];

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <ArrowLeft color={COLORS.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.greeting}>Welcome back,</Text>
        <Text style={styles.farmName}>Greenfield Farms</Text>

        {/* KPI Cards */}
        <View style={styles.kpiGrid}>
          <View style={[globalStyles.glassPanel, styles.kpiCard]}>
            <TrendingUp color={COLORS.primary} size={24} style={styles.kpiIcon} />
            <Text style={styles.kpiLabel}>Revenue (Week)</Text>
            <Text style={styles.kpiValue}>₹12,450</Text>
          </View>
          <View style={[globalStyles.glassPanel, styles.kpiCard]}>
            <Package color={COLORS.primary} size={24} style={styles.kpiIcon} />
            <Text style={styles.kpiLabel}>Active Orders</Text>
            <Text style={styles.kpiValue}>8</Text>
          </View>
          <View style={[globalStyles.glassPanel, styles.kpiCard]}>
            <Star color={COLORS.primary} size={24} style={styles.kpiIcon} />
            <Text style={styles.kpiLabel}>Avg AI Grade</Text>
            <Text style={styles.kpiValue}>96%</Text>
          </View>
        </View>

        {/* Recent Orders */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Orders to Fulfill</Text>
          
          {mockOrders.map((order, idx) => (
            <View key={idx} style={[globalStyles.glassPanel, styles.orderCard]}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderId}>{order.id}</Text>
                <Text style={styles.orderTime}>{order.time}</Text>
              </View>
              <Text style={styles.orderItem}>{order.item} <Text style={{color: COLORS.textSecondary}}>x {order.qty}</Text></Text>
              
              <View style={styles.orderFooter}>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>{order.status}</Text>
                </View>
                {order.status === 'Pending' && (
                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>Accept</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Upload AI CTA */}
        <TouchableOpacity style={[globalStyles.glassPanel, styles.uploadCta]}>
          <AlertCircle color={COLORS.background} size={32} style={styles.ctaIcon} />
          <View style={{flex: 1}}>
            <Text style={styles.ctaTitle}>Upload New Produce</Text>
            <Text style={styles.ctaSub}>Get instant AI freshness grading before listing.</Text>
          </View>
        </TouchableOpacity>

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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.padding,
    paddingBottom: SIZES.padding,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: COLORS.text,
    fontSize: SIZES.h3,
    fontWeight: 'bold',
  },
  greeting: {
    color: COLORS.textSecondary,
    fontSize: SIZES.h3,
  },
  farmName: {
    color: COLORS.primary,
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    marginBottom: SIZES.padding * 1.5,
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: SIZES.padding * 2,
  },
  kpiCard: {
    width: '48%',
    marginBottom: SIZES.padding,
    padding: 16,
  },
  kpiIcon: {
    marginBottom: 12,
  },
  kpiLabel: {
    color: COLORS.textSecondary,
    fontSize: SIZES.small,
    marginBottom: 4,
  },
  kpiValue: {
    color: COLORS.text,
    fontSize: SIZES.h2,
    fontWeight: 'bold',
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
  orderCard: {
    marginBottom: SIZES.padding,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderId: {
    color: COLORS.text,
    fontWeight: 'bold',
  },
  orderTime: {
    color: COLORS.textSecondary,
    fontSize: SIZES.small,
  },
  orderItem: {
    color: COLORS.text,
    fontSize: SIZES.body,
    marginBottom: 12,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    backgroundColor: 'rgba(0, 255, 0, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: COLORS.primary,
    fontSize: SIZES.small,
    fontWeight: 'bold',
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: SIZES.radiusSm,
  },
  actionButtonText: {
    color: COLORS.background,
    fontWeight: 'bold',
  },
  uploadCta: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.padding * 1.5,
    marginBottom: 40,
  },
  ctaIcon: {
    marginRight: 16,
  },
  ctaTitle: {
    color: COLORS.background,
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  ctaSub: {
    color: 'rgba(0,0,0,0.6)',
    fontSize: SIZES.small,
  }
});
