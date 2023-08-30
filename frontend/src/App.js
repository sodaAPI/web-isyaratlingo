import { Routes, Route, BrowserRouter } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import PageNotFound from "./pages/PageNotFound";
import Learning from "./pages/learning/LearningHome";
import"./App.css";
import AdminDashboard from "./pages/admin/AdminDashboard";
import EditUsers from "./pages/admin/users/editUser";
import AddUser from "./pages/admin/users/addUser";
import Users from "./pages/admin/Users";
import Shop from "./pages/admin/Shop";
import Dictionary from "./pages/admin/Dictionary";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Global */}

          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/*" element={<PageNotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* <Route path="/reset-password/:token" element={<ResetPassword />} /> */}

          {/* Learning */}

          <Route path="/learning" element={<Learning />} />

          {/* Admin */}
          <Route path="/admin/dashboard" element={<AdminDashboard/>} />
          <Route path="/admin/dashboard/user" element={<Users/>} />
          <Route path="/admin/dashboard/shop" element={<Shop/>} />
          <Route path="/admin/dashboard/dictionary" element={<Dictionary/>} />
          <Route path="/admin/dashboard/user/add" element={<AddUser />} />
          <Route path="/admin/dashboard/user/edit/:uuid" element={<EditUsers />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
