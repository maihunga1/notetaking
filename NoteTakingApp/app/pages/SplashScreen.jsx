import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const id = setTimeout(() => {
      navigation.replace("Login");
    }, 2000);

    return () => {
      if (id) clearTimeout(id);
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to NoteTakingApp</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
