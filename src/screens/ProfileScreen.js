import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { HeaderBar } from '../components/HeaderBar';
import { getBookImage } from '../data/extractedCatalog';
import { QRCodeModal } from '../components/QRCodeModal';

export const ProfileScreen = ({ navigation }) => {
  const { isDark, theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [showMemberQR, setShowMemberQR] = React.useState(false);

  if (!user) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <HeaderBar navigation={navigation} />
        <View style={styles.guestContainer}>
          <Image
            source={getBookImage('logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={[styles.guestTitle, { color: theme.textPrimary }]}>
            Literary Sanctuary Account
          </Text>
          <Text style={[styles.guestSub, { color: theme.textSecondary }]}>
            Sign in to track orders, save favorite books, and enjoy personalized literary recommendations.
          </Text>

          <TouchableOpacity
            style={[styles.primaryBtn, { backgroundColor: theme.primary }]}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={[styles.primaryBtnText, { color: theme.buttonText }]}>
              Log In to Sanctuary
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.secondaryBtn, { borderColor: theme.cardBorder }]}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={[styles.secondaryBtnText, { color: theme.textPrimary }]}>
              Create New Account
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <HeaderBar navigation={navigation} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* User Banner Card */}
        <View
          style={[
            styles.profileCard,
            { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder },
          ]}
        >
          <View style={[styles.avatarBox, { backgroundColor: theme.goldGlow }]}>
            <Text style={[styles.avatarText, { color: theme.goldAccent }]}>
              {user.username ? user.username[0].toUpperCase() : 'U'}
            </Text>
          </View>

          <Text style={[styles.userName, { color: theme.textPrimary }]}>
            {user.fullName || user.username}
          </Text>

          <Text style={[styles.userEmail, { color: theme.textSecondary }]}>
            {user.email}
          </Text>

          <View style={[styles.roleBadge, { backgroundColor: theme.surfaceElevated }]}>
            <Text style={[styles.roleText, { color: theme.goldAccent }]}>
              👑 SANCTUARY MEMBER ({user.role ? user.role.toUpperCase() : 'CUSTOMER'})
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.qrPassBtn, { backgroundColor: theme.primary }]}
            onPress={() => setShowMemberQR(true)}
          >
            <Ionicons name="qr-code" size={18} color={theme.buttonText} />
            <Text style={[styles.qrPassBtnText, { color: theme.buttonText }]}>
              Digital Member Pass & QR
            </Text>
          </TouchableOpacity>
        </View>

        {/* Options */}
        <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
          Preferences & Settings
        </Text>

        <TouchableOpacity
          style={[
            styles.optionRow,
            { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder },
          ]}
          onPress={() => setShowMemberQR(true)}
        >
          <View style={styles.optionLeft}>
            <Ionicons name="qr-code-outline" size={20} color={theme.goldAccent} />
            <Text style={[styles.optionText, { color: theme.textPrimary }]}>
              My Digital Member QR Pass
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.optionRow,
            { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder },
          ]}
          onPress={toggleTheme}
        >
          <View style={styles.optionLeft}>
            <Ionicons name={isDark ? 'moon' : 'sunny'} size={20} color={theme.goldAccent} />
            <Text style={[styles.optionText, { color: theme.textPrimary }]}>
              {isDark ? 'Obsidian Gold (Dark Theme)' : 'Emerald Sage (Light Theme)'}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.optionRow,
            { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder },
          ]}
          onPress={() => navigation.navigate('Cart')}
        >
          <View style={styles.optionLeft}>
            <Ionicons name="bag-check-outline" size={20} color={theme.primary} />
            <Text style={[styles.optionText, { color: theme.textPrimary }]}>
              My Active Orders & History
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.logoutBtn,
            { backgroundColor: theme.surface, borderColor: theme.stockOutDot },
          ]}
          onPress={logout}
        >
          <Ionicons name="log-out-outline" size={20} color={theme.stockOutText} />
          <Text style={[styles.logoutText, { color: theme.stockOutText }]}>
            Sign Out of Account
          </Text>
        </TouchableOpacity>

        <QRCodeModal
          visible={showMemberQR}
          onClose={() => setShowMemberQR(false)}
          title={`${user.fullName || user.username}'s Member Pass`}
          subtitle="Scan for store discounts, library loans, and access"
          qrValue={`SANCTUARY-MEMBER-${user.id || user.username.toUpperCase()}-2026`}
          badgeText="GOLD MEMBER DIGITAL ID"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  guestContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  logo: {
    width: 70,
    height: 70,
    marginBottom: 16,
  },
  guestTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 8,
  },
  guestSub: {
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  primaryBtn: {
    width: '100%',
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  primaryBtnText: {
    fontSize: 15,
    fontWeight: '800',
  },
  secondaryBtn: {
    width: '100%',
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: {
    fontSize: 14,
    fontWeight: '700',
  },
  scrollContent: {
    padding: 16,
  },
  profileCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarBox: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 26,
    fontWeight: '800',
  },
  userName: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 13,
    marginBottom: 12,
  },
  roleBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  roleText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  qrPassBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 14,
    gap: 8,
  },
  qrPassBtnText: {
    fontSize: 13,
    fontWeight: '800',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 10,
    marginTop: 4,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 20,
    gap: 8,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '700',
  },
});
