import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from '@expo/vector-icons';

import { CAMPNAMES } from "../constants/CampNames";
import AlertScreen from "./components/AlertScreen";
import CampHomeScreen from "./components/CampHomeScreen";

const Tab = createBottomTabNavigator();

// Landing page for allattona
export default function AllatoonaPage() {
    return (
        <Tab.Navigator screenOptions={{
            tabBarStyle: { position: 'absolute', showLabel: false },
            headerShown: false
        }}>
            <Tab.Screen name="Home" children={() => <CampHomeScreen campName={CAMPNAMES.allatoona} />} options={{
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome name="home" size={32} color="black" />
                ),
                tabBarShowLabel: false
            }} />
            <Tab.Screen name="Alerts" children={() => <AlertScreen campName={CAMPNAMES.allatoona} />} options={{
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome name="bell" size={32} color="black" />
                ),
                tabBarShowLabel: false
            }} />
        </Tab.Navigator>
    );
}