import React, { useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<{ text: string; completed: boolean }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, { text: inputValue, completed: false }]);
      setInputValue('');
      setErrorMessage('');
    } else {
      setErrorMessage('Please give some input');
    }
  };

  const handleDeleteTodo = (index: number) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const toggleTodoCompletion = (index: number) => {
    const newTodos = todos.map((todo, i) => 
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  return (
    <div className="p-6 bg-gray-800 shadow-lg rounded-lg">
      <h2 className="text-lg font-semibold text-gray-300 mb-4">TODO List</h2>
      <div className="flex mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 p-2 border border-gray-600 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add a new task"
        />
        <button
          onClick={handleAddTodo}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition flex items-center"
        >
          <FaPlus className="mr-1" />
        </button>
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <ul className="list-disc pl-0 space-y-2">
        {todos.map((todo, index) => (
          <li key={index} className="flex justify-between items-center bg-gray-700 p-2 rounded">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodoCompletion(index)}
                className="mr-2"
              />
              <span className={`text-gray-100 ${todo.completed ? 'line-through' : ''}`}>
                {todo.text}
              </span>
            </label>
            <button
              onClick={() => handleDeleteTodo(index)}
              className="text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList; 