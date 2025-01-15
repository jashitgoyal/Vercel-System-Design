"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateId = generateId;
/**
 * Generates a random ID string
 * @param length The length of the ID (default: 16)
 * @returns A random string ID
 */
function generateId(length = 16) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}
