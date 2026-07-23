import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  Alert,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { QRCodeView } from './QRCodeView';
import { getBookImage } from '../data/extractedCatalog';

export const QRCodeModal = ({
  visible,
  onClose,
  title = 'Sanctuary Digital Pass',
  subtitle = 'Scan at store counter or self-checkout terminal',
  qrValue = 'SANCTUARY-PASS-891024',
  badgeText = 'OFFICIAL MEMBER PASS',
  bookTitle,
  bookAuthor,
  onScanResult,
}) => {
  const { theme, isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('display'); // 'display' | 'scan'
  const [scannedCode, setScannedCode] = useState('');
  const [simulatedResult, setSimulatedResult] = useState(null);

  const handleCopyCode = () => {
    Alert.alert('Code Copied!', `QR Code value "${qrValue}" has been copied to your clipboard.`);
  };

  const handleSimulateScan = (codeToScan) => {
    const code = codeToScan || scannedCode || 'BOOK-SANCTUARY-9780747532699';
    setSimulatedResult(`Successfully scanned: ${code}`);
    if (onScanResult) {
      onScanResult(code);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.modalCard,
                { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder },
              ]}
            >
              {/* Top Header */}
              <View style={styles.header}>
                <View style={styles.titleBox}>
                  <Ionicons name="qr-code-outline" size={24} color={theme.goldAccent} />
                  <Text style={[styles.modalTitle, { color: theme.textPrimary }]}>
                    {title}
                  </Text>
                </View>
                <TouchableOpacity
                  style={[styles.closeBtn, { backgroundColor: theme.surface }]}
                  onPress={onClose}
                >
                  <Ionicons name="close" size={20} color={theme.textPrimary} />
                </TouchableOpacity>
              </View>

              {/* Mode Tabs */}
              <View style={[styles.tabBar, { backgroundColor: theme.surfaceElevated }]}>
                <TouchableOpacity
                  style={[
                    styles.tabItem,
                    activeTab === 'display' && [
                      styles.activeTabItem,
                      { backgroundColor: theme.primary },
                    ],
                  ]}
                  onPress={() => {
                    setActiveTab('display');
                    setSimulatedResult(null);
                  }}
                >
                  <Ionicons
                    name="qr-code"
                    size={16}
                    color={activeTab === 'display' ? theme.buttonText : theme.textSecondary}
                  />
                  <Text
                    style={[
                      styles.tabText,
                      {
                        color:
                          activeTab === 'display' ? theme.buttonText : theme.textSecondary,
                      },
                    ]}
                  >
                    View Pass
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.tabItem,
                    activeTab === 'scan' && [
                      styles.activeTabItem,
                      { backgroundColor: theme.primary },
                    ],
                  ]}
                  onPress={() => {
                    setActiveTab('scan');
                    setSimulatedResult(null);
                  }}
                >
                  <Ionicons
                    name="scan-outline"
                    size={16}
                    color={activeTab === 'scan' ? theme.buttonText : theme.textSecondary}
                  />
                  <Text
                    style={[
                      styles.tabText,
                      {
                        color:
                          activeTab === 'scan' ? theme.buttonText : theme.textSecondary,
                      },
                    ]}
                  >
                    Scan Scanner
                  </Text>
                </TouchableOpacity>
              </View>

              <ScrollView contentContainerStyle={styles.scrollBody}>
                {activeTab === 'display' ? (
                  <View style={styles.displayContent}>
                    {badgeText ? (
                      <View
                        style={[styles.badge, { backgroundColor: theme.goldGlow }]}
                      >
                        <Ionicons name="shield-checkmark" size={14} color={theme.goldAccent} />
                        <Text style={[styles.badgeText, { color: theme.goldAccent }]}>
                          {badgeText}
                        </Text>
                      </View>
                    ) : null}

                    {bookTitle ? (
                      <View style={styles.bookInfoBox}>
                        <Text style={[styles.bookTitle, { color: theme.textPrimary }]}>
                          {bookTitle}
                        </Text>
                        {bookAuthor ? (
                          <Text style={[styles.bookAuthor, { color: theme.textSecondary }]}>
                            {bookAuthor}
                          </Text>
                        ) : null}
                      </View>
                    ) : null}

                    <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                      {subtitle}
                    </Text>

                    {/* QR Code Container */}
                    <View style={styles.qrContainer}>
                      <QRCodeView
                        value={qrValue}
                        size={210}
                        darkColor={theme.primary}
                        lightColor="#FFFFFF"
                        logoSource={getBookImage('logo.png')}
                      />
                    </View>

                    {/* QR Value Code Badge */}
                    <TouchableOpacity
                      style={[
                        styles.codeBox,
                        { backgroundColor: theme.surface, borderColor: theme.cardBorder },
                      ]}
                      onPress={handleCopyCode}
                    >
                      <Text style={[styles.codeText, { color: theme.primary }]}>
                        {qrValue}
                      </Text>
                      <Ionicons name="copy-outline" size={16} color={theme.textMuted} />
                    </TouchableOpacity>

                    <Text style={[styles.hintText, { color: theme.textMuted }]}>
                      Tip: Keep brightness high when scanning at kiosk or counter.
                    </Text>

                    <TouchableOpacity
                      style={[styles.actionBtn, { backgroundColor: theme.primary }]}
                      onPress={handleCopyCode}
                    >
                      <Ionicons name="share-social-outline" size={18} color={theme.buttonText} />
                      <Text style={[styles.actionBtnText, { color: theme.buttonText }]}>
                        Copy Pass Code
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.scanContent}>
                    {/* Camera Scanner Mock View */}
                    <View style={styles.scannerFrame}>
                      <View style={styles.scannerOverlay}>
                        <Ionicons name="scan" size={120} color={theme.goldAccent} />
                        <Text style={styles.scannerNotice}>
                          Position QR code within frame
                        </Text>
                      </View>
                    </View>

                    <Text style={[styles.scanInstruction, { color: theme.textSecondary }]}>
                      Scan a Book QR code, Member ID badge, or Order Receipt to view details instantly.
                    </Text>

                    <View style={styles.quickScanRow}>
                      <TouchableOpacity
                        style={[
                          styles.presetChip,
                          { backgroundColor: theme.surface, borderColor: theme.cardBorder },
                        ]}
                        onPress={() => handleSimulateScan('ISBN-9780747532699')}
                      >
                        <Ionicons name="book-outline" size={14} color={theme.primary} />
                        <Text style={[styles.presetText, { color: theme.textPrimary }]}>
                          Sample Book QR
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.presetChip,
                          { backgroundColor: theme.surface, borderColor: theme.cardBorder },
                        ]}
                        onPress={() => handleSimulateScan('SANCTUARY-VIP-99412')}
                      >
                        <Ionicons name="card-outline" size={14} color={theme.goldAccent} />
                        <Text style={[styles.presetText, { color: theme.textPrimary }]}>
                          Member Pass
                        </Text>
                      </TouchableOpacity>
                    </View>

                    {/* Manual Input */}
                    <View style={styles.manualRow}>
                      <TextInput
                        style={[
                          styles.input,
                          {
                            backgroundColor: theme.surface,
                            borderColor: theme.cardBorder,
                            color: theme.textPrimary,
                          },
                        ]}
                        placeholder="Enter or paste QR code data..."
                        placeholderTextColor={theme.textMuted}
                        value={scannedCode}
                        onChangeText={setScannedCode}
                      />
                      <TouchableOpacity
                        style={[styles.scanBtn, { backgroundColor: theme.primary }]}
                        onPress={() => handleSimulateScan()}
                      >
                        <Ionicons name="checkmark" size={20} color={theme.buttonText} />
                      </TouchableOpacity>
                    </View>

                    {simulatedResult && (
                      <View
                        style={[
                          styles.resultBox,
                          { backgroundColor: theme.goldGlow, borderColor: theme.goldAccent },
                        ]}
                      >
                        <Ionicons name="checkmark-circle" size={20} color={theme.goldAccent} />
                        <Text style={[styles.resultText, { color: theme.goldAccent }]}>
                          {simulatedResult}
                        </Text>
                      </View>
                    )}
                  </View>
                )}
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 420,
    maxHeight: '90%',
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  titleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    borderRadius: 14,
    padding: 4,
    marginBottom: 16,
  },
  tabItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  activeTabItem: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '700',
  },
  scrollBody: {
    alignItems: 'center',
  },
  displayContent: {
    alignItems: 'center',
    width: '100%',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 6,
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  bookInfoBox: {
    alignItems: 'center',
    marginBottom: 6,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
  },
  bookAuthor: {
    fontSize: 12,
    marginTop: 2,
  },
  subtitle: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  qrContainer: {
    marginVertical: 8,
  },
  codeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    gap: 8,
    marginTop: 14,
  },
  codeText: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1,
  },
  hintText: {
    fontSize: 11,
    marginTop: 10,
    textAlign: 'center',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 46,
    borderRadius: 23,
    marginTop: 16,
    gap: 8,
  },
  actionBtnText: {
    fontSize: 14,
    fontWeight: '800',
  },
  scanContent: {
    alignItems: 'center',
    width: '100%',
  },
  scannerFrame: {
    width: '100%',
    height: 180,
    backgroundColor: '#0F1715',
    borderRadius: 16,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#D4AF37',
  },
  scannerOverlay: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scannerNotice: {
    color: '#D4AF37',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 8,
  },
  scanInstruction: {
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 12,
  },
  quickScanRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
    width: '100%',
  },
  presetChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    gap: 6,
  },
  presetText: {
    fontSize: 12,
    fontWeight: '700',
  },
  manualRow: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
  },
  input: {
    flex: 1,
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontSize: 13,
  },
  scanBtn: {
    width: 42,
    height: 42,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 12,
    width: '100%',
    gap: 8,
  },
  resultText: {
    fontSize: 13,
    fontWeight: '700',
    flex: 1,
  },
});
