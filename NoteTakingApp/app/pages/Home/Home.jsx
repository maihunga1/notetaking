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
import { getTodos, addTodo } from "../../api.js";
import { STATUS } from "../../constant.js";
import Note from "./components/Note.jsx";

export default memo(function Home() {
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
    return <Note item={item} setTodos={setTodos}/>;
  }, []);

  const keyExtractor = useCallback((item) => {
    return item.id;
  }, []);

  return (
    <View style={style.container}>
      <Text style={style.title}>Notes</Text>
      <FlatList
        data={todos}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={style.textInput}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={style.textInput}
      />
      <Button title="Add Note" onPress={handleAddTodo} />
    </View>
  );
});

const style = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, marginBottom: 16 },
  textInput: { borderWidth: 1, marginBottom: 8, padding: 8 },
});
