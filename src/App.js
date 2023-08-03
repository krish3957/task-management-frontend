import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Home from './pages/Home';
import newTask from './pages/newTask';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/tasks';


function App() {
  const User = useSelector(state=>state.user.currentUser);
  return (
    <Router>
        <Routes>
          <Route path='/' Component={Home}/>
          <Route path='/add' Component={newTask}/>
          <Route path="/login" element={User ? <Navigate to={"/"}/> : <Login/> } />
          <Route path="/register" element={User ? <Navigate to={"/"}/> : <Register/> } />
          <Route path="/tasks/:id" element={User ? <Tasks/> : <Navigate to={"/login"}/> } />
          </Routes>
      </Router>
  );
}

export default App;
