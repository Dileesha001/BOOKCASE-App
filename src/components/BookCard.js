import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { getBookImage } from '../data/extractedCatalog';
import { StockBadge } from './StockBadge';

export const BookCard = ({ book, onPress }) => {
  const { theme } = useTheme();
  const { addToCart } = useCart();

  const finalPrice = book.discountPercent > 0
    ? Math.round(book.priceLKR * (1 - book.discountPercent / 100))
    : book.priceLKR;

  const handleAddToCart = () => {
    addToCart(book, 1);
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: theme.cardBackground,
          borderColor: theme.cardBorder,
        },
      ]}
      onPress={() => onPress(book)}
      activeOpacity={0.85}
    >
      <View style={styles.imageContainer}>
        <Image
          source={getBookImage(book.imageKey)}
          style={styles.coverImage}
          resizeMode="cover"
        />

        {book.discountPercent > 0 && (
          <View style={[styles.discountTag, { backgroundColor: theme.primary }]}>
            <Text style={[styles.discountText, { color: theme.buttonText }]}>
              -{book.discountPercent}%
            </Text>
          </View>
        )}
      </View>

      <View style={styles.cardBody}>
        <Text style={[styles.categoryTag, { color: theme.goldAccent }]}>
          {book.category.toUpperCase()}
        </Text>

        <Text style={[styles.title, { color: theme.textPrimary }]} numberOfLines={1}>
          {book.title}
        </Text>

        <Text style={[styles.author, { color: theme.textSecondary }]} numberOfLines={1}>
          {book.author}
        </Text>

        <View style={styles.priceRow}>
          <Text style={[styles.price, { color: theme.primary }]}>
            LKR {finalPrice.toLocaleString()}
          </Text>
          {book.discountPercent > 0 && (
            <Text style={[styles.oldPrice, { color: theme.textMuted }]}>
              {book.priceLKR}
            </Text>
          )}
        </View>

        <View style={styles.footerRow}>
          <StockBadge status={book.stockStatus} />

          <TouchableOpacity
            style={[
              styles.cartButton,
              {
                backgroundColor: book.stockStatus === 'In Stock' ? theme.surfaceElevated : theme.surface,
                borderColor: theme.cardBorder,
              },
            ]}
            onPress={handleAddToCart}
            disabled={book.stockStatus === 'Out of Stock'}
          >
            <Ionicons
              name="cart"
              size={14}
              color={book.stockStatus === 'In Stock' ? theme.primary : theme.textMuted}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 6,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    height: 160,
    width: '100%',
    backgroundColor: '#0a140d',
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  discountTag: {
    position: 'absolute',
    top: 6,
    left: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    fontSize: 10,
    fontWeight: '800',
  },
  cardBody: {
    padding: 10,
  },
  categoryTag: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
  },
  author: {
    fontSize: 11,
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 6,
  },
  price: {
    fontSize: 13,
    fontWeight: '800',
    marginRight: 6,
  },
  oldPrice: {
    fontSize: 10,
    textDecorationLine: 'line-through',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  cartButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
