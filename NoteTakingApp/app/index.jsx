import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
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

const BottomTabNavigator = () => (
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
    <BottomTab.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <BottomTab.Screen
      name="About"
      component={AboutScreen}
      options={{ headerShown: false }}
    />
    <BottomTab.Screen
      name="Settings"
      component={SettingScreen}
      options={{ headerShown: false }}
    />
  </BottomTab.Navigator>
);

const RootNavigator = () => (
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
    <Stack.Screen
      name="BottomTab"
      component={BottomTabNavigator}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default function Index() {
  return (
    <NavigationContainer independent={true}>
      <RootNavigator />
    </NavigationContainer>
  );
}
