import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

const TABS = [
  {
    name: 'HomeTab',
    label: 'Sanctuary',
    icon: 'home',
    iconOutline: 'home-outline',
  },
  {
    name: 'CategoriesTab',
    label: 'Explore',
    icon: 'library',
    iconOutline: 'library-outline',
  },
  {
    name: 'CartTab',
    label: 'Cart',
    icon: 'cart',
    iconOutline: 'cart-outline',
  },
  {
    name: 'ProfileTab',
    label: 'Profile',
    icon: 'person',
    iconOutline: 'person-outline',
  },
];

function TabButton({ tab, isFocused, onPress, theme, badge }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isFocused) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1.15,
          useNativeDriver: true,
          tension: 120,
          friction: 6,
        }),
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 220,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 120,
          friction: 6,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 180,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [isFocused]);

  const activeColor = theme.tabBarActive;
  const inactiveColor = theme.tabBarInactive;
  const iconName = isFocused ? tab.icon : tab.iconOutline;

  const pillBg = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(0,0,0,0)', theme.goldGlow || 'rgba(212,160,23,0.15)'],
  });

  return (
    <TouchableOpacity
      style={styles.tabTouchable}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <Animated.View
        style={[
          styles.tabInner,
          { backgroundColor: pillBg },
        ]}
      >
        {/* Accent line on top when active */}
        {isFocused && (
          <View
            style={[
              styles.accentLine,
              { backgroundColor: activeColor },
            ]}
          />
        )}

        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <View style={styles.iconWrap}>
            <Ionicons
              name={iconName}
              size={22}
              color={isFocused ? activeColor : inactiveColor}
            />
            {/* Badge */}
            {badge > 0 && (
              <View
                style={[
                  styles.badge,
                  { backgroundColor: theme.primary },
                ]}
              >
                <Text style={[styles.badgeText, { color: theme.buttonText }]}>
                  {badge > 9 ? '9+' : badge}
                </Text>
              </View>
            )}
          </View>
        </Animated.View>

        <Text
          style={[
            styles.tabLabel,
            {
              color: isFocused ? activeColor : inactiveColor,
              fontWeight: isFocused ? '700' : '500',
            },
          ]}
        >
          {tab.label}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

export function CustomTabBar({ state, descriptors, navigation }) {
  const { theme } = useTheme();
  const { totalItems } = useCart();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.tabBarBg,
          borderTopColor: theme.cardBorder,
        },
      ]}
    >
      {/* Decorative top border gradient line */}
      <View
        style={[
          styles.topBorderLine,
          { backgroundColor: theme.tabBarActive, opacity: 0.35 },
        ]}
      />

      <View style={styles.tabsRow}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const tab = TABS.find((t) => t.name === route.name);
          if (!tab) return null;

          const badge = route.name === 'CartTab' ? totalItems : 0;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TabButton
              key={route.name}
              tab={tab}
              isFocused={isFocused}
              onPress={onPress}
              theme={theme}
              badge={badge}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // Part of layout flow — does NOT overlap content
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingBottom: Platform.OS === 'ios' ? 28 : 12,
    paddingTop: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 16,
  },
  topBorderLine: {
    height: 1.5,
    width: '100%',
  },
  tabsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingTop: 4,
  },
  tabTouchable: {
    flex: 1,
    alignItems: 'center',
  },
  tabInner: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 14,
    minWidth: 64,
    position: 'relative',
  },
  accentLine: {
    position: 'absolute',
    top: -5,
    width: 24,
    height: 3,
    borderRadius: 2,
  },
  iconWrap: {
    position: 'relative',
    marginBottom: 3,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -8,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '800',
  },
  tabLabel: {
    fontSize: 10,
    letterSpacing: 0.2,
  },
});
