import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { STATUS_LABELS, ORDER_STATUS } from '../constants/orderStatus';

const STATUS_COLORS = {
    [ORDER_STATUS.AVAILABLE]: { bg: '#E0F2FE', text: '#0369A1' },
    [ORDER_STATUS.ACCEPTED]: { bg: '#FEF3C7', text: '#B45309' },
    [ORDER_STATUS.PICKED_UP]: { bg: '#EDE9FE', text: '#6D28D9' },
    [ORDER_STATUS.OUT_FOR_DELIVERY]: { bg: '#DBEAFE', text: '#1D4ED8' },
    [ORDER_STATUS.DELIVERED]: { bg: '#D1FAE5', text: '#047857' },
};

export default function StatusBadge({ status }) {
    const colors = STATUS_COLORS[status] || { bg: '#E5E7EB', text: '#374151' };

    return (
        <View style={[styles.badge, { backgroundColor: colors.bg }]}>
            <Text style={[styles.text, { color: colors.text }]}>{STATUS_LABELS[status] || status}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
        alignSelf: 'flex-start',
    },
    text: {
        fontSize: 12,
        fontWeight: '600',
    },
});