import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { CartProvider } from './src/context/CartContext';
import { AuthProvider } from './src/context/AuthContext';

import { HomeScreen } from './src/screens/HomeScreen';
import { BookDetailScreen } from './src/screens/BookDetailScreen';
import { CategoriesScreen } from './src/screens/CategoriesScreen';
import { CartScreen } from './src/screens/CartScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { CustomTabBar } from './src/components/CustomTabBar';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      // Render our fully custom tab bar — handles its own keyboard/disappear fix
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        // Prevents keyboard from hiding the tab bar on Android
        tabBarHideOnKeyboard: false,
      }}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} />
      <Tab.Screen name="CategoriesTab" component={CategoriesScreen} />
      <Tab.Screen name="CartTab" component={CartScreen} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function MainApp() {
  const { isDark, theme } = useTheme();

  return (
    <View style={[styles.rootContainer, { backgroundColor: theme.background }]}>
      <NavigationContainer>
        <StatusBar style={isDark ? 'light' : 'dark'} backgroundColor={theme.background} />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: theme.background },
          }}
        >
          <Stack.Screen name="MainTabs" component={TabNavigator} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="BookDetail" component={BookDetailScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider style={styles.providerContainer}>
      <ThemeProvider>
        <CartProvider>
          <AuthProvider>
            <MainApp />
          </AuthProvider>
        </CartProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  providerContainer: {
    flex: 1,
    height: Platform.OS === 'web' ? '100vh' : '100%',
  },
  rootContainer: {
    flex: 1,
  },
});
