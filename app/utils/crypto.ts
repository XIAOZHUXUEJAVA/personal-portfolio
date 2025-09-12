// 简单的加密解密工具
const SECRET_KEY = "MyPhotoShare2024";

// 简单的XOR加密
function xorEncrypt(text: string, key: string): string {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
    result += String.fromCharCode(charCode);
  }
  return result;
}

// Base64编码（URL安全）
function base64UrlEncode(str: string): string {
  return btoa(encodeURIComponent(str))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

// Base64解码（URL安全）
function base64UrlDecode(str: string): string {
  // 补充padding
  str += "=".repeat((4 - (str.length % 4)) % 4);
  // 替换URL安全字符
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  try {
    return decodeURIComponent(atob(str));
  } catch (error) {
    throw new Error("Invalid encoded string");
  }
}

// 生成简单校验码
function generateChecksum(data: string): string {
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // 转换为32位整数
  }
  return Math.abs(hash).toString(36);
}

export const SimpleCrypto = {
  // 加密数据
  encrypt(data: any): string {
    try {
      const jsonString = JSON.stringify(data);
      const encrypted = xorEncrypt(jsonString, SECRET_KEY);
      const encoded = base64UrlEncode(encrypted);

      // 添加时间戳和校验码
      const timestamp = Date.now().toString(36);
      const checksum = generateChecksum(encoded);

      return `${timestamp}.${checksum}.${encoded}`;
    } catch (error) {
      throw new Error("Encryption failed");
    }
  },

  // 解密数据
  decrypt(encryptedData: string): any {
    try {
      const parts = encryptedData.split(".");
      if (parts.length !== 3) {
        throw new Error("Invalid format");
      }

      const timestamp = parts[0];
      const checksum = parts[1];
      const encoded = parts[2];

      if (!timestamp || !checksum || !encoded) {
        throw new Error("Missing required parts");
      }

      // 验证校验码
      if (generateChecksum(encoded) !== checksum) {
        throw new Error("Invalid checksum");
      }

      // 检查时间戳（可选：添加过期时间检查）
      const createdTime = parseInt(timestamp, 36);
      const now = Date.now();
      const maxAge = 30 * 24 * 60 * 60 * 1000; // 30天过期

      if (now - createdTime > maxAge) {
        throw new Error("Link expired");
      }

      const decoded = base64UrlDecode(encoded);
      const decrypted = xorEncrypt(decoded, SECRET_KEY);

      return JSON.parse(decrypted);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      throw new Error("Decryption failed: " + errorMessage);
    }
  },

  // 生成短链接ID（可选功能）
  generateShortId(): string {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  },
};
