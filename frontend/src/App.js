import"./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import React from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import PageNotFound from "./pages/PageNotFound";

import Learning from "./pages/learning/LearningHome";
import LearningInstruction from "./pages/learning/LearningInstruction";
import LearningPage from "./pages/learning/LearningPage";

import Leaderboard from "./pages/learning/Leaderboard";
import Profile from "./pages/learning/Profile";
import Shops from "./pages/learning/Shop";
import Dictionarys from "./pages/learning/Dictionary";

import EditProfile from "./pages/learning/EditProfile";
import ChangePassword from "./pages/learning/ChangePassword";

import AdminDashboard from "./pages/admin/AdminDashboard";
import Users from "./pages/admin/Users";
import Shop from "./pages/admin/Shop";
import Dictionary from "./pages/admin/Dictionary";
import EditUsers from "./pages/admin/users/editUser";
import AddUser from "./pages/admin/users/addUser";
import EditDictionary from "./pages/admin/dictionary/editDictionary";
import AddDictionary from "./pages/admin/dictionary/addDictionary";
import EditShop from "./pages/admin/shop/editShop";
import AddShop from "./pages/admin/shop/addShop";
import ResetPassword from "./pages/ResetPassword";

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
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Profile */}
          <Route path="/profile/edit/:uuid" element={<EditProfile />} />
          <Route path="/profile/change-password/:uuid" element={<ChangePassword />} />

          {/* Learning */}
          <Route path="/learning" element={<Learning />} />
          <Route path="/learn-instruction" element={<LearningInstruction />} />
          <Route path="/learn-task" element={<LearningPage />} />


          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/shop" element={<Shops />} />
          <Route path="/dictionary" element={<Dictionarys />} />

          {/* Admin */}
          <Route path="/admin/dashboard" element={<AdminDashboard/>} />
          <Route path="/admin/dashboard/user" element={<Users/>} />
          <Route path="/admin/dashboard/shop" element={<Shop/>} />
          <Route path="/admin/dashboard/dictionary" element={<Dictionary/>} />

          {/* User */}
          <Route path="/admin/dashboard/user/add" element={<AddUser />} />
          <Route path="/admin/dashboard/user/edit/:uuid" element={<EditUsers />} />

          {/* Shop */}
          <Route path="/admin/dashboard/shop/add" element={<AddShop />} />
          <Route path="/admin/dashboard/shop/edit/:uuid" element={<EditShop />} />

          {/* Dictionary */}
          <Route path="/admin/dashboard/dictionary/add" element={<AddDictionary />} />
          <Route path="/admin/dashboard/dictionary/edit/:uuid" element={<EditDictionary />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
