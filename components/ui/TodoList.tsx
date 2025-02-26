import { CheckIcon } from '@heroicons/react/24/solid';
import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<{ _id: string; text: string; completed: boolean }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Load todos from MongoDB on component mount
  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch('/api/todos');
      const data = await response.json();
      setTodos(data);
    };
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (inputValue.trim()) {
      const newTodo = { text: inputValue, completed: false };
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo),
      });
      const savedTodo = await response.json();
      setTodos([...todos, savedTodo]);
      setInputValue('');
      setErrorMessage('');
    } else {
      setErrorMessage('Please give some input');
    }
  };

  const handleDeleteTodo = async (id: string) => {
    await fetch(`/api/todos?id=${id}`, {
      method: 'DELETE',
    });
    setTodos(todos.filter(todo => todo._id !== id));
  };

  const toggleTodoCompletion = async (index: number) => {
    const todo = todos[index];
    const updatedTodo = { ...todo, completed: !todo.completed };

    // Update the local state
    const updatedTodos = todos.map((t, i) => (i === index ? updatedTodo : t));
    setTodos(updatedTodos);

    // Send the updated status to the server
    await fetch(`/api/todos?id=${todo._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: updatedTodo.completed }),
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold font-poppins text-gray-200 opacity-80 mb-4">To-do List</h2>
    <div className="p-6 bg-[#171819] shadow-xl rounded-xl flex flex-col h-full w-full">
      <div className="flex mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 p-2 border border-gray-600 bg-[#27292af7] rounded focus:outline-none focus:ring-2 focus:ring-white"
          placeholder="Add a new task"
        />
        <button
          onClick={handleAddTodo}
          className="ml-4 bg-white text-[#18191af7] px-4 py-2 rounded hover:opacity-60 transition flex items-center"
        >
          <FaPlus className="text-xl" />
        </button>
      </div>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <ul className="list-disc pl-0 space-y-2">
        {todos.map((todo, index) => (
          <li key={todo._id} className="flex justify-between items-center bg-[#27292af7] p-2 rounded hover:opacity-80 transition">
            <label className="flex items-center">
              <div
                onClick={() => toggleTodoCompletion(index)}
                className={`w-4 h-4 flex items-center justify-center border-2 mr-3 ml-2 cursor-pointer ${todo.completed ? "bg-blue-500 border-blue-500" : "border-white/50"}`}
              >
                {todo.completed && <CheckIcon className="w-3 h-3 text-white" />}
              </div>
              <span className={`text-gray-100 ${todo.completed ? 'line-through' : ''}`}>
                {todo.text}
              </span>
            </label>
            <button
              onClick={() => handleDeleteTodo(todo._id)}
              className="text-gray-400 hover:text-red-500 mr-3"
            >
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default TodoList; 