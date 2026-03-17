import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Registro from './components/registro';
import Dashboard from './components/dashboard';
import "./App.css";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/" element={<Login />} /> {/* Default: login */}
            </Routes>
        </Router>
    );
}

export default App;