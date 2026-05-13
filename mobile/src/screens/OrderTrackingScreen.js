import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { COLORS, SIZES, globalStyles } from '../theme';
import { MapPin, Truck } from 'lucide-react-native';

export default function OrderTrackingScreen() {
  const [loading, setLoading] = useState(true);

  // Mock locations for demo
  const userLocation = { latitude: 12.9716, longitude: 77.5946 }; // Bangalore
  const [driverLocation, setDriverLocation] = useState({ latitude: 12.9600, longitude: 77.5800 });

  useEffect(() => {
    // Simulate loading map
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    // Simulate driver moving towards user
    const interval = setInterval(() => {
      setDriverLocation(prev => ({
        latitude: prev.latitude + (userLocation.latitude - prev.latitude) * 0.1,
        longitude: prev.longitude + (userLocation.longitude - prev.longitude) * 0.1,
      }));
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  if (loading) {
    return (
      <View style={[globalStyles.container, styles.center]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading Map...</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: (userLocation.latitude + driverLocation.latitude) / 2,
          longitude: (userLocation.longitude + driverLocation.longitude) / 2,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        userInterfaceStyle="dark"
      >
        <Marker coordinate={userLocation} title="Your Location">
          <View style={styles.markerContainer}>
            <MapPin color={COLORS.primary} size={30} fill={COLORS.surface} />
          </View>
        </Marker>
        <Marker coordinate={driverLocation} title="Driver">
          <View style={styles.driverMarker}>
            <Truck color={COLORS.background} size={20} />
          </View>
        </Marker>
        <Polyline 
          coordinates={[driverLocation, userLocation]}
          strokeColor={COLORS.primary}
          strokeWidth={3}
          lineDashPattern={[5, 5]}
        />
      </MapView>

      <View style={styles.statusCard}>
        <Text style={styles.statusTitle}>Order Status</Text>
        <Text style={styles.statusMain}>Out for Delivery</Text>
        <Text style={styles.statusDesc}>Your fresh produce is arriving in approx 15 mins.</Text>
        
        <View style={styles.driverInfo}>
          <View style={styles.driverAvatar}>
            <Text style={styles.driverInitial}>R</Text>
          </View>
          <View>
            <Text style={styles.driverName}>Ramesh Kumar</Text>
            <Text style={styles.driverVehicle}>KA 01 AB 1234 • Mini Truck</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: COLORS.textSecondary,
    marginTop: 10,
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  driverMarker: {
    backgroundColor: COLORS.primary,
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.background,
  },
  statusCard: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  statusTitle: {
    color: COLORS.textSecondary,
    fontSize: SIZES.small,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  statusMain: {
    color: COLORS.primary,
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statusDesc: {
    color: COLORS.text,
    fontSize: SIZES.body,
    marginBottom: 16,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 16,
  },
  driverAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 255, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  driverInitial: {
    color: COLORS.primary,
    fontSize: SIZES.h3,
    fontWeight: 'bold',
  },
  driverName: {
    color: COLORS.text,
    fontSize: SIZES.body,
    fontWeight: 'bold',
  },
  driverVehicle: {
    color: COLORS.textSecondary,
    fontSize: SIZES.small,
  }
});
