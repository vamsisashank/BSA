import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { apiKEY, baseUrl } from '../../constants/apiVals';
import Slider from "./Slider";

const CampHomeScreen = ({ campName, slideImages }) => {
    const [description, setDescription] = useState([]);
    const [loading, setLoading] = useState(true);

    const getDescription = () => {
        return fetch(`${baseUrl}/descriptions`, {
            method: 'GET',
            headers: {
                'x-api-key': apiKEY
            }
        })
            .then(response => response.json())
            .then(json => {
                const campDescription = json.find(a => a.location === campName);
                setDescription(campDescription);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    };

    useEffect(() => {
        getDescription();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {
                loading ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" />
                    </View>
                    :
                    <>
                        {
                            slideImages && <Slider slides={slideImages}>
                            </Slider>
                        }
                        <View>
                            <Text style={styles.header}>About</Text>
                            <Text style={styles.info}>
                                {description?.description}
                            </Text>
                            <Text style={styles.located}>Located At</Text>
                            <Text style={styles.info}>
                                {description?.address}
                            </Text>
                        </View>
                    </>
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    info: {
        fontSize: 15,
        textAlign: 'justify',
        marginVertical: 10,
        padding: 10,
    },
    header: {
        fontSize: 24,
        color: '#015697',
        textAlign: 'justify',
        padding: 12
    },
    located: {
        color: '#ff820a',
        fontSize: 15,
        marginBottom: 10,
        paddingLeft: 12
    }
});

export default CampHomeScreen;
