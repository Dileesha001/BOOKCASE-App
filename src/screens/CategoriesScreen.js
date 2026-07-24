import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Animated,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { CATEGORIES, getBookImage } from '../data/extractedCatalog';
import { fetchInventory } from '../services/api';
import { HeaderBar } from '../components/HeaderBar';
import { StockBadge } from '../components/StockBadge';

// Map category IDs to Ionicons names
const CATEGORY_ICONS = {
  all: 'apps-outline',
  Trending: 'flame-outline',
  Bestsellers: 'trophy-outline',
  Education: 'school-outline',
  Novels: 'book-outline',
  Translations: 'language-outline',
  'Short Stories': 'document-text-outline',
  'Sci-Fi': 'rocket-outline',
  Fiction: 'compass-outline',
  Poetry: 'heart-outline',
};

// Horizontal category pill
function CategoryPill({ cat, isActive, onPress, theme }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.93, duration: 80, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start();
    onPress(cat.id);
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={[
          styles.pill,
          {
            backgroundColor: isActive ? theme.primary : theme.surface,
            borderColor: isActive ? theme.primary : theme.cardBorder,
          },
        ]}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <Ionicons
          name={CATEGORY_ICONS[cat.id] || 'bookmark-outline'}
          size={14}
          color={isActive ? theme.buttonText : theme.textSecondary}
          style={{ marginRight: 5 }}
        />
        <Text
          style={[
            styles.pillText,
            { color: isActive ? theme.buttonText : theme.textSecondary, fontWeight: isActive ? '700' : '500' },
          ]}
        >
          {cat.name}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

// Horizontal list book card used in the Explore grid
function ExploreBookCard({ book, onPress, theme }) {
  const { addToCart } = useCart();
  const finalPrice = book.discountPercent > 0
    ? Math.round(book.priceLKR * (1 - book.discountPercent / 100))
    : book.priceLKR;

  return (
    <TouchableOpacity
      style={[styles.bookCard, { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder }]}
      onPress={() => onPress(book)}
      activeOpacity={0.88}
    >
      {/* Cover Image */}
      <View style={[styles.coverWrap, { backgroundColor: theme.surface }]}>
        <Image
          source={getBookImage(book.imageKey)}
          style={styles.coverImg}
          resizeMode="cover"
        />
        {book.discountPercent > 0 && (
          <View style={[styles.discountBadge, { backgroundColor: theme.primary }]}>
            <Text style={[styles.discountText, { color: theme.buttonText }]}>
              -{book.discountPercent}%
            </Text>
          </View>
        )}
        {book.stockStatus === 'Out of Stock' && (
          <View style={styles.outOverlay}>
            <Text style={styles.outText}>OUT OF STOCK</Text>
          </View>
        )}
      </View>

      {/* Info */}
      <View style={styles.cardInfo}>
        <Text style={[styles.cardCategory, { color: theme.goldAccent }]} numberOfLines={1}>
          {book.category.toUpperCase()}
        </Text>
        <Text style={[styles.cardTitle, { color: theme.textPrimary }]} numberOfLines={2}>
          {book.title}
        </Text>
        <Text style={[styles.cardAuthor, { color: theme.textSecondary }]} numberOfLines={1}>
          {book.author}
        </Text>

        <View style={styles.cardFooter}>
          <View>
            <Text style={[styles.cardPrice, { color: theme.primary }]}>
              LKR {finalPrice.toLocaleString()}
            </Text>
            {book.discountPercent > 0 && (
              <Text style={[styles.cardOldPrice, { color: theme.textMuted }]}>
                {book.priceLKR.toLocaleString()}
              </Text>
            )}
          </View>
          <TouchableOpacity
            style={[
              styles.cartBtn,
              {
                backgroundColor: book.stockStatus === 'In Stock' ? theme.primary : theme.surface,
                opacity: book.stockStatus === 'In Stock' ? 1 : 0.45,
              },
            ]}
            onPress={() => addToCart(book, 1)}
            disabled={book.stockStatus !== 'In Stock'}
          >
            <Ionicons name="cart" size={14} color={theme.buttonText} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export const CategoriesScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [selectedCat, setSelectedCat] = useState('all');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInventory().then((data) => {
      setBooks(data);
      setLoading(false);
    });
  }, []);

  const displayedBooks =
    selectedCat === 'all'
      ? books
      : books.filter((b) => b.category === selectedCat);

  const selectedCatName =
    CATEGORIES.find((c) => c.id === selectedCat)?.name || 'All Books';

  return (
    <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: theme.background }]}>
      <HeaderBar navigation={navigation} />

      {/* Category Pills — horizontal scroll */}
      <View style={[styles.pillsWrapper, { borderBottomColor: theme.cardBorder }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.pillsRow}
        >
          {CATEGORIES.map((cat) => (
            <CategoryPill
              key={cat.id}
              cat={cat}
              isActive={selectedCat === cat.id}
              onPress={setSelectedCat}
              theme={theme}
            />
          ))}
        </ScrollView>
      </View>

      {/* Section header */}
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleRow}>
          <Ionicons
            name={CATEGORY_ICONS[selectedCat] || 'apps-outline'}
            size={18}
            color={theme.primary}
            style={{ marginRight: 6 }}
          />
          <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
            {selectedCatName}
          </Text>
        </View>
        <View style={[styles.countPill, { backgroundColor: theme.goldGlow }]}>
          <Text style={[styles.countText, { color: theme.goldAccent }]}>
            {displayedBooks.length} books
          </Text>
        </View>
      </View>

      {/* Book grid */}
      <FlatList
        data={displayedBooks}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.gridRow}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ExploreBookCard
            book={item}
            onPress={(b) => navigation.navigate('BookDetail', { book: b })}
            theme={theme}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Ionicons name="library-outline" size={52} color={theme.textMuted} />
            <Text style={[styles.emptyTitle, { color: theme.textPrimary }]}>
              No Books Found
            </Text>
            <Text style={[styles.emptySubtitle, { color: theme.textMuted }]}>
              This collection is coming soon.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // ─── Category Pills ───────────────────────────────────────
  pillsWrapper: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 10,
  },
  pillsRow: {
    paddingHorizontal: 14,
    paddingTop: 12,
    gap: 8,
    flexDirection: 'row',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },
  pillText: {
    fontSize: 12,
  },
  // ─── Section Header ───────────────────────────────────────
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 8,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  countPill: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  countText: {
    fontSize: 11,
    fontWeight: '700',
  },
  // ─── Book Grid ────────────────────────────────────────────
  grid: {
    paddingHorizontal: 10,
    paddingBottom: 16,
  },
  gridRow: {
    justifyContent: 'space-between',
  },
  bookCard: {
    width: '48.5%',
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  coverWrap: {
    height: 150,
    width: '100%',
    position: 'relative',
  },
  coverImg: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 7,
    left: 7,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  discountText: {
    fontSize: 10,
    fontWeight: '800',
  },
  outOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.52)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  cardInfo: {
    padding: 10,
  },
  cardCategory: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.6,
    marginBottom: 3,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 17,
    marginBottom: 2,
  },
  cardAuthor: {
    fontSize: 11,
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  cardPrice: {
    fontSize: 13,
    fontWeight: '800',
  },
  cardOldPrice: {
    fontSize: 10,
    textDecorationLine: 'line-through',
    marginTop: 1,
  },
  cartBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // ─── Empty State ──────────────────────────────────────────
  emptyBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingHorizontal: 30,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginTop: 14,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 19,
  },
});
