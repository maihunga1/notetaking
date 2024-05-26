import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import licenses from "../../licenses.json"; // Ensure this path is correct

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>About This App</Text>
      <Text style={styles.description}>
        This application is a note-taking app designed to help you organize your
        thoughts and tasks efficiently. It is built using React Native and
        incorporates several modern technologies to provide a seamless user
        experience.
      </Text>
      <Text style={styles.header}>Open Source Licenses</Text>
      {Object.keys(licenses).map((key) => (
        <View key={key} style={styles.licenseContainer}>
          <Text style={styles.licenseName}>{key}</Text>
          <Text style={styles.licenseText}>{licenses[key].licenses}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

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
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  licenseContainer: {
    marginBottom: 16,
  },
  licenseName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  licenseText: {
    fontSize: 14,
    color: "#555",
  },
});
