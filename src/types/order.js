/**
 * @typedef {'AVAILABLE' | 'ACCEPTED' | 'PICKED_UP' | 'OUT_FOR_DELIVERY' | 'DELIVERED'} OrderStatus
 */

/**
 * @typedef {Object} Order
 * @property {string} id - Unique order id, e.g. "ORD-1001"
 * @property {string} customerName
 * @property {string} pickup - Pickup address
 * @property {string} drop - Drop address
 * @property {number} distanceKm
 * @property {number} payout - Payout amount in ₹
 * @property {string[]} items - List of item descriptions
 * @property {OrderStatus} status
 */

// This file has no runtime code — it exists purely so editors
// (VS Code / WebStorm) can show autocomplete and type hints for
// Order objects via JSDoc, without pulling in TypeScript.
// Import it only for the @typedef references, e.g.:
//
//   /** @type {Order} */
//   const order = ...;

export { };