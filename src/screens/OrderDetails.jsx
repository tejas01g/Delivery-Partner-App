import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { getOrderById } from '../services/api';
import { useOrderStore } from '../store/orderStore';
import StatusBadge from '../components/StatusBadge';
import Button from '../components/Button';

export default function OrderDetails({ route, navigation }) {
    const { orderId } = route.params;
    const acceptOrder = useOrderStore((state) => state.acceptOrder);

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [accepting, setAccepting] = useState(false);

    useEffect(() => {
        let isMounted = true;
        getOrderById(orderId).then((data) => {
            if (isMounted) {
                setOrder(data);
                setLoading(false);
            }
        });
        return () => {
            isMounted = false;
        };
    }, [orderId]);

    const handleAccept = () => {
        setAccepting(true);
        acceptOrder(orderId);
        navigation.replace('ActiveDelivery');
    };

    if (loading || !order) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#111827" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.headerRow}>
                <Text style={styles.orderId}>{order.id}</Text>
                <StatusBadge status={order.status} />
            </View>

            <Text style={styles.customerName}>{order.customerName}</Text>

            <View style={styles.section}>
                <Text style={styles.sectionLabel}>Pickup</Text>
                <Text style={styles.sectionValue}>{order.pickup}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionLabel}>Drop</Text>
                <Text style={styles.sectionValue}>{order.drop}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionLabel}>Items</Text>
                {order.items.map((item, idx) => (
                    <Text key={idx} style={styles.itemText}>• {item}</Text>
                ))}
            </View>

            <View style={styles.statsRow}>
                <View style={styles.statBox}>
                    <Text style={styles.statValue}>{order.distanceKm} km</Text>
                    <Text style={styles.statLabel}>Distance</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statValue}>₹{order.payout}</Text>
                    <Text style={styles.statLabel}>Payout</Text>
                </View>
            </View>

            <View style={styles.actions}>
                <Button title="Accept Order" onPress={handleAccept} loading={accepting} />
                <View style={{ height: 10 }} />
                <Button title="Go Back" variant="secondary" onPress={() => navigation.goBack()} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    content: {
        padding: 20,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    orderId: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
    },
    customerName: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 20,
    },
    section: {
        marginBottom: 16,
    },
    sectionLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#9CA3AF',
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    sectionValue: {
        fontSize: 15,
        color: '#111827',
    },
    itemText: {
        fontSize: 14,
        color: '#374151',
        marginTop: 2,
    },
    statsRow: {
        flexDirection: 'row',
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        padding: 16,
        marginVertical: 12,
    },
    statBox: {
        flex: 1,
        alignItems: 'center',
    },
    statValue: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
    },
    statLabel: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 2,
    },
    actions: {
        marginTop: 20,
    },
});