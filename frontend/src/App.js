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
import PrivateEmployeeRoute from "./components/routing/EmployeePrivateRoute";
import PrivateCustomerRoute from "./components/routing/CustomerPrivateRoute";
import Cars from "./pages/employee/Cars";
import Transactions from "./pages/employee/Transactions";
import Branches from "./pages/employee/Branches";
import Customers from "./pages/employee/Customers";

function App() {
  return (
    <>
      <Router>
        <ToastContainer />
        <Navbar />
        <div className={styles.container}>
          <Routes>
            <Route path="/employee/login/" element={<EmployeeLogin />} />
            <Route path="/login/" element={<Login />} />
            <Route path="/register/" element={<Register />} />
            <Route element={<PrivateEmployeeRoute />}>
              <Route path="/employee/cars" element={<Cars />} />
              <Route path="/employee/transactions" element={<Transactions />} />
              <Route path="/employee/branches" element={<Branches />} />
              <Route path="/employee/customers" element={<Customers />} />
            </Route>
            <Route element={<PrivateCustomerRoute />}>
              <Route path="/" element={<Dashboard />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
