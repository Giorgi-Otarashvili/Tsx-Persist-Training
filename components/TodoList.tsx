import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { addTodo, removeTodo } from '../features/todos/todosSlice';

const TodoList = () => {
  const [text, setText] = useState('');
  const todos = useSelector((state: RootState) => state.todos.list);
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (text.trim() === '') return;
    dispatch(addTodo(text));
    setText('');
  };

  const handleRemove = (id: string) => {
    dispatch(removeTodo(id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Todo List</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Enter todo"
        />
        <Button title="Add" onPress={handleAdd} />
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text style={styles.todoText}>{item.text}</Text>
            <Button title="X" onPress={() => handleRemove(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  inputContainer: { flexDirection: 'row', marginBottom: 20 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  todoText: { fontSize: 18 },
});

export default TodoList;
