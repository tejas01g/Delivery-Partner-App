import { ORDER_STATUS } from '../constants/orderStatus';

// Hardcoded/local dummy data — no backend required for this assessment.
// Structured as functions so a real API can be dropped in later without
// touching any screen code.

const MOCK_ORDERS = [
    {
        id: 'ORD-1001',
        customerName: 'Rohan Mehta',
        pickup: 'Cafe Delight, Sector 18, Noida',
        drop: 'B-42, Sector 62, Noida',
        distanceKm: 3.2,
        payout: 55,
        items: ['1x Veg Sandwich', '1x Cold Coffee'],
        status: ORDER_STATUS.AVAILABLE,
    },
    {
        id: 'ORD-1002',
        customerName: 'Priya Sharma',
        pickup: 'Domino\'s Pizza, DLF Mall, Gurugram',
        drop: 'Tower 7, M3M Merlin, Gurugram',
        distanceKm: 5.8,
        payout: 72,
        items: ['1x Medium Pizza', '1x Garlic Bread'],
        status: ORDER_STATUS.AVAILABLE,
    },
    {
        id: 'ORD-1003',
        customerName: 'Aman Verma',
        pickup: 'Big Bazaar, Sector 15, Gurugram',
        drop: 'H-12, DLF Phase 3, Gurugram',
        distanceKm: 2.1,
        payout: 40,
        items: ['Groceries (4 items)'],
        status: ORDER_STATUS.AVAILABLE,
    },
    {
        id: 'ORD-1004',
        customerName: 'Sneha Kapoor',
        pickup: 'Chaayos, Cyber Hub, Gurugram',
        drop: 'Suncity Township, Sector 54, Gurugram',
        distanceKm: 4.5,
        payout: 60,
        items: ['2x Masala Chai', '1x Bun Maska'],
        status: ORDER_STATUS.AVAILABLE,
    },
];

// Simulates async network latency so loading states are exercised.
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getAvailableOrders() {
    await delay(400);
    return MOCK_ORDERS.filter((order) => order.status === ORDER_STATUS.AVAILABLE);
}

export async function getOrderById(orderId) {
    await delay(200);
    const order = MOCK_ORDERS.find((o) => o.id === orderId);
    if (!order) throw new Error('Order not found');
    return order;
}