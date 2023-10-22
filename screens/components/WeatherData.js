import { useEffect, useState } from "react";
import { API } from "../utils/API";
import { Text, StyleSheet, View } from "react-native";


const round = (value, precision) => {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
};

// exported for tests
const _getWeather = (_API) => async (lat, lon) => {
  const weather = await _API.getCurrentWeather(lat, lon);

  if (!weather) return;

  return {
    icon: weather.weather[0].icon,
    data: {
      cityName: weather.name,
      data: {
        forecast: [],
        current: {
          date: new Date().toDateString(),
          description: weather.weather[0].description,
          temperature: {
            current: round(weather.main.temp - 273.15, 1),
            min: round(weather.main.temp_min - 273.15, 1),
            max: round(weather.main.temp_max - 273.15, 1)
          },
          wind: weather.wind.speed,
          humidity: weather.main.humidity
        }
      }
    }
  };
};

const getWeather = _getWeather(API);

export default function WeatherApp() {
  const [weather, setWeather] = useState();
  const [latLng, setLatLng] = useState({
    // default to Covington
    lat: 33.5928,
    lng: -83.8552
  });


  const updateWeather = async (lat, lng) => {
    const { data } = await getWeather(lat, lng);
    setWeather(data);
  };

  useEffect(() => {
    updateWeather(latLng.lat, latLng.lng);
  }, [latLng]);

  return  (
    <View style={styles.container}>
        {
            weather 
            ?
            <View style={styles.weatherContainer}>
              <View style = {{flexDirection: 'row'}}>
                <Text style={styles.name}>{weather.cityName}</Text>
                <Text style={styles.date}>{weather.data.current.date}</Text>
              </View>
                <View style={styles.displayContainer}>
                <View style={styles.temperature}>
                </View>
                <View style={styles.temperature}>
                <Text style={styles.current}>{weather.data.current.temperature.current} {'C'}</Text>
                <Text style={styles.info}>{'H'}: {weather.data.current.temperature.max} {'C'} /  {'L'}: {weather.data.current.temperature.min} {'C'}</Text>
                <Text style={styles.description}>{weather.data.current.description}</Text>
                </View>
                <View style = {{flexDirection: 'row'}}>
                <Text style={styles.info}>
                    {'Wind'}: {weather.data.current.wind} {'Km/h'}
                </Text>
                <Text style={styles.info}>
                    {'Humidity'}: {weather.data.current.humidity} {'%'}
                </Text>
                </View>
                </View>
            </View>
            :
            null
        }
    </View> 
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 8,
    marginBottom: 15
  },
  name: {
      fontSize: 24,
      fontWeight: '300',
      margin: 10
  },
  date: {
      fontSize: 24,
      fontWeight: '300',
      margin: 10
  },
  weatherContainer: { 
      color: '#fffff',
      background: '#0181c2'
   },
  displayContainer: {
      marginTop: 10
  },
  info: {
      fontSize: 18,
      marginBottom: 2,
      margin: 10
  },
  current: {
      fontSize: 18,
      margin: 10
  },
  description: {
      fontSize: 18,
      fontWeight: '300',
      margin: 10
  },
  temperature: {
     borderBottom: '1px solid #00000' ,
     marginBottom: 8,
     flexDirection: 'row'
  }
});
