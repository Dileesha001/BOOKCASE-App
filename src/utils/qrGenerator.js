import qrcode from 'qrcode-generator';

/**
 * Generates a QR Code 2D matrix of booleans for Expo Go / React Native.
 * @param {string} value - Text or URL to encode.
 * @returns {Array<Array<boolean>>} 2D matrix of boolean cells (true = dark, false = light)
 */
export function generateQRMatrix(value) {
  if (!value) return [];
  try {
    // Type 0 auto-detects version (1..40), Error Correction level 'M'
    const qr = qrcode(0, 'M');
    qr.addData(String(value));
    qr.make();

    const count = qr.getModuleCount();
    const matrix = [];

    for (let r = 0; r < count; r++) {
      const row = [];
      for (let c = 0; c < count; c++) {
        row.push(qr.isDark(r, c));
      }
      matrix.push(row);
    }
    return matrix;
  } catch (err) {
    console.error('Failed to generate QR matrix:', err);
    return [];
  }
}
