import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { getBookImage } from '../data/extractedCatalog';
import { StockBadge } from './StockBadge';

export const FeaturedBanner = ({ book, onPress }) => {
  const { theme } = useTheme();

  if (!book) return null;

  return (
    <TouchableOpacity
      style={[
        styles.bannerCard,
        {
          backgroundColor: theme.cardBackground,
          borderColor: theme.cardBorder,
        },
      ]}
      onPress={() => onPress(book)}
      activeOpacity={0.9}
    >
      {/* 20% OFF Luxury Badge */}
      <View style={styles.sealContainer}>
        <Image
          source={getBookImage('luxury_gold_seal.png')}
          style={styles.sealImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.contentRow}>
        <Image
          source={getBookImage(book.imageKey)}
          style={styles.bookCover}
          resizeMode="cover"
        />

        <View style={styles.infoCol}>
          <View style={[styles.badge, { backgroundColor: theme.goldGlow }]}>
            <Text style={[styles.badgeText, { color: theme.goldAccent }]}>
              FEATURED SPOTLIGHT
            </Text>
          </View>

          <Text style={[styles.title, { color: theme.textPrimary }]} numberOfLines={2}>
            {book.title}
          </Text>

          <Text style={[styles.author, { color: theme.textSecondary }]}>
            by {book.author}
          </Text>

          <View style={styles.priceRow}>
            <Text style={[styles.price, { color: theme.primary }]}>
              LKR {(book.priceLKR * 0.8).toLocaleString()}
            </Text>
            <Text style={[styles.oldPrice, { color: theme.textMuted }]}>
              LKR {book.priceLKR.toLocaleString()}
            </Text>
          </View>

          <View style={styles.footerRow}>
            <StockBadge status={book.stockStatus} />
            <Text style={[styles.rating, { color: theme.goldAccent }]}>
              ★ {book.rating} ({book.reviewsCount})
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bannerCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 12,
    position: 'relative',
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  sealContainer: {
    position: 'absolute',
    top: 6,
    right: 8,
    zIndex: 10,
  },
  sealImage: {
    width: 48,
    height: 48,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookCover: {
    width: 90,
    height: 130,
    borderRadius: 8,
    marginRight: 14,
  },
  infoCol: {
    flex: 1,
    justifyContent: 'center',
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginBottom: 6,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  author: {
    fontSize: 12,
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 15,
    fontWeight: '800',
    marginRight: 8,
  },
  oldPrice: {
    fontSize: 12,
    textDecorationLine: 'line-through',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rating: {
    fontSize: 11,
    fontWeight: '600',
  },
});
