import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingsScreen = () => {
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

  const saveSettings = async (newFontSize) => {
    try {
      await AsyncStorage.setItem("fontSize", newFontSize);
      setFontSize(newFontSize);
    } catch (e) {
      console.error("Failed to save settings.", e);
    }
  };

  const getFontSizeStyle = () => {
    switch (fontSize) {
      case "small":
        return styles.smallFont;
      case "large":
        return styles.largeFont;
      default:
        return styles.mediumFont;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <Text style={styles.label}>Font Size</Text>
      <Picker
        selectedValue={fontSize}
        onValueChange={(itemValue) => saveSettings(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Small" value="small" />
        <Picker.Item label="Medium" value="medium" />
        <Picker.Item label="Large" value="large" />
      </Picker>
      <Text style={[styles.previewText, getFontSizeStyle()]}>
        This is a preview text.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  picker: {
    height: 50,
    width: 150,
  },
  smallFont: { fontSize: 16 },
  mediumFont: { fontSize: 18 },
  largeFont: { fontSize: 20 },
  previewText: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default SettingsScreen;
