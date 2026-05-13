import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { COLORS, SIZES, globalStyles } from '../theme';
import { CartContext } from '../context/CartContext';
import { Minus, Plus, Trash2 } from 'lucide-react-native';

export default function CartScreen({ navigation }) {
  const { cartItems, removeFromCart, updateQuantity, totalAmount, totalItems } = useContext(CartContext);

  const renderItem = ({ item }) => (
    <View style={[globalStyles.glassPanel, styles.cartItem]}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>₹{item.price}/kg</Text>
      </View>
      
      <View style={styles.actionRow}>
        <View style={styles.quantityControl}>
          <TouchableOpacity 
            style={styles.iconBtn} 
            onPress={() => updateQuantity(item._id, item.quantity - 1)}
          >
            <Minus color={COLORS.text} size={16} />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity 
            style={styles.iconBtn} 
            onPress={() => updateQuantity(item._id, item.quantity + 1)}
          >
            <Plus color={COLORS.text} size={16} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
          style={styles.deleteBtn} 
          onPress={() => removeFromCart(item._id)}
        >
          <Trash2 color={COLORS.error} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={globalStyles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Your cart is empty.</Text>
            <TouchableOpacity 
              style={[styles.button, { marginTop: 20 }]} 
              onPress={() => navigation.navigate('ProductList')}
            >
              <Text style={styles.buttonText}>Start Shopping</Text>
            </TouchableOpacity>
          </View>
        }
      />

      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Total Items</Text>
            <Text style={styles.summaryValue}>{totalItems}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Total Amount</Text>
            <Text style={styles.totalPrice}>₹{totalAmount.toFixed(2)}</Text>
          </View>
          <TouchableOpacity 
            style={styles.checkoutBtn}
            onPress={() => navigation.navigate('Checkout')}
          >
            <Text style={styles.checkoutBtnText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  listContent: {
    padding: SIZES.padding,
    flexGrow: 1,
  },
  cartItem: {
    marginBottom: SIZES.padding,
    flexDirection: 'column',
  },
  itemInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  itemName: {
    color: COLORS.text,
    fontSize: SIZES.h3,
    fontWeight: 'bold',
  },
  itemPrice: {
    color: COLORS.primary,
    fontSize: SIZES.body,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: SIZES.radiusSm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  iconBtn: {
    padding: 10,
  },
  quantityText: {
    color: COLORS.text,
    fontSize: SIZES.body,
    paddingHorizontal: 12,
    fontWeight: 'bold',
  },
  deleteBtn: {
    padding: 10,
  },
  footer: {
    padding: SIZES.padding,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderColor: COLORS.border,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryText: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body,
  },
  summaryValue: {
    color: COLORS.text,
    fontSize: SIZES.body,
    fontWeight: 'bold',
  },
  totalPrice: {
    color: COLORS.primary,
    fontSize: SIZES.h2,
    fontWeight: 'bold',
  },
  checkoutBtn: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: SIZES.radiusSm,
    alignItems: 'center',
    marginTop: 16,
  },
  checkoutBtnText: {
    color: COLORS.background,
    fontSize: SIZES.h3,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: SIZES.h3,
  },
  button: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: SIZES.radiusSm,
  },
  buttonText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  }
});
