import {
  View,
  Text,
  StyleSheet,
  Button,
  Pressable,
  Modal,
  TextInput,
} from "react-native";
import { memo, useCallback, useState } from "react";
import { editTodo, deleteTodo } from "../../../api";
import { STATUS } from "../../../constant";

// export default memo(function Note({ item }) {
//   const onPressEditTodo = useCallback(async () => {
//     const { id, title, description } = item;

//     const result = await editTodo(id, title, description);
//   }, []);

export default memo(function Note({ setTodos, item }) {
  const [modalOpen, setModalOpen] = useState(false);

  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);

  const onPressDeleteTodo = useCallback(async () => {
    const result = await deleteTodo(item.id);

    if (result.status === STATUS.SUCCESS) {
      setTodos((prev) => {
        return prev.filter((todo) => todo.id !== item.id);
      });
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
    }

    setModalOpen(false);
  }, [setTodos, item, title, description, setModalOpen, editTodo]);

  const openEditModal = useCallback(() => {
    setModalOpen(true);
  }, [setModalOpen]);

  return (
    <>
      <Modal visible={modalOpen}>
        <View style={style.modalContent}>
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

          <Pressable onPress={onPressEditTodo}>
            <Text>Edit</Text>
          </Pressable>
        </View>
      </Modal>
      <View style={style.noteContainer}>
        <Text style={style.title}>{item.title}</Text>
        <Text>{item.description}</Text>

        <Pressable onPress={openEditModal}>
          <Text>Edit</Text>
        </Pressable>
        <Pressable onPress={onPressDeleteTodo}>
          <Text>Delete</Text>
        </Pressable>
      </View>
    </>
  );
});

const style = StyleSheet.create({
  noteContainer: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 18,
  },
  modalContent: {
    height: 200,
  },
  textInput: { borderWidth: 1, marginBottom: 8, padding: 8 },
});
