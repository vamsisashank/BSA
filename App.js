import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useHeaderHeight } from '@react-navigation/elements';
import DrawerItems from './constants/DrawerItems';
import BertPage from './screens/BertPage';
import AllatoonaPage from './screens/AllatoonaPage';
import WoodruffPage from './screens/WoodruffPage';
import BasePage from './screens/BasePage';


const Drawer = createDrawerNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerType="front"
        initialRouteName="Base"
        screenOptions={{
          activeTintColor: '#e91e63',
          itemStyle: { marginVertical: 10 },
        }}>
        {
          DrawerItems.map(drawer => <Drawer.Screen
            key={drawer.name}
            name={drawer.name}
            options={{
              headerTitle: () => {
                return (
                  drawer.name === 'Bert Adams Scout Camp' ?
                    <Image style={styles.Image} source={require('./assets/icons/bert_adams_logo.png')} /> :
                    drawer.name === 'Allatoona Aquatics Base' ?
                      <Image style={styles.Image} source={require('./assets/icons/allatoona_logo.png')} /> :
                      drawer.name === 'Woodruff Scout Camp' ?
                        <Image style={styles.Image} source={require('./assets/icons/woodruff.png')} /> :
                        <Image style={styles.Image} source={require('./assets/icons/aaoc_logo.png')} />
                )
              },
              headerStyle: {
                height: 100
              }
            }}
            component={
              drawer.name === 'Bert Adams Scout Camp' ? BertPage
                : drawer.name === 'Allatoona Aquatics Base' ? AllatoonaPage
                  : drawer.name === 'Woodruff Scout Camp' ? WoodruffPage
                    : BasePage
            }
          />)
        }
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  scrollView: {
    backgroundColor: 'pink'
  }, text: {
    fontSize: 42,
  },
  Image: {
    resizeMode: 'contain',
    width: 280,
    justifyContent: 'flex-start',
  },
});
