import { StatusBar } from "react-native";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Welcome() {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("home"); // Reemplaza "OtroComponente" con el nombre del componente al que deseas redirigir
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ImageBackground
        source={{
          uri: "https://www.wallpaperuse.com/wallp/36-369447_m.jpg",
        }}
        style={styles.imageBackground}
      >
        {/* Aquí puedes agregar el contenido que deseas mostrar sobre la imagen de fondo */}
        <Text style={styles.text}>¡Bienvenido!</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Name"
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
          ></TextInput>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            secureTextEntry={true}
          ></TextInput>
        </View>
        <TouchableOpacity
          style={[styles.buttonContainer, { backgroundColor: "rgba(0, 128, 128, 0.4)" }]}
          onPress={handlePress}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    paddingBottom: 60,
  },
  inputContainer: {
    width: "80%",
    marginBottom: 30,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 10,
  },
  textInput: {
    width: "100%",
    minHeight: 50,
    fontSize: 20,
    paddingLeft: 10,
    color: "white",
  },
  buttonContainer: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});
