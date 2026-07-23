import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export const StockBadge = ({ status }) => {
  const { theme } = useTheme();
  const isInStock = status === 'In Stock';

  const dotColor = isInStock ? theme.stockInDot : theme.stockOutDot;
  const textColor = isInStock ? theme.stockInText : theme.stockOutText;

  return (
    <View style={styles.container}>
      <View style={[styles.dot, { backgroundColor: dotColor }]} />
      <Text style={[styles.text, { color: textColor }]}>
        {isInStock ? 'In Stock' : 'Out of Stock'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 5,
  },
  text: {
    fontSize: 11,
    fontWeight: '600',
  },
});
