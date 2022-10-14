import styles from "./App.module.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EmployeeLogin from "./pages/EmployeeLogin";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import AdminDashboard from "./pages/AdminDashboard";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Router>
        <ToastContainer />
        <Navbar />
        <div className={styles.container}>
          <Routes>
            <Route path="/employee/login" element={<EmployeeLogin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
