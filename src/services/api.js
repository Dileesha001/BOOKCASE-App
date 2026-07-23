/**
 * BOOKCASE App - REST API Service Client (Hybrid Mode)
 * Fetches live data from backend MongoDB server or falls back to local extracted catalog.
 */

import { INITIAL_BOOKS } from '../data/extractedCatalog';

// Standard Local Machine IP for Mobile Emulators & Devices
const BASE_URL = 'http://10.0.2.2:5000/api'; // Android Emulator alias for localhost
const BASE_URL_ALT = 'http://localhost:5000/api';

export const fetchInventory = async () => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const response = await fetch(`${BASE_URL}/inventory`, {
      signal: controller.signal,
    }).catch(() => fetch(`${BASE_URL_ALT}/inventory`));

    clearTimeout(timeoutId);

    if (response && response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        console.log('📡 Connected to BOOKCASE MongoDB backend!');
        return data;
      }
    }
  } catch (error) {
    console.log('⚡ Backend API offline. Operating in Local Hybrid Mode.');
  }

  // Fallback to local catalog
  return INITIAL_BOOKS;
};

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      return { success: true, user: data.user, token: data.token };
    }
    return { success: false, message: data.message || 'Invalid credentials' };
  } catch (error) {
    // Offline simulation mode fallback
    if (email && password.length >= 6) {
      return {
        success: true,
        user: {
          id: 'user_local_1',
          username: email.split('@')[0],
          email: email,
          fullName: 'Book Sanctuary Collector',
          role: 'customer',
        },
        token: 'mock_jwt_token_bookcase',
      };
    }
    return { success: false, message: 'Password must be at least 6 characters' };
  }
};

export const registerUser = async (username, email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      return { success: true, user: data.user, token: data.token };
    }
    return { success: false, message: data.message || 'Registration failed' };
  } catch (error) {
    // Local simulation fallback
    return {
      success: true,
      user: {
        id: 'user_local_' + Date.now(),
        username: username,
        email: email,
        fullName: username,
        role: 'customer',
      },
      token: 'mock_jwt_token_bookcase',
    };
  }
};
