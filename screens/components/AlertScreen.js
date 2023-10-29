import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { apiKEY, baseUrl } from '../../constants/apiVals';

const AlertScreen = ({ campName }) => {
    const [alerts, setAlerts] = useState([]);

    const getAlertsRequest = () => {
        return fetch(`${baseUrl}/alerts`, {
            headers: {
                'x-api-key': apiKEY
            }
        })
            .then(response => response.json())
            .then(json => {
                const filteredAlerts = json.filter(a => a.location === campName);
                setAlerts(filteredAlerts);
            })
            .catch(error => {
                console.error(error);
            });
    };

    useEffect(() => {
        getAlertsRequest();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', maxHeight: 700 }}>
                <View style={AlertStyles.container}>
                    {alerts.map(a => (
                        (<View key={a.id} style={AlertStyles.card} backgroundColor={AlertStyles.cardRed.color}>
                            <View style={{ justifyContent: 'center', margin: 10 }}>
                                {a.type === 'Severe' ? <FontAwesome name="times-circle" size={32} color={AlertStyles.cardRed.iconColor} /> :
                                    (a.type === 'Amber' ? <FontAwesome name="exclamation-triangle" size={32} color={AlertStyles.cardAmber.iconColor} /> :
                                        <FontAwesome name="info-circle" size={32} color={AlertStyles.cardBlue.iconColor} />)}
                            </View>
                            <View style={{ justifyContent: 'center', flex: 1 }}>
                                <Text style={{ color: "black" }}>{a.description}</Text>
                            </View>
                        </View>)
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default AlertScreen;

const AlertStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 2,
        alignItems: "center"
    },
    card: {
        width: "90%",
        borderRadius: 15,
        elevation: 10,
        padding: 10,
        flexDirection: 'row',
        margin: 10
    },
    cardAmber: {
        color: "white",
        iconColor: "#ed7e31",
    },
    cardRed: {
        color: "white",
        iconColor: "#cb2027",
    },
    cardBlue: {
        color: "white",
        iconColor: "#2451a9",
    },
    profileImg: {
        width: 30,
        height: 30,
        borderRadius: 50,
        marginRight: 10,
    },
    header: {
        flexDirection: "row",
    }
});

