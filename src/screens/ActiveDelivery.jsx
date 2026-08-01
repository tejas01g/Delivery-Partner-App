import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useOrderStore } from '../store/orderStore';
import StatusBadge from '../components/StatusBadge';
import Button from '../components/Button';
import { ORDER_STATUS, NEXT_ACTION_LABEL } from '../constants/orderStatus';

const STEPS = [
    ORDER_STATUS.ACCEPTED,
    ORDER_STATUS.PICKED_UP,
    ORDER_STATUS.OUT_FOR_DELIVERY,
    ORDER_STATUS.DELIVERED,
];

function StatusStepper({ currentStatus }) {
    const currentIndex = STEPS.indexOf(currentStatus);

    return (
        <View style={styles.stepperRow}>
            {STEPS.map((step, index) => {
                const isDone = index <= currentIndex;
                return (
                    <React.Fragment key={step}>
                        <View style={[styles.dot, isDone && styles.dotDone]} />
                        {index < STEPS.length - 1 && (
                            <View style={[styles.line, index < currentIndex && styles.lineDone]} />
                        )}
                    </React.Fragment>
                );
            })}
        </View>
    );
}

export default function ActiveDelivery({ navigation }) {
    const { activeOrder, advanceOrderStatus, completeDelivery } = useOrderStore();

    if (!activeOrder) {
        return (
            <View style={styles.centered}>
                <Text style={styles.emptyText}>No active delivery.</Text>
                <View style={{ height: 12 }} />
                <Button title="Back to Orders" onPress={() => navigation.navigate('Orders')} />
            </View>
        );
    }

    const isDelivered = activeOrder.status === ORDER_STATUS.DELIVERED;

    const handlePrimaryAction = () => {
        if (isDelivered) {
            completeDelivery();
            navigation.navigate('Orders');
        } else {
            advanceOrderStatus();
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.headerRow}>
                <Text style={styles.orderId}>{activeOrder.id}</Text>
                <StatusBadge status={activeOrder.status} />
            </View>

            <Text style={styles.customerName}>{activeOrder.customerName}</Text>

            <StatusStepper currentStatus={activeOrder.status} />

            <View style={styles.section}>
                <Text style={styles.sectionLabel}>Pickup</Text>
                <Text style={styles.sectionValue}>{activeOrder.pickup}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionLabel}>Drop</Text>
                <Text style={styles.sectionValue}>{activeOrder.drop}</Text>
            </View>

            <View style={styles.statsRow}>
                <View style={styles.statBox}>
                    <Text style={styles.statValue}>{activeOrder.distanceKm} km</Text>
                    <Text style={styles.statLabel}>Distance</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statValue}>₹{activeOrder.payout}</Text>
                    <Text style={styles.statLabel}>Payout</Text>
                </View>
            </View>

            <View style={styles.actions}>
                <Button
                    title={isDelivered ? 'Done' : NEXT_ACTION_LABEL[activeOrder.status]}
                    onPress={handlePrimaryAction}
                />
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
        padding: 20,
    },
    emptyText: {
        fontSize: 15,
        color: '#6B7280',
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
    stepperRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    dot: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#E5E7EB',
    },
    dotDone: {
        backgroundColor: '#111827',
    },
    line: {
        flex: 1,
        height: 3,
        backgroundColor: '#E5E7EB',
        marginHorizontal: 4,
    },
    lineDone: {
        backgroundColor: '#111827',
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
        marginTop: 24,
    },
});