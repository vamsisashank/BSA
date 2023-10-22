import React, { useState, useEffect } from 'react';
import { Calendar } from 'react-native-big-calendar'
import { StyleSheet, View, Dimensions, SafeAreaView, Pressable, Text, Alert, Modal, Linking } from 'react-native';
import moment from 'moment';
import { CalendarHeaderForMonthView } from 'react-native-big-calendar';

const getMonth = (date) => {
  return moment(date).format('MMMM YYYY');
};

export default function EventCalendar(props) {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [month, setMonth] = useState(getMonth(new Date()));
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});
  const eventBgColor = props.eventColor || '#3174ad';
  const url = props.linkUrl || "https://www.atlantabsa.org/admin2/login";

  const onPressEvent = (evt) => {
    setSelectedEvent(evt);
    setModalVisible(true);
  };

  const getTime = (date, time) => {
    return moment(date + " " + time + " EST", ["MM/DD/yyyy h:mm A PDT"]).toDate();
  };

  const getEventTimeFormat = (date, time) => {
    return moment(date + " " + time + " EST", ["MM/DD/yyyy h:mm A PDT"]).format('MMM DD yyyy h:mm A');
  }

  const getEvents = async () => {
    try {
      setLoading(true);
      //https://apimocha.com/eventcal/events
      //ToDo  - to replace with original values
      const response = await fetch(props.eventApi);
      const json = await response.json();
      const r = Array.from(json);
      r.forEach(item => {
        item['start'] = getTime(item["Start Date"], item["Start Time"]);
        item['end'] = getTime(item["End Date"], item["End Time"]);
        item['title'] = item['Subject'];
      });
      setEvents(r);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getEvents();
  }, []);

  const onChangeDate = (date) => {
    const m = getMonth(date[0]);
    setMonth(m);
  }

  return (
    <SafeAreaView style={{ display: 'flex', flexDirection: 'column' }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, { backgroundColor: eventBgColor }]}>
            <Text style={styles.modalHeader}>{selectedEvent["Subject"]}</Text>
            <View style={styles.modalContainer}>
              <Text style={[styles.modalText, styles.belowSpace]}>{selectedEvent["Description"] || selectedEvent["Subject"]}</Text>
              <Text style={[styles.modalText, styles.eventInfo, styles.belowSpace]} onPress={()=> {Linking.openURL(url);}}>
                {getEventTimeFormat(selectedEvent["Start Date"], selectedEvent["Start Time"])} to {getEventTimeFormat(selectedEvent["End Date"], selectedEvent["End Time"])}
                { '\n' }
                {selectedEvent["Location"]}
              </Text>
              <Pressable
                style={[styles.button, styles.buttonClose, { backgroundColor: eventBgColor }]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Ok</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Calendar
        height={Dimensions.get('window').height - 150}
        eventCellStyle={{ backgroundColor: eventBgColor }}
        hourRowHeight={2}
        events={events}
        mode={'month'}
        activeDate={new Date('11/12/2022')}
        onPressEvent={onPressEvent}
        onChangeDate={onChangeDate}
        showAdjacentMonths={true}
        swipeEnabled={true}
        showTime={true}
        renderHeaderForMonthView={() => testHeader(month)}
      />
    </SafeAreaView>
  );

}

function testHeader(data) {
  return (
    <View>
      <Text style={{ fontSize: 30, fontWeight: 'bold', alignSelf: 'center', padding: 10 }}>{data}</Text>
      <CalendarHeaderForMonthView></CalendarHeaderForMonthView>
    </View>

  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    alignItems: 'center',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    alignSelf: 'center',
    width: 100,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    textAlign: "center"
  },
  modalHeader: {
    fontWeight: 'bold',
    fontSize: 20,
    padding: 10,
    color: 'white'
  },
  eventInfo: {
    color: '#015697',
    fontWeight: 'bold'
  },
  modalContainer: {
    backgroundColor: 'white',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    padding: 20
  },
  belowSpace: {
    paddingBottom: 20
  }
});