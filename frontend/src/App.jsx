
import HomePage from "./pages/HomePage.jsx";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Machine from "./pages/Machine copy.jsx";
import ProtectedRoute from './components/ProtectedRoute';
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import 'react-datepicker/dist/react-datepicker.css';


function App() {

  return (
      <div className="min-h-screen bg-base-200 transition-colors duration-300">
        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>}/>
          <Route path="/machines/:machine_id" element={<ProtectedRoute><Machine /></ProtectedRoute>}/>
        </Routes>
      </div>
  );
}

export default App;
