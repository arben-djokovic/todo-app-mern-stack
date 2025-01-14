import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.js";
import { ToastContainer } from 'react-toastify';
import CreateTodo from "./pages/TodoForm/CreateTodo.js";
import EditTodo from "./pages/TodoForm/EditTodo.js";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateTodo />} />
          <Route path="/edit/:id" element={<EditTodo />} />
        </Routes>
      </BrowserRouter>
      
      <ToastContainer />
    </div>
  );
}

export default App;
