import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State to store the to-do items
  const [todos, setTodos] = useState([]);
  // State to handle new to-do input
  const [newTodo, setNewTodo] = useState('');

  // Fetch data from the API when the component mounts
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  // Function to add a new to-do
  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      const newTodoItem = {
        userId: 1,
        id: todos.length + 1,
        title: newTodo,
        completed: false,
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
    }
  };

  // Function to delete a to-do
  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  // Function to update a to-do
  const handleUpdateTodo = (id, newTitle) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title: newTitle } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <input
        type="text"
        placeholder="Add a new todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button className='addbutton' onClick={handleAddTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}
            <div className='updateButton'>
              <div className='button11'>
                <button onClick={() => handleUpdateTodo(todo.id, prompt('Update Todo:', todo.title))}> Update</button>
              </div>
              <div className='button22'>
                <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
              </div>
            </div>

          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;