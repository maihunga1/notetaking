import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Appearance,
  Button,
  useColorScheme,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function SettingsScreen({ fontSize, setFontSize }) {
  const getFontSizeStyle = useCallback(() => {
    switch (fontSize) {
      case "small":
        return styles.smallFont;
      case "large":
        return styles.largeFont;
      default:
        return styles.mediumFont;
    }
  }, [fontSize, styles]);

  return (
    <View style={styles.container}>
      <Text style={[styles.header, getFontSizeStyle()]}>Settings</Text>
      <Text style={[styles.label, getFontSizeStyle()]}>Font Size</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={fontSize}
          onValueChange={(itemValue) => setFontSize(itemValue)}
          style={[styles.picker]}
          itemStyle={styles.pickerItem}
        >
          <Picker.Item label="Small" value="small" />
          <Picker.Item label="Medium" value="medium" />
          <Picker.Item label="Large" value="large" />
        </Picker>
      </View>
      <Text style={[styles.previewText, getFontSizeStyle()]}>
        This is a preview text.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f2f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 18,
    color: "#666",
    marginBottom: 10,
    textAlign: "center",
  },
  pickerContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 20,
    overflow: "hidden",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  pickerItem: {
    fontSize: 16,
    color: "#333",
  },
  smallFont: { fontSize: 16 },
  mediumFont: { fontSize: 18 },
  largeFont: { fontSize: 20 },
  previewText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
});
