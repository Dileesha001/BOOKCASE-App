import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { generateQRDataURL, generateQRMatrix } from '../utils/qrGenerator';

export const QRCodeView = ({
  value,
  size = 200,
  darkColor = '#1B4D3E',
  lightColor = '#FFFFFF',
  logoSource,
}) => {
  const [dataUrl, setDataUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    if (!value) {
      setLoading(false);
      return;
    }

    setLoading(true);
    generateQRDataURL(value)
      .then((url) => {
        if (isMounted) {
          setDataUrl(url);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [value, darkColor, lightColor]);

  if (loading) {
    return (
      <View style={[styles.centerContainer, { width: size, height: size }]}>
        <ActivityIndicator size="large" color={darkColor} />
      </View>
    );
  }

  if (!dataUrl) {
    return (
      <View style={[styles.centerContainer, { width: size, height: size }]}>
        <Text style={{ fontSize: 12, color: '#888' }}>Unable to generate QR</Text>
      </View>
    );
  }

  return (
    <View style={[styles.qrWrapper, { width: size, height: size, backgroundColor: lightColor }]}>
      <Image
        source={{ uri: dataUrl }}
        style={{ width: size - 12, height: size - 12 }}
        resizeMode="contain"
      />
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
    padding: 6,
    position: 'relative',
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
