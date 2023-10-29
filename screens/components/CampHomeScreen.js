import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CampHomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Camp Home Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default CampHomeScreen;
