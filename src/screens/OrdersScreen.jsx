import React, { useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { useOrderStore } from '../store/orderStore';
import OrderCard from '../components/OrderCard';

export default function OrdersScreen({ navigation }) {
    const { availableOrders, isLoading, fetchAvailableOrders, activeOrder } = useOrderStore();

    useEffect(() => {
        fetchAvailableOrders();
    }, []);

    useEffect(() => {
        if (activeOrder) {
            navigation.navigate('ActiveDelivery');
        }
    }, [activeOrder]);

    const handleOrderPress = useCallback(
        (orderId) => {
            navigation.navigate('OrderDetails', { orderId });
        },
        [navigation]
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Available Orders</Text>
            <Text style={styles.subtitle}>{availableOrders.length} orders near you</Text>

            <FlatList
                data={availableOrders}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={fetchAvailableOrders} />
                }
                renderItem={({ item }) => (
                    <OrderCard order={item} onPress={() => handleOrderPress(item.id)} />
                )}
                ListEmptyComponent={
                    !isLoading && (
                        <Text style={styles.emptyText}>No orders available right now. Pull to refresh.</Text>
                    )
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#111827',
    },
    subtitle: {
        fontSize: 13,
        color: '#6B7280',
        marginTop: 2,
        marginBottom: 16,
    },
    listContent: {
        paddingBottom: 24,
    },
    emptyText: {
        textAlign: 'center',
        color: '#9CA3AF',
        marginTop: 40,
    },
});