import { CheckIcon } from '@heroicons/react/24/solid';
import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { RiDeleteBinLine } from "react-icons/ri";

interface Todo {
  _id: string;
  text: string;
  completed: boolean;
}

type FilterType = 'All' | 'Pending' | 'Done';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>('Pending'); // Changed default filter to 'Pending'

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
    setShowConfirmation(false);
    setTodoToDelete(null);
  };

  const toggleTodoCompletion = async (id: string) => {
    // Find the todo by id instead of index
    const todoToUpdate = todos.find(todo => todo._id === id);
    
    if (!todoToUpdate) return;

    const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };

    // Update the local state
    const updatedTodos = todos.map(todo => 
      todo._id === id ? updatedTodo : todo
    );
    setTodos(updatedTodos);

    // Send the updated status to the server
    await fetch(`/api/todos?id=${id}`, {
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

  const confirmDeleteTodo = (id: string) => {
    setTodoToDelete(id);
    setShowConfirmation(true);
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
    setTodoToDelete(null);
  };

  // Calculate filtered todos and counts
  const allTodosCount = todos.length;
  const pendingTodosCount = todos.filter(todo => !todo.completed).length;
  const doneTodosCount = todos.filter(todo => todo.completed).length;

  // Filter todos based on selected filter
  const filteredTodos = todos.filter(todo => {
    if (filter === 'Pending') return !todo.completed;
    if (filter === 'Done') return todo.completed;
    return true;
  });

  return (
    <div>
      <h2 className="text-md md:text-lg lg:text-lg font-semibold font-poppins text-gray-200 opacity-80 mb-4">To-do List</h2>
      
      <div className="p-6 bg-[#171819] shadow-xl rounded-xl flex flex-col h-full w-full">
        <div className="flex mb-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 p-2 border border-white/30 bg-[#27292af7] w-[90%]
            font-poppins rounded focus:outline-none focus:ring-2 focus:ring-white"
            placeholder="Add a new task"
          />
          <button
            onClick={handleAddTodo}
            className="ml-4 bg-white text-[#18191af7] px-4 py-2 rounded 
            font-poppins hover:opacity-60 transition flex items-center"
          >
            <FaPlus className="text-xl" />
          </button>
        </div>
        
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        
        {/* Filters */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            {(['All', 'Pending', 'Done'] as FilterType[]).map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-2.5 py-1.5 rounded-md font-poppins text-xs 
                  ${filter === filterType 
                    ? 'bg-white text-[#18191af7]' 
                    : 'bg-[#27292af7] text-gray-300 hover:bg-[#35373a]'}`}
              >
                {filterType} ({
                  filterType === 'All' ? allTodosCount :
                  filterType === 'Pending' ? pendingTodosCount :
                  doneTodosCount
                })
              </button>
            ))}
          </div>
        </div>
        
        {filteredTodos.length === 0 ? (
          <p className="text-gray-400 text-center py-4">No todos in this filter</p>
        ) : (
          <ul className="list-disc pl-0 space-y-2">
            {filteredTodos.map((todo) => (
              <li key={todo._id} className="flex justify-between items-center bg-[#27292af7]
              p-2 rounded hover:opacity-80 transition">
                <label
                  onClick={() => toggleTodoCompletion(todo._id)}
                  className="flex items-center cursor-pointer">
                  <div
                    className={`w-4 h-4 flex items-center justify-center border-2 mr-3 ml-2
                      font-poppins rounded-lg p-[1px] cursor-pointer ${todo.completed ? "bg-blue-500 border-blue-500" : "border-white/50"}`}
                  >
                    {todo.completed && <CheckIcon className="w-4 h-4 text-white " />}
                  </div>
                  <span className={`text-gray-100 text-sm p-1 font-poppins ${todo.completed ? 'line-through' : ''}`}>
                    {todo.text}
                  </span>
                </label>
                <button
                  onClick={() => confirmDeleteTodo(todo._id)}
                  className="text-gray-400 hover:text-red-500 font-poppins mr-3"
                >
                  <RiDeleteBinLine />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/75 z-50 flex items-center justify-center">
            <div className="w-full max-w-md p-6 m-7 bg-[#17181a] border border-white/30 rounded-2xl shadow-xl relative font-poppins">
            <p className="mb-4 text-lg md:xl lg:xl">Are you sure you want to delete this to-do?</p>
            <div className="flex justify-center md:justify-end lg:justify-end gap-4">
              <button
                onClick={cancelDelete}
                className="px-3 py-2 rounded-md bg-transparent border font-poppins border-[#333437] hover:bg-[#27292af7] hover:border-white/40 text-white"
                >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteTodo(todoToDelete!)}
                className="px-3 py-2 rounded-md font-poppins font-semibold bg-red-600 hover:bg-red-700 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;