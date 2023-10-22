import { View, Text, StyleSheet } from "react-native";
import Slider from "./components/Slider";
import slide1 from "../assets/icons/bert_adams_logo.png";
import slide2 from "../assets/icons/woodruff.png";
import slide3 from "../assets/icons/allatoona_logo.png";

// Base Landing Page for the application
export default function BasePage() {
    const slideImages = [
        slide1,
        slide2,
        slide3
    ];

    return (
        <View style={styles.container}>
            <Slider slides={slideImages}>
            </Slider>
            <Text style={styles.info}>
                The Atlanta Area Council is divided into 13 geographical areas called districts. Each district is made up of local Scouting units called Cub Scout Packs, Scouts BSA Troops, Venturing Crews, and Exploring Posts.
                These units are chartered to a local school, religious organization, or community center.
            </Text>
            <Text style={styles.info}>
                Scouting activities happen all year-long in your local neighborhood or at one of our beautiful scout camps.
            </Text>
            <Text style={styles.info}>
                If you want to get involved with Scouting or have a question about the exciting opportunities Scouting offers Atlanta’s families, please contact us at 770-989-8820.
            </Text>
        </View>
    );

}


const styles = StyleSheet.create({
    info: {
        fontSize: 15,
        textAlign: 'justify',
        marginVertical: 10,
        padding: 8,
    },
    container : {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
});