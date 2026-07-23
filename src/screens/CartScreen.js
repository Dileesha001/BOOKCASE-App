import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { getBookImage } from '../data/extractedCatalog';

export const CartScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { cart, updateQuantity, removeFromCart, clearCart, subtotalLKR } = useCart();

  const shippingFee = cart.length > 0 ? 350 : 0;
  const grandTotal = subtotalLKR + shippingFee;

  const handleCheckout = () => {
    Alert.alert(
      'Order Submitted!',
      `Thank you for placing your order with BOOKCASE Sanctuary!\nTotal: LKR ${grandTotal.toLocaleString()}`,
      [
        {
          text: 'OK',
          onPress: () => {
            clearCart();
            navigation.navigate('Home');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.navHeader, { backgroundColor: theme.headerBg, borderBottomColor: theme.cardBorder }]}>
        <TouchableOpacity
          style={[styles.iconBtn, { backgroundColor: theme.surface }]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color={theme.textPrimary} />
        </TouchableOpacity>

        <Text style={[styles.navTitle, { color: theme.textPrimary }]}>
          Shopping Cart ({cart.length})
        </Text>

        {cart.length > 0 ? (
          <TouchableOpacity onPress={clearCart}>
            <Text style={[styles.clearText, { color: theme.stockOutText }]}>Clear</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 36 }} />
        )}
      </View>

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => {
          const itemPrice = item.finalPriceLKR || item.priceLKR;
          return (
            <View
              style={[
                styles.cartItemCard,
                { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder },
              ]}
            >
              <Image
                source={getBookImage(item.imageKey)}
                style={styles.coverImage}
                resizeMode="cover"
              />

              <View style={styles.itemDetails}>
                <Text style={[styles.itemTitle, { color: theme.textPrimary }]} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={[styles.itemAuthor, { color: theme.textSecondary }]}>
                  {item.author}
                </Text>

                <Text style={[styles.itemPrice, { color: theme.primary }]}>
                  LKR {itemPrice.toLocaleString()}
                </Text>

                <View style={styles.qtyRow}>
                  <TouchableOpacity
                    style={[styles.qtyBtn, { backgroundColor: theme.surface }]}
                    onPress={() => updateQuantity(item.id, -1)}
                  >
                    <Ionicons name="remove" size={14} color={theme.textPrimary} />
                  </TouchableOpacity>
                  <Text style={[styles.qtyText, { color: theme.textPrimary }]}>
                    {item.quantity}
                  </Text>
                  <TouchableOpacity
                    style={[styles.qtyBtn, { backgroundColor: theme.surface }]}
                    onPress={() => updateQuantity(item.id, 1)}
                  >
                    <Ionicons name="add" size={14} color={theme.textPrimary} />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => removeFromCart(item.id)}
              >
                <Ionicons name="trash-outline" size={20} color={theme.stockOutText} />
              </TouchableOpacity>
            </View>
          );
        }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="cart-outline" size={64} color={theme.textMuted} />
            <Text style={[styles.emptyTitle, { color: theme.textPrimary }]}>
              Your Cart is Empty
            </Text>
            <Text style={[styles.emptySub, { color: theme.textMuted }]}>
              Explore our curated library collections and add your favorite books.
            </Text>
            <TouchableOpacity
              style={[styles.browseBtn, { backgroundColor: theme.primary }]}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={[styles.browseBtnText, { color: theme.buttonText }]}>
                Browse Catalog
              </Text>
            </TouchableOpacity>
          </View>
        }
      />

      {/* Summary Footer */}
      {cart.length > 0 && (
        <View
          style={[
            styles.footerBox,
            { backgroundColor: theme.cardBackground, borderTopColor: theme.cardBorder },
          ]}
        >
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>Subtotal</Text>
            <Text style={[styles.summaryValue, { color: theme.textPrimary }]}>
              LKR {subtotalLKR.toLocaleString()}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
              Islandwide Delivery
            </Text>
            <Text style={[styles.summaryValue, { color: theme.textPrimary }]}>
              LKR {shippingFee.toLocaleString()}
            </Text>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.cardBorder }]} />

          <View style={styles.summaryRow}>
            <Text style={[styles.totalLabel, { color: theme.textPrimary }]}>Grand Total</Text>
            <Text style={[styles.totalValue, { color: theme.primary }]}>
              LKR {grandTotal.toLocaleString()}
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.checkoutBtn, { backgroundColor: theme.primary }]}
            onPress={handleCheckout}
          >
            <Text style={[styles.checkoutBtnText, { color: theme.buttonText }]}>
              Proceed to Checkout
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navHeader: {
    paddingTop: 45,
    paddingBottom: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  clearText: {
    fontSize: 13,
    fontWeight: '700',
  },
  listContainer: {
    padding: 16,
  },
  cartItemCard: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    padding: 10,
    marginBottom: 12,
    alignItems: 'center',
  },
  coverImage: {
    width: 60,
    height: 84,
    borderRadius: 6,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  itemAuthor: {
    fontSize: 12,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 6,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    fontSize: 13,
    fontWeight: '700',
    marginHorizontal: 10,
  },
  removeBtn: {
    padding: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    marginTop: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySub: {
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 18,
  },
  browseBtn: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
  },
  browseBtnText: {
    fontSize: 14,
    fontWeight: '700',
  },
  footerBox: {
    padding: 16,
    borderTopWidth: 1,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  summaryLabel: {
    fontSize: 13,
  },
  summaryValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '800',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '800',
  },
  checkoutBtn: {
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  checkoutBtnText: {
    fontSize: 15,
    fontWeight: '800',
  },
});
