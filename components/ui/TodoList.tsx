import { CheckIcon } from '@heroicons/react/24/solid';
import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<{ text: string; completed: boolean }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Load todos from localStorage on component mount
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

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
    <div className=" ml-[75px] p-6 bg-[#18191af7] shadow-xl rounded-xl font-poppins 
    min-h-[175px] max-h-[450px] w-[555px] overflow-y-auto ">
      <h2 className="text-lg font-semibold text-gray-300 mb-4">To-do List</h2>
      <div className="flex mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 p-2 border border-gray-600 bg-[#27292af7] rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <li key={index} className="flex justify-between items-center bg-[#27292af7] p-2 rounded">
            <label className="flex items-center">
              <div
                onClick={() => toggleTodoCompletion(index)}
                className={`w-4 h-4 flex items-center justify-center border-2 rounded mr-3 ml-2 cursor-pointer ${todo.completed ? "bg-blue-500 border-blue-500" : "border-white/50"}`}
              >
                {todo.completed && <CheckIcon className="w-3 h-3 text-white " />}
              </div>
              <span className={`text-gray-100 ${todo.completed ? 'line-through' : ''}`}>
                {todo.text}
              </span>
            </label>
            <button
              onClick={() => handleDeleteTodo(index)}
              className="text-gray-400 hover:text-red-500 mr-3"
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