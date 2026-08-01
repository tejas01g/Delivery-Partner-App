export const ORDER_STATUS = {
    AVAILABLE: 'AVAILABLE',
    ACCEPTED: 'ACCEPTED',
    PICKED_UP: 'PICKED_UP',
    OUT_FOR_DELIVERY: 'OUT_FOR_DELIVERY',
    DELIVERED: 'DELIVERED',
};

export const STATUS_LABELS = {
    [ORDER_STATUS.AVAILABLE]: 'Available',
    [ORDER_STATUS.ACCEPTED]: 'Accepted',
    [ORDER_STATUS.PICKED_UP]: 'Picked Up',
    [ORDER_STATUS.OUT_FOR_DELIVERY]: 'Out for Delivery',
    [ORDER_STATUS.DELIVERED]: 'Delivered',
};

// Defines what the "next" status is when the delivery partner
// taps the primary action button on the ActiveDelivery screen.
export const NEXT_STATUS = {
    [ORDER_STATUS.ACCEPTED]: ORDER_STATUS.PICKED_UP,
    [ORDER_STATUS.PICKED_UP]: ORDER_STATUS.OUT_FOR_DELIVERY,
    [ORDER_STATUS.OUT_FOR_DELIVERY]: ORDER_STATUS.DELIVERED,
};

export const NEXT_ACTION_LABEL = {
    [ORDER_STATUS.ACCEPTED]: 'Mark as Picked Up',
    [ORDER_STATUS.PICKED_UP]: 'Start Delivery',
    [ORDER_STATUS.OUT_FOR_DELIVERY]: 'Mark as Delivered',
};