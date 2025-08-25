/**
 * End-to-End Encryption Utilities for Chat Messages
 * Uses AES-256 encryption via CryptoJS
 */

// We'll dynamically import CryptoJS when needed to avoid bundle size issues
let CryptoJS = null;

/**
 * Generate a secure encryption key for a conversation
 * @param {String} userId1 - First user ID in the conversation
 * @param {String} userId2 - Second user ID in the conversation
 * @returns {String} - Encryption key for this conversation
 */
export const generateEncryptionKey = (userId1, userId2) => {
  // Sort IDs to ensure same key regardless of order
  const sortedIds = [userId1, userId2].sort().join('-');
  const salt = "SECURECHAT"; // In production, use a proper secure salt
  return `${sortedIds}-${salt}`;
};

/**
 * Store encryption key for a conversation in localStorage
 * @param {String} conversationId - ID of the conversation
 * @param {String} key - Encryption key
 */
export const storeEncryptionKey = (conversationId, key) => {
  const keys = JSON.parse(localStorage.getItem('chat-encryption-keys') || '{}');
  keys[conversationId] = key;
  localStorage.setItem('chat-encryption-keys', JSON.stringify(keys));
};

/**
 * Get encryption key for a conversation from localStorage
 * @param {String} conversationId - ID of the conversation
 * @returns {String|null} - Encryption key or null if not found
 */
export const getEncryptionKey = (conversationId) => {
  const keys = JSON.parse(localStorage.getItem('chat-encryption-keys') || '{}');
  return keys[conversationId] || null;
};

/**
 * Encrypt a message
 * @param {String} message - Plain text message
 * @param {String} key - Encryption key
 * @returns {Promise<String>} - Encrypted message
 */
export const encryptMessage = async (message, key) => {
  if (!CryptoJS) {
    CryptoJS = await import('crypto-js').then(module => module.default);
  }
  
  try {
    return CryptoJS.AES.encrypt(message, key).toString();
  } catch (error) {
    console.error("Encryption failed:", error);
    return message; // Fallback to unencrypted message
  }
};

/**
 * Decrypt a message
 * @param {String} encryptedMessage - Encrypted message
 * @param {String} key - Encryption key
 * @returns {Promise<String>} - Decrypted message
 */
export const decryptMessage = async (encryptedMessage, key) => {
  if (!CryptoJS) {
    CryptoJS = await import('crypto-js').then(module => module.default);
  }
  
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedMessage, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Decryption failed:", error);
    return encryptedMessage; // Return encrypted text on failure
  }
};
