import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { CATEGORIES } from '../data/extractedCatalog';
import { fetchInventory } from '../services/api';
import { HeaderBar } from '../components/HeaderBar';
import { BookCard } from '../components/BookCard';

export const CategoriesScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [selectedCat, setSelectedCat] = useState('Trending');
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchInventory().then(setBooks);
  }, []);

  const categoryBooks = books.filter((b) => b.category === selectedCat);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <HeaderBar navigation={navigation} />

      <View style={styles.contentRow}>
        {/* Left Side Category Menu */}
        <ScrollView
          style={[styles.leftNav, { backgroundColor: theme.surface, borderRightColor: theme.cardBorder }]}
          showsVerticalScrollIndicator={false}
        >
          {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => {
            const active = selectedCat === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.navItem,
                  {
                    backgroundColor: active ? theme.cardBackground : 'transparent',
                    borderLeftColor: active ? theme.primary : 'transparent',
                  },
                ]}
                onPress={() => setSelectedCat(cat.id)}
              >
                <Text
                  style={[
                    styles.navText,
                    {
                      color: active ? theme.primary : theme.textSecondary,
                      fontWeight: active ? '700' : '500',
                    },
                  ]}
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Right Side Book Listing */}
        <View style={styles.rightList}>
          <View style={styles.headerTitleRow}>
            <Text style={[styles.categoryTitle, { color: theme.textPrimary }]}>
              {selectedCat}
            </Text>
            <Text style={[styles.countText, { color: theme.textMuted }]}>
              {categoryBooks.length} items
            </Text>
          </View>

          <FlatList
            data={categoryBooks}
            keyExtractor={(item) => item.id}
            numColumns={1}
            renderItem={({ item }) => (
              <BookCard
                book={item}
                onPress={(b) => navigation.navigate('BookDetail', { book: b })}
              />
            )}
            ListEmptyComponent={
              <View style={styles.emptyBox}>
                <Ionicons name="folder-open-outline" size={40} color={theme.textMuted} />
                <Text style={[styles.emptyText, { color: theme.textMuted }]}>
                  No books in this category yet.
                </Text>
              </View>
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentRow: {
    flex: 1,
    flexDirection: 'row',
  },
  leftNav: {
    width: 120,
    borderRightWidth: 1,
  },
  navItem: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderLeftWidth: 3,
  },
  navText: {
    fontSize: 12,
  },
  rightList: {
    flex: 1,
    padding: 10,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 6,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  countText: {
    fontSize: 12,
  },
  emptyBox: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 13,
  },
});
