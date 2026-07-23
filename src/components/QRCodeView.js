import React, { useMemo } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { generateQRMatrix } from '../utils/qrGenerator';

export const QRCodeView = ({
  value,
  size = 200,
  darkColor = '#1B4D3E',
  lightColor = '#FFFFFF',
  logoSource,
}) => {
  const matrix = useMemo(() => {
    return generateQRMatrix(value);
  }, [value]);

  if (!matrix || matrix.length === 0) {
    return (
      <View style={[styles.centerContainer, { width: size, height: size }]}>
        <Text style={{ fontSize: 12, color: '#888' }}>Unable to generate QR</Text>
      </View>
    );
  }

  const numCells = matrix.length;
  const cellSize = size / numCells;

  return (
    <View style={[styles.qrWrapper, { width: size, height: size, backgroundColor: lightColor }]}>
      <View style={{ width: size, height: size }}>
        {matrix.map((row, rIdx) => (
          <View key={`r-${rIdx}`} style={{ flexDirection: 'row', height: cellSize }}>
            {row.map((cell, cIdx) => (
              <View
                key={`c-${rIdx}-${cIdx}`}
                style={{
                  width: cellSize,
                  height: cellSize,
                  backgroundColor: cell ? darkColor : lightColor,
                }}
              />
            ))}
          </View>
        ))}
      </View>

      {logoSource && (
        <View style={styles.logoOverlay}>
          <Image source={logoSource} style={styles.logoImage} resizeMode="contain" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  qrWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    padding: 8,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoOverlay: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#D4AF37', // Gold border
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  logoImage: {
    width: 28,
    height: 28,
  },
});
