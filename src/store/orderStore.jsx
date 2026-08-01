import { create } from 'zustand';
import { getAvailableOrders } from '../services/api';
import { ORDER_STATUS, NEXT_STATUS } from '../constants/orderStatus';

export const useOrderStore = create((set, get) => ({
    availableOrders: [],
    activeOrder: null,
    isLoading: false,
    error: null,

    fetchAvailableOrders: async () => {
        set({ isLoading: true, error: null });
        try {
            const orders = await getAvailableOrders();
            set({ availableOrders: orders, isLoading: false });
        } catch (err) {
            set({ error: err.message, isLoading: false });
        }
    },

    acceptOrder: (orderId) => {
        const order = get().availableOrders.find((o) => o.id === orderId);
        if (!order) return;

        const acceptedOrder = { ...order, status: ORDER_STATUS.ACCEPTED };

        set((state) => ({
            activeOrder: acceptedOrder,
            // Remove it from the available list since it's now taken.
            availableOrders: state.availableOrders.filter((o) => o.id !== orderId),
        }));
    },

    advanceOrderStatus: () => {
        const { activeOrder } = get();
        if (!activeOrder) return;

        const nextStatus = NEXT_STATUS[activeOrder.status];
        if (!nextStatus) return; // already DELIVERED, nothing further

        set({ activeOrder: { ...activeOrder, status: nextStatus } });
    },

    completeDelivery: () => {
        set({ activeOrder: null });
    },
}));