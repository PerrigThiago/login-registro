import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Registro from './components/registro';
import Dashboard from './components/dashboard';
import ForgotPassword from './components/forgotPassword';
import "./App.css";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

export default App;