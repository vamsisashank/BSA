import { StyleSheet, Text, View, TextInput, Image, Dimensions, ScrollView, Modal, Pressable, Alert } from 'react-native';
import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Constants from 'expo-constants';
import SelectDropdown from 'react-native-select-dropdown';
import { FontAwesome } from '@expo/vector-icons';
import ImageZoom from 'react-native-image-pan-zoom';
import { useForm, Controller } from "react-hook-form";
import EventCalendar from './components/EventCalender';
import DateTimePicker from '@react-native-community/datetimepicker';
import WeatherApp from './components/WeatherData';
import Slider from "./components/Slider";
import slide1 from "../assets/images/ba_cs_web_banner_2018.jpg";
import slide2 from "../assets/images/ba_nylt_web_banner_2018.jpg";
import slide3 from "../assets/images/ba_wb_web_banner_2018.jpg";
import { CAMPNAMES } from "../constants/CampNames";
import CampHomeScreen from "./components/CampHomeScreen";
import AlertScreen from "./components/AlertScreen";

const Tab = createBottomTabNavigator();
const slideImages = [
  slide1,
  slide2,
  slide3
];

//TODO: Move these screens into individual js files - erathina 
function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Slider slides={slideImages}>
      </Slider>
      <Text style={styles.header}>Current Weather Conditions</Text>
      <WeatherApp />
      <Text style={styles.header}>About</Text>
      <Text style={styles.info}>
        The Bert Adams Scout Camp was originally founded in 1928 in Vinings, Georgia.
        The new Bert Adams Scout Camp, located outside Covington, GA, was opened in
        1960 and has been a favorite location for camping, activities, and training.
        Through the generosity of our Scouting supporters, Bert Adams  provides
        state-of-the-art facilities that help create convenient and comfortable
        camping right in Atlanta's backyard!
      </Text>
      <Text style={styles.email}>Located At</Text>
      <Text>
        218 Scout Road
        Covington, Georgia 30016
      </Text>
    </ScrollView>
  );
}

// function AlertsScreen() {
//   const alertTypes = ['Severe', 'Amber', 'Info'];
//   const [modalVisible, setModalVisible] = useState(false);
//   const [alerts, setAlerts] = useState([
//     {   id: 1,
//         alertType: "Amber",
//         alertMessage: "Portion of Beech West Ridge Trail closed for repairs Mondays through Thursdays",
//         alertExpirationDate: "2027-10-17T14:19:00.000Z"
//     },
//     {
//       id: 2,
//       alertType: "Severe",
//       alertMessage: "Severe thunderstorm observed near parts of Beech west ridge trail",
//       alertExpirationDate: "2026-10-17T14:19:00.000Z"
//     },
//     {
//       id: 3,
//       alertType: "Info",
//       alertMessage: "Berts Adams Camp Visitor Center Hours will be open from 9AM - 12PM on Martin Luther King Day",
//       alertExpirationDate: "2027-10-17T14:19:00.000Z"
//     }
//   ]);

//   const [date, setDate] = useState(new Date());

//   const onDatePickerChange = (event, selectedDate) => {
//     const currentDate = selectedDate;
//     setDate(currentDate);
//   };

//   const { control, handleSubmit, formState: { errors }} = useForm();
//   const onSubmit = data => {
//      if (date == undefined || date < new Date()) {
//       Alert.alert("Please select a future date and time");
//      } else {
//       var alertsCopy = alerts;
//       alertsCopy.push({id: alerts.length + 1, alertType: data.alertType, alertMessage: data.alertMessage, alertExpirationDate: date.toISOString()});
//       setAlerts(alertsCopy);
//       setModalVisible(false);
//      }

//   };
//   return (
//     <View style = {{flex: 1}}>
//     <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', maxHeight: 700}}>
//       <View style={AlertStyles.container}>
//       {alerts.map(a=> (
//          ((new Date(a.alertExpirationDate).getTime() - Date.now()) > 0) && (<View key= {a.id} style={AlertStyles.card} backgroundColor = {AlertStyles.cardRed.color}>
//           <View style = {{justifyContent: 'center', margin: 10}}>
//             {a.alertType === 'Severe' ?  <FontAwesome name="times-circle" size={32} color={AlertStyles.cardRed.iconColor} /> :
//              (a.alertType === 'Amber' ? <FontAwesome name="exclamation-triangle" size={32} color={AlertStyles.cardAmber.iconColor} /> :
//              <FontAwesome name="info-circle" size={32} color={AlertStyles.cardBlue.iconColor} />)}
//           </View>
//           <View style = {{justifyContent: 'center', flex: 1}}>
//             <Text style={{color:"black"}}>{a.alertMessage}</Text>
//           </View>
//         </View>)
//       ))}
//       </View>
//       <View>
//       <Modal
//         animationType="slide"
//         visible={modalVisible}
//         onRequestClose={() => {
//           setModalVisible(!modalVisible);
//         }}
//       >
//         <View style = {{alignItems: 'center'}}><Text style = {{fontSize: 50, marginTop:100}}>Create Alert</Text></View>
//         <View style = {Formstyles.container}>
//           <Text style = {{fontSize: 20, fontWeight: 'bold'}}>Please Select the type of alert</Text>
//       <View>
//         <Controller
//         control={control}
//         rules={{
//          required: true,
//         }}
//         render={({ field: { onChange, onBlur, value } }) => (
//           <SelectDropdown buttonStyle = {Formstyles.dropDown} data = {alertTypes}
//           onSelect={onChange}
//           value = {value}
//           rowTextForSelection={(item, index) => {
//             // text represented for each item in dropdown
//             // if data array is an array of objects then return item.property to represent item in dropdown
//             return item
//           }}
//           />
//         )}
//         name = "alertType"
//       /></View>

