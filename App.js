import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './components/Welcome';
import Home from "./components/Home";
import Menu from "./components/Menu";
import WeatherStatistics from "./components/Stadistic";
import Profile from './components/Profile';
const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // Oculta la barra de navegación en todas las pantallas
        }}
      >
        <Stack.Screen name="welcome" component={Welcome} />
        <Stack.Screen name="home">
  {(props) => (
    <>
      <Home {...props} />
      <Menu currentTab="home" />
    </>
  )}
</Stack.Screen>
<Stack.Screen name="stadistic">
  {(props) => (
    <>
      <WeatherStatistics {...props} />
      <Menu currentTab="stadistic" />
    </>
  )}
</Stack.Screen>
<Stack.Screen name="profile">
  {(props) => (
    <>
      <Profile {...props} />
      <Menu currentTab="profile" />
    </>
  )}
</Stack.Screen>


       
      </Stack.Navigator>
    </NavigationContainer>
  );
}
