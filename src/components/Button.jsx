import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

export default function Button({ title, onPress, variant = 'primary', disabled = false, loading = false }) {
    const isSecondary = variant === 'secondary';

    return (
        <TouchableOpacity
            style={[
                styles.base,
                isSecondary ? styles.secondary : styles.primary,
                disabled && styles.disabled,
            ]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.75}
        >
            {loading ? (
                <ActivityIndicator color={isSecondary ? '#1F2937' : '#FFFFFF'} />
            ) : (
                <Text style={[styles.text, isSecondary ? styles.secondaryText : styles.primaryText]}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    base: {
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primary: {
        backgroundColor: '#111827',
    },
    secondary: {
        backgroundColor: '#F3F4F6',
        borderWidth: 1,
        borderColor: '#D1D5DB',
    },
    disabled: {
        opacity: 0.5,
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
    },
    primaryText: {
        color: '#FFFFFF',
    },
    secondaryText: {
        color: '#111827',
    },
});