//       <Text style = {{fontSize: 20, fontWeight: 'bold'}}>Please enter information about the alert</Text>
//       <View>
//       <Controller
//         control={control}
//         rules={{
//          maxLength: 100,
//         }}
//         render={({ field: { onChange, onBlur, value } }) => (
//           <TextInput style = {Formstyles.input}
//             onBlur={onBlur}
//             onChangeText={onChange}
//             value={value}
//           />
//         )}
//         name="alertMessage"
//       /></View>
//       <View style = {{flex: 1}}>
//         <Text style = {{fontSize: 20, fontWeight: 'bold'}}>Please select an expiration date and time:</Text>
//         <View style = {{flex: 1, flexDirection: 'row', margin: 30}}>
//       {
//       (
//         <DateTimePicker
//           testID="DatePicker"
//           value={date}
//           mode={'date'}
//           is24Hour={true}
//           onChange={onDatePickerChange}
//           style = {{flex: 1}}
//         />
//       )}
//       {
//       (
//         <DateTimePicker
//           testID="TimePicker"
//           value={date}
//           mode={'time'}
//           is24Hour={true}
//           onChange={onDatePickerChange}
//           style = {{flex: 1}} 
//         />
//       )}
//       </View>
//     </View>
//     <View>
//       <Pressable style={Formstyles.button} onPress={handleSubmit(onSubmit)}>
//         <Text style={Formstyles.text}>Create</Text></Pressable>
//         <Pressable style={Formstyles.button} onPress={() => setModalVisible(false)}>
//         <Text style={Formstyles.text}>Close</Text></Pressable>
//       </View>
//       </View>
//       </Modal>
//       </View>
//     </ScrollView>
//     <View style = {{flex: 1, alignItems: 'center', maxHeight: 150}}>
//       <Pressable style={{backgroundColor: 'black', paddingVertical: 12, paddingHorizontal: 32, borderRadius: 4, elevation: 3}} onPress={() => setModalVisible(true)}>
//         <Text style={{color: 'white'}}>Add Alert</Text>
//       </Pressable>
//       </View>
//     </View>
//   );
// }

function MapScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.header}>
        To zoom in and out of the map use your fingers to pinch in and out
      </Text>
      <ImageZoom
        cropWidth={Dimensions.get('window').width}
        cropHeight={Dimensions.get('window').height}
        imageWidth={210}
        imageHeight={400}
      >
        <Image source={require('../assets/maps/Bert-Adams-Scout-Camp_Map.jpg')} style={{ width: 200, height: 270 }} />
      </ImageZoom>
    </View>
  );
}


function EventsScreen() {
  return (
    <View style={{ flex: 100 }}>
      <EventCalendar
        eventApi='https://run.mocky.io/v3/858357e6-ce2e-4a19-993d-e67b96e12226'
        eventColor='#ff820a'
        linkUrl="https://www.campbertadams.org/admin2/login"
      />
    </View>
  );
}

function ContactScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.header}>Contact Us</Text>
      <Text style={styles.info}>
        Thank you for your interest in Bert Adams Scout Camp. We want to make sure you
        and your Scouts have an amazing experience. If you have a question of something we
        can help you with, please contact us at the email address or phone number below:
      </Text>
      <Text style={styles.email}>BertAdams@AtlantaBSA.org</Text>
      <Text>770-956-5687</Text>
      <Text style={styles.info}>
        If you're looking to purchase memorabilia, camping gear or other items during your
        time at Bert Adams please contact our Trading Post at the email address or phone number below:
      </Text>
      <Text style={styles.email}>BertAdamsTP@gmail.com</Text>
      <Text>770-385-1558</Text>
      <Text style={styles.info}>For Additional Information. Please contact us at!</Text>
      <Text>
        PHONE: (770) 989-8820
      </Text>
      <Text> FAX:   (770) 956-5980</Text>
      <Text> EMAIL:  BertAdams@AtlantaBSA.org</Text>
    </View>
  );
}

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

const Formstyles = StyleSheet.create({
  label: {
    color: 'white',
    margin: 20,
    marginLeft: 0,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    margin: 12,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black'
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    backfaceColor: 'gray'
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    height: 40,
    padding: 10,
    margin: 20
  },
  dropDown: {
    borderWidth: 1,
    margin: 20
  }
});

// Landing page for Bert campground
export default function BertPage() {
  // Bottom Tab Navigator component can be used in other pages
  return (
    <Tab.Navigator screenOptions={{
      tabBarStyle: { position: 'absolute', showLabel: false },
      headerShown: false
    }}>
      <Tab.Screen name="Home" children={() => <CampHomeScreen campName={CAMPNAMES.bert} slideImages={slideImages} />} options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="home" size={32} color="black" />
        ),
        tabBarShowLabel: false
      }} />
      <Tab.Screen name="Alerts" children={() => <AlertScreen campName={CAMPNAMES.bert} />} options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="bell" size={32} color="black" />
        ),
        tabBarShowLabel: false
      }} />
      <Tab.Screen name="Map" component={MapScreen} options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="map-marker" size={32} color="black" />
        ),
        tabBarShowLabel: false
      }} />
      <Tab.Screen name="Events" component={EventsScreen} options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="calendar" size={32} color="black" />
        ),
        tabBarShowLabel: false
      }} />
      <Tab.Screen name="Contact" component={ContactScreen} options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="user" size={32} color="black" />
        ),
        tabBarShowLabel: false
      }} />
    </Tab.Navigator>

  );
}

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
  email: {
    color: '#ff820a',
    fontSize: 15,
    marginBottom: 10,
  }
});
