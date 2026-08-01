import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import StatusBadge from '../components/StatusBadge';

export default function OrderCard({ order, onPress }) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
            <View style={styles.headerRow}>
                <Text style={styles.orderId}>{order.id}</Text>
                <StatusBadge status={order.status} />
            </View>

            <View style={styles.routeRow}>
                <Text style={styles.routeLabel}>From</Text>
                <Text style={styles.routeText} numberOfLines={1}>{order.pickup}</Text>
            </View>
            <View style={styles.routeRow}>
                <Text style={styles.routeLabel}>To</Text>
                <Text style={styles.routeText} numberOfLines={1}>{order.drop}</Text>
            </View>

            <View style={styles.footerRow}>
                <Text style={styles.meta}>{order.distanceKm} km</Text>
                <Text style={styles.payout}>₹{order.payout}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    orderId: {
        fontSize: 14,
        fontWeight: '700',
        color: '#111827',
    },
    routeRow: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    routeLabel: {
        width: 42,
        fontSize: 12,
        color: '#9CA3AF',
        fontWeight: '600',
    },
    routeText: {
        flex: 1,
        fontSize: 13,
        color: '#374151',
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
    },
    meta: {
        fontSize: 12,
        color: '#6B7280',
    },
    payout: {
        fontSize: 14,
        fontWeight: '700',
        color: '#059669',
    },
});