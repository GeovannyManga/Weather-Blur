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

export default function Profile() {

  


  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.background} source={{ uri: "https://www.wallpaperuse.com/wallp/36-369447_m.jpg" }}>
        <ImageBackground style={styles.headerContainer}></ImageBackground>
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
            marginTop: 100,
            borderRadius: 100,
            width: 200,
            height:200,
             backgroundColor: "red",
             marginRight: "auto", 
             marginLeft: "auto"
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
        