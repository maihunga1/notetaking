import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, Button, FlatList, Alert } from "react-native";
import { getTodos, addTodo } from "./api.js";
import { STATUS } from "./constant.js";

function Home() {
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

  const handleAddTodo = async () => {
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
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Notes</Text>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 8,
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
            }}
          >
            <Text style={{ fontSize: 18 }}>{item.title}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, marginBottom: 8, padding: 8 }}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={{ borderWidth: 1, marginBottom: 8, padding: 8 }}
      />
      <Button title="Add Note" onPress={handleAddTodo} />
    </View>
  );
}

export default Home;
