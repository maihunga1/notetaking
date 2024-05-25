import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./SplashScreen.js";
import Login from "./login.js";
import SignupScreen from "./RegisterScreen.js";
import Home from "./home.js";
// import AboutScreen from "./About";
// import SettingsScreen from "./Settings";

const Stack = createStackNavigator();

export default function Index() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component={Home} />
        {/* <Stack.Screen name="About" component={AboutScreen} /> */}
        {/* <Stack.Screen name="Settings" component={SettingsScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const Index = () => {
//   const [appIsReady, setAppIsReady] = useState(false);
//   const navigation = useNavigation();

//   useEffect(() => {
//     async function prepare() {
//       try {
//         // Your app initialization code here
//       } catch (e) {
//         console.warn(e);
//       } finally {
//         setAppIsReady(true);
//       }
//     }

//     prepare();
//   }, []);

//   useEffect(() => {
//     if (appIsReady) {
//       navigation.navigate("login");
//     }
//   }, [appIsReady]);

//   return (
//     <View
//       style={{
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "center",
//         width: "100%",
//       }}
//     >
//       <Text>Loading...</Text>
//     </View>
//   );
// };

// export default Index;
