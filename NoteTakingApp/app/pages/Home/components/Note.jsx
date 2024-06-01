import React, { memo, useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { editTodo, deleteTodo } from "../../../api";
import { STATUS } from "../../../constant";

export default memo(function Note({ setTodos, item, fontSize }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);

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

  const onPressDeleteTodo = useCallback(async () => {
    const result = await deleteTodo(item.id);

    if (result.status === STATUS.SUCCESS) {
      setTodos((prev) => {
        return prev.filter((todo) => todo.id !== item.id);
      });
      alert("Deleted successfully");
    } else {
      alert("Failed to delete note");
    }
  }, [setTodos, item]);

  const onPressEditTodo = useCallback(async () => {
    const result = await editTodo(item.id, title, description);

    if (result.status === STATUS.SUCCESS) {
      setTodos((prev) => {
        return prev.map((todo) => {
          if (todo.id === item.id) {
            return { title, description, id: item.id };
          }
          return todo;
        });
      });
      setModalOpen(false);
      alert("Edited successfully");
    } else {
      alert("Failed to edit todo");
    }
  }, [setTodos, item, title, description]);

  const openEditModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  return (
    <>
      <Modal visible={modalOpen} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Note</Text>
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

            <TouchableOpacity onPress={onPressEditTodo} style={styles.button}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalOpen(false)}
              style={[styles.button, styles.cancelButton]}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.noteContainer}>
        <Text style={[styles.title, getFontSizeStyle()]}>{item.title}</Text>
        <Text style={getFontSizeStyle()}>{item.description}</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={openEditModal} style={styles.actionButton}>
            <Text style={[styles.actionButtonText, getFontSizeStyle()]}>
              Edit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressDeleteTodo}
            style={[styles.actionButton, styles.deleteButton]}
          >
            <Text style={[styles.actionButtonText, getFontSizeStyle()]}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  noteContainer: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  title: {
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 8,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "tomato",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: "gray",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: "tomato",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "red",
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  smallFont: { fontSize: 16 },
  mediumFont: { fontSize: 18 },
  largeFont: { fontSize: 20 },
});
