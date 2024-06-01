import React, { useState, useEffect, useCallback, memo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { getTodos, addTodo } from "../../api.js";
import { STATUS } from "../../constant.js";
import Note from "./components/Note.jsx";

const HomeScreen = memo(({ fontSize }) => {
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
  }, []);

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
        setTodos((prev) => [
          ...prev,
          { title, description, id: response.result.insertId },
        ]);
        setTitle("");
        setDescription("");
      } else {
        Alert.alert("Error", response.message);
      }
    } catch (error) {
      console.error("Error creating todo:", error);
      Alert.alert("Error", "Failed to create todo");
    }
  }, [title, description]);

  const renderItem = useCallback(
    ({ item }) => {
      return <Note item={item} setTodos={setTodos} fontSize={fontSize} />;
    },
    [setTodos, fontSize]
  );

  const keyExtractor = useCallback((item) => item.id.toString(), []);

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
        <TouchableOpacity onPress={handleAddTodo} style={styles.button}>
          <Text style={[styles.buttonText, getFontSizeStyle()]}>Add Note</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f8f9fa" },
  title: { fontSize: 28, marginBottom: 16, fontWeight: "bold", color: "#333" },
  listContainer: { flexGrow: 1 },
  inputContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 16,
  },
  textInput: {
    borderWidth: 1,
    marginBottom: 8,
    padding: 12,
    borderRadius: 5,
    borderColor: "#ccc",
  },
  button: {
    backgroundColor: "tomato",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  smallFont: { fontSize: 16 },
  mediumFont: { fontSize: 18 },
  largeFont: { fontSize: 20 },
});

export default HomeScreen;
