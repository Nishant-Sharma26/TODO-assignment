import { useState, useEffect } from 'react';
import axios from 'axios';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/todos');
      setTodos(response.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const toggleComplete = async (id) => {
    setLoading(true);
    try {
      const response = await axios.put(`http://localhost:5000/todos/${id}`);
      setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const deleteTodo = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true;
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Task List</h2>

    
      <div className="flex justify-between mb-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-md ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-3 py-1 rounded-md ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-3 py-1 rounded-md ${filter === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Pending
        </button>
      </div>


      {loading ? (
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
        </div>
      ) : (
        <ul className="space-y-2">
          {filteredTodos.length === 0 ? (
            <p className="text-gray-500 text-center">No tasks available</p>
          ) : (
            filteredTodos.map(todo => (
              <li
                key={todo._id}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
              >
                <span
                  className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}
                >
                  {todo.title}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => toggleComplete(todo._id)}
                    className="px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                    disabled={loading}
                  >
                    {todo.completed ? 'Undo' : 'Complete'}
                  </button>
                  <button
                    onClick={() => deleteTodo(todo._id)}
                    className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                    disabled={loading}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export default TodoList;