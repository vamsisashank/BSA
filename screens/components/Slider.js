import React, { useEffect, useState } from "react";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { View, Image, Dimensions, StyleSheet } from "react-native";

const Slider = ({ slides }) => {
    const [current, setCurrent] = useState(0);
    const length = slides.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    const imageWidth = Math.floor(Dimensions.get('window').width / 1.25);
    const imageHeight = Math.floor(Dimensions.get('window').height / 3);

    useEffect(() => {
        const interval = setInterval(() => nextSlide(), 5000);

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    });

    return (
        <View style={styles.container}>
            <FontAwesome.Button
                name="chevron-left"
                backgroundColor="transparent"
                color="black"
                onPress={prevSlide} />
            <Image
                source={slides[current]}
                style={{ height: imageHeight, width: imageWidth, resizeMode: 'contain' }} />
            <FontAwesome.Button
                name="chevron-right"
                backgroundColor="transparent"
                color="black"
                onPress={nextSlide} />
        </View>
    );
};

export default Slider;

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
});