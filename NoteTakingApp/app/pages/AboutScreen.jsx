import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from "react-native";
import licenses from "../../licenses.json";

export default function AboutScreen({ fontSize }) {
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
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={[styles.header, getFontSizeStyle()]}>About This App</Text>
        <Text style={[styles.description, getFontSizeStyle()]}>
          This application is a note-taking app designed to help you organize
          your thoughts and tasks efficiently. It is built using React Native
          and incorporates several modern technologies to provide a seamless
          user experience.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={[styles.header, getFontSizeStyle()]}>
          Open Source Licenses
        </Text>
        {Object.keys(licenses).map((key) => (
          <View key={key} style={styles.licenseContainer}>
            <Text style={[styles.licenseName, getFontSizeStyle()]}>{key}</Text>
            <Text style={[styles.licenseText, getFontSizeStyle()]}>
              {licenses[key].licenses}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  section: {
    marginBottom: 24,
  },
  header: {
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
    fontSize: 24,
  },
  description: {
    marginBottom: 16,
    color: "#555",
    fontSize: 18,
  },
  licenseContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 16,
  },
  licenseName: {
    fontWeight: "bold",
    color: "#333",
    fontSize: 20,
  },
  licenseText: {
    color: "#555",
    fontSize: 16,
  },
  smallFont: { fontSize: 16 },
  mediumFont: { fontSize: 18 },
  largeFont: { fontSize: 20 },
});
