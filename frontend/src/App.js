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
import Damages from "./pages/employee/Damages";
import RentConfirmation from "./pages/customer/RentConfirmation";
import RentalDashboard from "./pages/RentalDashboard";
import ChooseCar from "./pages/ChooseCar";

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
            <Route path="/checkout/" element={<RentConfirmation />} />
            <Route path="/register/" element={<Register />} />
            <Route element={<PrivateEmployeeRoute />}>
              <Route path="/employee/cars/" element={<Cars />} />
              <Route
                path="/employee/transactions/"
                element={<Transactions />}
              />
              <Route path="/employee/branches/" element={<Branches />} />
              <Route path="/employee/customers/" element={<Customers />} />
              <Route path="/employee/damages/" element={<Damages />} />
            </Route>
            <Route element={<PrivateCustomerRoute />}>
              <Route path="/rental" element={<RentalDashboard />} />
              <Route path="/cars" element={<ChooseCar />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
