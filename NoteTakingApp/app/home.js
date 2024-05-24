import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, Alert } from "react-native";
import { getTodos, addTodo } from "./api.js";

function Home() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await getTodos();
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }
      const jsonData = await response.json();
      setTodos(jsonData);
    } catch (error) {
      console.error("Error fetching todos:", error);
      Alert.alert("Error", "Failed to fetch todos");
    }
  };

  const handleAddTodo = async () => {
    try {
      const response = await addTodo(title, description);
      if (!response.ok) {
        throw new Error("Failed to create todo");
      }
      const jsonData = await response.json();
      if (jsonData.message === "Todo created successfully") {
        Alert.alert("Success", "Todo created successfully");
        fetchTodos();
        setTitle("");
        setDescription("");
      } else {
        Alert.alert("Error", jsonData.message);
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
