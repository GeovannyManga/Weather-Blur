import React, { useEffect, useState ,useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, ScrollView, RefreshControl } from "react-native";
import { BlurView } from "@react-native-community/blur";
import { LineChart } from "react-native-chart-kit";

import { scaleLinear } from "react-native-svg";

import { YAxis, XAxis, Grid } from "react-native-svg-charts";
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
  ActivityIndicator
} from "react-native";
import axios from "axios";
import * as Location from "expo-location";
import Carousel from "react-native-snap-carousel";
import moment from "moment";
import "moment/locale/es";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Stadistic() {

  const screenWidth = Dimensions.get("window").width;
  moment.locale("es");
  const [refreshing, setRefreshing] = useState(false);
  const [city, setCity] = useState(null);
  const [logo, setLogo] = useState(null);
  const [type, setType] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [forecastData, setForcasDate] = useState(null);
  const [searchCity, setSearchCity] = useState("");

  const [locationError, setLocationError] = useState(null);
  const navigation = useNavigation();

  

 

    const fetchData = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setLocationError("Permiso de ubicación denegado");
          return;
        }

        const location = await Location.getCurrentPositionAsync();
        const { latitude, longitude } = location.coords;

        if (searchCity.length < 1) {
          const response = await axios.get(
            `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&lang=es&key=1da59fc0c9ff4c809b1a952358f6f352`
          );
          
          setLogo(response.data.data[0].weather.icon);
          setType(response.data.data[0].weather.description);
          setTemperature(response.data.data[0].temp);
          setCity(response.data.data[0].city_name);
          
          
          const currentDate = moment().format("YYYY-MM-DD");
          const forecastResponse = await axios.get(
            `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&start_date=${currentDate}&days=30&lang=es&key=1da59fc0c9ff4c809b1a952358f6f352`
          );
          const fData = forecastResponse.data.data.slice(1); // Elimina el primer elemento que corresponde al día actual
          setForcasDate(fData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
      fetchData();
    }, [forecastData]);
  

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://api.weatherbit.io/v2.0/current?city=${searchCity}&lang=es&key=1da59fc0c9ff4c809b1a952358f6f352`
      );
      setLogo(response.data.data[0].weather.icon);
      setType(response.data.data[0].weather.description);
      setTemperature(response.data.data[0].temp);
      setCity(response.data.data[0].city_name);

      const currentDate = moment().format("YYYY-MM-DD");
      const forecastResponse = await axios.get(
        `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchCity}&start_date=${currentDate}&days=30&lang=es&key=1da59fc0c9ff4c809b1a952358f6f352`
      );
      const fData = forecastResponse.data.data.slice(1); // Elimina el primer elemento que corresponde al día actual
      setForcasDate(fData);
    };

    fetchData();
  }, [searchCity]);


  const searchInputRef = useRef(null); // Declarar la referencia al componente TextInput

  const handleRefresh = () => {
    setRefreshing(true);
    

    // Realizar las operaciones de actualización de datos aquí
    // ...

   // Limpiar el campo de entrada al recargar

    setRefreshing(false);
    setSearchCity("")
  };

 
  const newDate = forecastData ? forecastData.map(x => x.precip) : [1];


  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.background} source={{ uri: "https://www.wallpaperuse.com/wallp/36-369447_m.jpg" }}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          }
        >
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{city}</Text>
          </View>
          <View style={styles.weatherContainer}>
            {newDate && newDate.length > 30 && (
              <ActivityIndicator style={styles.loadingIndicator} size="large" color="#0000ff" />
            )}
            <Image style={styles.weatherIcon} source={{ uri: `https://cdn.weatherbit.io/static/img/icons/${logo}.png` }} />
            <Text style={styles.weatherText}>{type}</Text>
            <Text style={styles.weatherText}>{temperature} °C</Text>
          </View>
          {newDate.length === 30 ? (
            <ActivityIndicator style={styles.loadingIndicator} size="large" color="#0000ff" />
          ) : (
            <View style={styles.chartContainer}>
              <Text style={styles.chartHeaderText}>Estadística de lluvia (últimos 30 días)</Text>
              <View style={styles.chart}>
                <LineChart
                  data={{
                    labels: ["10 Dias","15 Dias","20 Dias", "25 Dias", "30 Dias"],
                    datasets: [
                      {
                        data: newDate,
                      },
                    ],
                  }}
                  width={screenWidth - 32}
                  height={200}
                  yAxisLabel="💧"
                  chartConfig={{
                    backgroundColor: "#ffffff",
                    backgroundGradientFrom: "#ffffff",
                    backgroundGradientTo: "#ffffff",
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(26, 61, 157, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(26, 61, 157, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                    propsForDots: {
                      r: "6",
                      strokeWidth: "2",
                      stroke: "#1A3D9D",
                    },
                  }}
                  bezier
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                  }}
                />
              </View>
            </View>
          )}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
                }  
        const styles = StyleSheet.create({
          container: {
            flex: 1,
          },
          scrollViewContent: {
            flexGrow: 1,
            alignItems: "center",
            paddingVertical: 20,
          },
          headerContainer: {
            alignItems: "center",
            marginBottom: 20,
          },
          headerText: {
            fontSize: 20,
            fontWeight: "bold",
          },
          weatherContainer: {
            alignItems: "center",
            marginBottom: 20,
          },
          weatherIcon: {
            width:100,
            height:100,
          },
          weatherText: {
            fontSize: 16,
            marginBottom: 5,
          },
          chartContainer: {
            marginHorizontal: 16,
            marginBottom: 20,
            opacity: 0.8
          },
          chartHeaderText: {
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 10,
            color: "white"
          },
          chart: {
            flexDirection: "row",
            height: 200,
          },

          background:{
            width:"100%",
            height: "100%"
          }
        });
        