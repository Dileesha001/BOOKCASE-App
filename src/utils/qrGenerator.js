import QRCode from 'qrcode';

/**
 * Generates a QR Code matrix (2D array of booleans) for a given text.
 * @param {string} value - Text or URL to encode in QR.
 * @returns {Array<Array<boolean>>} 2D matrix of boolean cells (true = dark, false = light)
 */
export function generateQRMatrix(value) {
  if (!value) return [];
  try {
    const qr = QRCode.create(value, { errorCorrectionLevel: 'M' });
    const size = qr.modules.size;
    const data = qr.modules.data;
    const matrix = [];

    for (let row = 0; row < size; row++) {
      const rowArr = [];
      for (let col = 0; col < size; col++) {
        rowArr.push(Boolean(data[row * size + col]));
      }
      matrix.push(rowArr);
    }
    return matrix;
  } catch (err) {
    console.error('Failed to generate QR matrix:', err);
    return [];
  }
}

/**
 * Generates a Data URL (base64 PNG) for a given text.
 * @param {string} value 
 * @returns {Promise<string>}
 */
export async function generateQRDataURL(value) {
  try {
    return await QRCode.toDataURL(value, {
      margin: 2,
      width: 300,
      color: {
        dark: '#1B4D3E', // Emerald Dark Accent
        light: '#FFFFFF',
      },
    });
  } catch (err) {
    console.error('Failed to generate QR Data URL:', err);
    return null;
  }
}
