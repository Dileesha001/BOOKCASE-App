import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export const CategoryChip = ({ category, isSelected, onSelect }) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.chip,
        {
          backgroundColor: isSelected ? theme.primary : theme.surface,
          borderColor: isSelected ? theme.primary : theme.cardBorder,
        },
      ]}
      onPress={() => onSelect(category.id)}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.chipText,
          {
            color: isSelected ? theme.buttonText : theme.textPrimary,
            fontWeight: isSelected ? '700' : '500',
          },
        ]}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipText: {
    fontSize: 12,
  },
});
