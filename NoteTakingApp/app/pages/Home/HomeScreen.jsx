import React, { useState, useEffect, useCallback, memo } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Alert,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getTodos, addTodo } from "../../api.js";
import { STATUS } from "../../constant.js";
import Note from "./components/Note.jsx";

export default memo(function HomeScreen({ fontSize }) {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchTodos = useCallback(async () => {
    try {
      const response = await getTodos();
      if (response.status === STATUS.ERROR) {
        throw new Error("Failed to fetch todos");
      }
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
      Alert.alert("Error", "Failed to fetch todos");
    }
  }, [getTodos]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleAddTodo = useCallback(async () => {
    try {
      const response = await addTodo(title, description);
      if (response.status === STATUS.ERROR) {
        throw new Error("Failed to create todo");
      }
      if (response.message === "Todo created successfully") {
        Alert.alert("Success", "Todo created successfully");
        setTodos((prev) => {
          return [
            ...prev,
            { title, description, id: response.result.insertId },
          ];
        });
        setTitle("");
        setDescription("");
      } else {
        Alert.alert("Error", response.message);
      }
    } catch (error) {
      console.error("Error creating todo:", error);
      Alert.alert("Error", "Failed to create todo");
    }
  }, [title, description, addTodo]);

  const renderItem = useCallback(({ item }) => {
    return <Note item={item} setTodos={setTodos} />;
  }, []);

  const keyExtractor = useCallback((item) => {
    return item.id;
  }, []);

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
      <Text style={[styles.title, getFontSizeStyle()]}>Notes</Text>
      <FlatList
        data={todos}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          style={[styles.textInput, getFontSizeStyle()]}
        />
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          style={[styles.textInput, getFontSizeStyle()]}
        />
        <Button title="Add Note" onPress={handleAddTodo} color="#007bff" />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f8f9fa" },
  title: { fontSize: 28, marginBottom: 16, fontWeight: "bold", color: "#333" },
  listContainer: { flexGrow: 1 },
  inputContainer: { marginBottom: 16 },
  textInput: {
    borderWidth: 1,
    marginBottom: 8,
    padding: 8,
    borderRadius: 4,
    borderColor: "#ccc",
  },
  smallFont: { fontSize: 16 },
  mediumFont: { fontSize: 18 },
  largeFont: { fontSize: 20 },
});
