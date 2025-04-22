import { useState } from 'react';
import axios from 'axios';

function AddTodo() {
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(false);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/todos', { title: newTodo });
      setNewTodo('');
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new task"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 rounded-md text-white ${
            loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
              Adding...
            </div>
          ) : (
            'Add Task'
          )}
        </button>
      </form>
    </div>
  );
}

export default AddTodo;