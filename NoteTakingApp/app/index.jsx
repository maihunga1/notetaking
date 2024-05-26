import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  LoginScreen,
  RegisterScreen,
  SplashScreen,
  HomeScreen,
  AboutScreen,
  SettingScreen,
} from "./pages";

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = ({ fontSize, setFontSize }) => (
  <BottomTab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        switch (route.name) {
          case "Home":
            iconName = focused ? "home" : "home-outline";
            break;
          case "About":
            iconName = focused
              ? "information-circle"
              : "information-circle-outline";
            break;
          case "Settings":
            iconName = focused ? "settings" : "settings-outline";
            break;
          default:
            break;
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: "tomato",
      inactiveTintColor: "gray",
    }}
  >
    <BottomTab.Screen name="Home" options={{ headerShown: false }}>
      {(props) => <HomeScreen {...props} fontSize={fontSize} />}
    </BottomTab.Screen>
    <BottomTab.Screen name="About" options={{ headerShown: false }}>
      {(props) => <AboutScreen {...props} fontSize={fontSize} />}
    </BottomTab.Screen>
    <BottomTab.Screen name="Settings" options={{ headerShown: false }}>
      {(props) => (
        <SettingScreen
          {...props}
          fontSize={fontSize}
          setFontSize={setFontSize}
        />
      )}
    </BottomTab.Screen>
  </BottomTab.Navigator>
);

const RootNavigator = ({ fontSize, setFontSize }) => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Register"
      component={RegisterScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="BottomTab" options={{ headerShown: false }}>
      {(props) => (
        <BottomTabNavigator
          {...props}
          fontSize={fontSize}
          setFontSize={setFontSize}
        />
      )}
    </Stack.Screen>
  </Stack.Navigator>
);

export default function Index() {
  const [fontSize, setFontSize] = useState("medium");

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedFontSize = await AsyncStorage.getItem("fontSize");
        if (savedFontSize) {
          setFontSize(savedFontSize);
        }
      } catch (e) {
        console.error("Failed to load settings.", e);
      }
    };

    loadSettings();
  }, []);

  const saveFontSize = async (newFontSize) => {
    try {
      await AsyncStorage.setItem("fontSize", newFontSize);
      setFontSize(newFontSize);
    } catch (e) {
      console.error("Failed to save settings.", e);
    }
  };

  return (
    <NavigationContainer independent={true}>
      <RootNavigator fontSize={fontSize} setFontSize={saveFontSize} />
    </NavigationContainer>
  );
}
