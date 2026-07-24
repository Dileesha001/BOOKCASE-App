import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { getBookImage } from '../data/extractedCatalog';
import { StockBadge } from '../components/StockBadge';
import { QRCodeModal } from '../components/QRCodeModal';

export const BookDetailScreen = ({ route, navigation }) => {
  const { book } = route.params;
  const { theme } = useTheme();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showQR, setShowQR] = useState(false);

  const finalPrice = book.discountPercent > 0
    ? Math.round(book.priceLKR * (1 - book.discountPercent / 100))
    : book.priceLKR;

  const handleAddToCart = () => {
    const success = addToCart(book, quantity);
    if (success) {
      const msg = `Added ${quantity} item(s) to Cart!`;
      if (Platform.OS === 'android') {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
      } else {
        Alert.alert('Cart Updated', msg);
      }
    }
  };

  const handleBuyNow = () => {
    addToCart(book, quantity);
    navigation.navigate('Cart');
  };

  return (
    <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Top Header Navigation */}
      <View style={[styles.navHeader, { backgroundColor: theme.headerBg }]}>
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: theme.surface }]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color={theme.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.textPrimary }]} numberOfLines={1}>
          {book.title}
        </Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: theme.surface }]}
            onPress={() => setShowQR(true)}
          >
            <Ionicons name="qr-code-outline" size={18} color={theme.goldAccent} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: theme.surface }]}
            onPress={() => navigation.navigate('Cart')}
          >
            <Ionicons name="cart-outline" size={20} color={theme.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Book Cover Banner */}
        <View style={[styles.imageWrapper, { backgroundColor: theme.cardBackground }]}>
          <Image
            source={getBookImage(book.imageKey)}
            style={styles.coverImage}
            resizeMode="contain"
          />
          {book.discountPercent > 0 && (
            <View style={[styles.discountBadge, { backgroundColor: theme.primary }]}>
              <Text style={[styles.discountText, { color: theme.buttonText }]}>
                {book.discountPercent}% OFF
              </Text>
            </View>
          )}
        </View>

        {/* Content Section */}
        <View style={styles.bodySection}>
          <View style={styles.categoryRow}>
            <View style={[styles.categoryTag, { backgroundColor: theme.goldGlow }]}>
              <Text style={[styles.categoryTagText, { color: theme.goldAccent }]}>
                {book.category.toUpperCase()}
              </Text>
            </View>
            <StockBadge status={book.stockStatus} />
          </View>

          <Text style={[styles.title, { color: theme.textPrimary }]}>
            {book.title}
          </Text>

          <Text style={[styles.author, { color: theme.textSecondary }]}>
            Written by {book.author}
          </Text>

          {/* Rating */}
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={16} color={theme.goldAccent} />
            <Text style={[styles.ratingText, { color: theme.textPrimary }]}>
              {book.rating}
            </Text>
            <Text style={[styles.reviewsCount, { color: theme.textMuted }]}>
              ({book.reviewsCount} customer reviews)
            </Text>
          </View>

          {/* Pricing Box */}
          <View
            style={[
              styles.priceBox,
              { backgroundColor: theme.surface, borderColor: theme.cardBorder },
            ]}
          >
            <View>
              <Text style={[styles.priceLabel, { color: theme.textMuted }]}>Price</Text>
              <View style={styles.priceFlex}>
                <Text style={[styles.finalPrice, { color: theme.primary }]}>
                  LKR {finalPrice.toLocaleString()}
                </Text>
                {book.discountPercent > 0 && (
                  <Text style={[styles.originalPrice, { color: theme.textMuted }]}>
                    LKR {book.priceLKR.toLocaleString()}
                  </Text>
                )}
              </View>
            </View>

            {/* Quantity Selector */}
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={[styles.qtyBtn, { backgroundColor: theme.cardBackground }]}
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Ionicons name="remove" size={16} color={theme.textPrimary} />
              </TouchableOpacity>
              <Text style={[styles.qtyText, { color: theme.textPrimary }]}>
                {quantity}
              </Text>
              <TouchableOpacity
                style={[styles.qtyBtn, { backgroundColor: theme.cardBackground }]}
                onPress={() => setQuantity(quantity + 1)}
              >
                <Ionicons name="add" size={16} color={theme.textPrimary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Synopsis */}
          <Text style={[styles.sectionHeading, { color: theme.textPrimary }]}>
            Synopsis & Description
          </Text>
          <Text style={[styles.description, { color: theme.textSecondary }]}>
            {book.description ||
              'A landmark publication curated under the luxury BOOKCASE Sanctuary collection. Crafted for discerning readers seeking depth, literary excellence, and artistic mastery.'}
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Sticky Action Bar */}
      <View
        style={[
          styles.bottomBar,
          { backgroundColor: theme.cardBackground, borderTopColor: theme.cardBorder },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.cartBtn,
            {
              backgroundColor: theme.surface,
              borderColor: theme.cardBorder,
            },
          ]}
          onPress={handleAddToCart}
          disabled={book.stockStatus === 'Out of Stock'}
        >
          <Ionicons name="cart-outline" size={20} color={theme.primary} />
          <Text style={[styles.cartBtnText, { color: theme.textPrimary }]}>
            Add to Cart
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.buyBtn,
            {
              backgroundColor: book.stockStatus === 'In Stock' ? theme.primary : theme.surface,
            },
          ]}
          onPress={handleBuyNow}
          disabled={book.stockStatus === 'Out of Stock'}
        >
          <Text
            style={[
              styles.buyBtnText,
              {
                color: book.stockStatus === 'In Stock' ? theme.buttonText : theme.textMuted,
              },
            ]}
          >
            {book.stockStatus === 'In Stock' ? 'Buy Now' : 'Sold Out'}
          </Text>
        </TouchableOpacity>
      </View>

      <QRCodeModal
        visible={showQR}
        onClose={() => setShowQR(false)}
        title="Book Digital QR Pass"
        subtitle="Scan at self-checkout, reserve kiosk, or library counter"
        qrValue={`BOOKCASE-ISBN-${book.id || '978-01'}`}
        badgeText="SANCTUARY LITERARY CATALOG PASS"
        bookTitle={book.title}
        bookAuthor={`Author: ${book.author}`}
      />
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
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  imageWrapper: {
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    position: 'relative',
  },
  coverImage: {
    height: '100%',
    width: 180,
    borderRadius: 10,
  },
  discountBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  discountText: {
    fontSize: 11,
    fontWeight: '800',
  },
  bodySection: {
    padding: 20,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  categoryTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryTagText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    marginBottom: 10,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 4,
    marginRight: 6,
  },
  reviewsCount: {
    fontSize: 12,
  },
  priceBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
  },
  priceLabel: {
    fontSize: 11,
    marginBottom: 2,
  },
  priceFlex: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  finalPrice: {
    fontSize: 20,
    fontWeight: '800',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 13,
    textDecorationLine: 'line-through',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    padding: 2,
  },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    fontSize: 15,
    fontWeight: '700',
    marginHorizontal: 12,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    gap: 12,
  },
  cartBtn: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  cartBtnText: {
    fontSize: 14,
    fontWeight: '700',
  },
  buyBtn: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyBtnText: {
    fontSize: 14,
    fontWeight: '800',
  },
});
