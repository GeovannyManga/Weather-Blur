import React, { useEffect, useState ,useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, ScrollView, RefreshControl } from "react-native";
import { BlurView } from "@react-native-community/blur";
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import * as Location from "expo-location";
import Carousel from "react-native-snap-carousel";
import moment from "moment";
import "moment/locale/es";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Home() {

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

  

  const handleSearchCity = (city) => {
    setSearchCity(city);
  };

 
  useEffect(() => {
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
            `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&start_date=${currentDate}&days=6&lang=es&key=1da59fc0c9ff4c809b1a952358f6f352`
          );
          const fData = forecastResponse.data.data.slice(1); // Elimina el primer elemento que corresponde al día actual
          setForcasDate(fData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [searchCity.length === 0, refreshing=== true]);

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
        `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchCity}&start_date=${currentDate}&days=6&lang=es&key=1da59fc0c9ff4c809b1a952358f6f352`
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

    searchInputRef.current.clear(); // Limpiar el campo de entrada al recargar

    setRefreshing(false);
    setSearchCity("")
  };

  return (
    <ImageBackground
      source={{
        uri: "https://www.wallpaperuse.com/wallp/36-369447_m.jpg",
      }}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardShouldPersistTaps="handled" // Evita que el teclado cierre el teclado al tocar fuera de él
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          <View style={styles.inputContainer}>
            <TextInput
             ref={searchInputRef}
              style={styles.input}
              placeholder="Buscar ciudad"
              onSubmitEditing={(event) =>
                handleSearchCity(event.nativeEvent.text)
              }
            />
            <View style={styles.searchIconContainer}>
              <Icon
                name="search"
                size={20}
                color="#777"
                style={styles.searchIcon}
              />
            </View>
          </View>
          <View style={styles.overlay}>
            <View style={styles.circle}>
              <ImageBackground
                source={{
                  uri: "https://assets.stickpng.com/images/580b585b2edbce24c47b2738.png",
                }}
                style={styles.backCircle}
              >
                <Text style={styles.city}>{city}</Text>
                <Text style={styles.temp}>{temperature}°</Text>
                <Image
                  style={styles.icon}
                  source={{
                    uri: `https://cdn.weatherbit.io/static/img/icons/${logo}.png`,
                  }}
                />
                <Text style={styles.Text}>{type}</Text>
              </ImageBackground>
            </View>
            <Text style={styles.nextDay}>Proximos 6 dias</Text>
            <View style={styles.forecastContainer}>
              <Carousel
                data={forecastData}
                renderItem={({ item, index }) => (
                  <View style={[styles.forecastCard]}>
                    <ImageBackground
                      source={{
                        uri: "https://assets.stickpng.com/images/580b585b2edbce24c47b2738.png",
                      }}
                      style={styles.cardBackground}
                    >
                      <Text style={styles.forecastDate}>
                        {moment(item.datetime).format("dddd")}
                      </Text>
                      <Image
                        style={styles.forecastIcon}
                        source={{
                          uri: `https://cdn.weatherbit.io/static/img/icons/${item.weather.icon}.png`,
                        }}
                      />
                      <Text style={styles.forecastTemperature}>
                        {item.temp}°
                      </Text>
                      <Text style={styles.forecastDescription}>
                        {item.weather.description}
                      </Text>
                    </ImageBackground>
                  </View>
                )}
                sliderWidth={screenWidth}
                itemWidth={screenWidth - 60} // Ajusta el valor según sea necesario para el espaciado deseado entre las tarjetas
                contentContainerCustomStyle={styles.carouselContentContainer} // Agrega este estilo personalizado
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backCircle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center", // Agrega esta línea para centrar horizontalmente el contenido
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0)",
    justifyContent: "center",
    alignItems: "center",
  },

  scrollContainer: {
    flexGrow: 1,
  },

  textCircule: {
    color: "black",
    fontSize: 18,
  },

 
  circle: {
      height: "45%",
      width: "90%",
      justifyContent: "center",
      borderRadius: 20,
      opacity: 0.6,
      shadowColor: "#000",
      shadowOpacity: 0.8,
      shadowRadius: 10,
      shadowOffset: {
        width: 0,
        height: 4,
        marginTop: 5,
      },
      elevation: 8,
      overflow: "hidden",
      zIndex: 1,
      position: "relative",
      backgroundColor: 'rgba(255, 255, 255, 0.4)', // Fondo blanco con opacidad baja (0.5)
      backdropFilter: 'blur(40px)',
    },
    

  nextDay: {
    fontSize: 24,
    marginRight: "40%",
    fontWeight: "bold",
    color: "white",
  },

  icon: {
    width: 50,
    height: 50,
    marginLeft: "auto",
    marginRight: "auto",
    opacity: 1,
  },
  Text: {
    fontSize: 20,
    marginLeft: "auto",
    marginRight: "auto",
  },
  temp: {
    fontSize: 60,
    marginLeft: "auto",
    marginRight: "auto",
  },
  city: {
    fontSize: 30,
    marginLeft: "auto",
    marginRight: "auto",
  },
 
  forecastContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    borderRadius: 10,
    marginTop: 10,
    height: 220,
    width: "100%",
    height: "40%",
  },
  forecastCard: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    opacity: 0.7,
    width: Dimensions.get("window").width - 80, // Ancho de las tarjetas ajustado según el tamaño de la pantalla
    marginHorizontal: 10, // Espacio horizontal entre las tarjetas
    backgroundColor: 'rgba(128, 128, 128, 0.5)', // Fondo blanco con opacidad baja (0.5)
    backdropFilter: 'blur(40px)',
  },
  forecastDate: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white"
  },
  forecastIcon: {
    width: 60,
    height: 60,
  },
  forecastTemperature: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white"
  },
  forecastDescription: {
    fontSize: 20,
    color:"white"
  },


  inputContainer: {
    position: "relative",
    width: "100%",
    height: 40,
    marginBottom: 10,
    marginTop: 20,
  },
  input: {
    zIndex: 2,
    width: "98%",
    height: "100%",
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingLeft: 10,
    marginLeft: "auto",
    marginRight: "auto",
    fontWeight: "bold",
    fontSize: 20,
  },
  searchIconContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    zIndex:100
  },
  searchIcon: {
    alignSelf: "center",
  },
  carouselContentContainer: {
    alignItems: "center",
  },

  cardBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%", // Ajusta el ancho del fondo de la tarjeta al 100%
  },


});
