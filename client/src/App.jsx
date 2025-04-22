import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
     
        <nav className="bg-blue-600 p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-white text-2xl font-bold">To-Do Manager</h1>
            <div className="space-x-4">
              <Link
                to="/"
                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md"
              >
                Add Task
              </Link>
              <Link
                to="/todos"
                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md"
              >
                View Tasks
              </Link>
            </div>
          </div>
        </nav>

        
        <div className="container mx-auto mt-6">
          <Routes>
            <Route path="/" element={<AddTodo />} />
            <Route path="/todos" element={<TodoList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;