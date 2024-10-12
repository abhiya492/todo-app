import { useState } from "react";
import PropTypes from 'prop-types';

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Go to gym",
      description: "Go to gym from 7-9",
      completed: false,
    },
    {
      id: 2,
      title: "Study DSA",
      description: "Study DSA form 9-100",
      completed: true,
    },
  ]);

  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
  });

  const [filter, setFilter] = useState("");

  function addTodo() {
    const newTodoItem = {
      id: todos.length + 1,
      title: newTodo.title,
      description: newTodo.description,
      completed: false,
    };
    setTodos([...todos, newTodoItem]);
    setNewTodo({ title: "", description: "" });
  }

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function editTodo(id, title, description) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, title, description } : todo
      )
    );
  }

  function toggleCompleted(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function handleFilterChange(event) {
    setFilter(event.target.value);
  }

  function filteredTodos() {
    return todos.filter((todo) => {
      const titleMatch = todo.title.toLowerCase().includes(filter.toLowerCase());
      const descriptionMatch = todo.description
        .toLowerCase()
        .includes(filter.toLowerCase());
      return titleMatch || descriptionMatch;
    });
  }

  return (
    <div className="app">
      <h1>Todo App</h1>
      <form>
        <input
          type="text"
          value={newTodo.title}
          onChange={(event) =>
            setNewTodo({ ...newTodo, title: event.target.value })
          }
          placeholder="Enter new todo title"
        />
        <input
          type="text"
          value={newTodo.description}
          onChange={(event) =>
            setNewTodo({ ...newTodo, description: event.target.value })
          }
          placeholder="Enter new todo description"
        />
        <button onClick={addTodo}>Add Todo</button>
      </form>
      <input
        type="text"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Filter todos"
      />
      <ul>
        {filteredTodos().map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onDelete={() => deleteTodo(todo.id)}
            onEdit={(title, description) => editTodo(todo.id, title, description)}
            onToggleCompleted={() => toggleCompleted(todo.id)}
          />
        ))}
      </ul>
    </div>
  );
}

function Todo({ todo, onDelete, onEdit, onToggleCompleted }) {
  return (
    <li>
      <h1>{todo.title}</h1>
      <h2>{todo.description}</h2>
      <p>Completed: {todo.completed ? "Yes" : "No"}</p>
      <button onClick={onDelete}>Delete</button>
      <button onClick={onToggleCompleted}>
        {todo.completed ? "Mark as incomplete" : "Mark as complete"}
      </button>
      <button onClick={() => onEdit(todo.title, todo.description)}>Edit</button>
    </li>
  );
}

Todo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
};

export default App;