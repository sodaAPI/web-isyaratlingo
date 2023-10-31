import Navbar from "../../components/NavbarLogin";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getMe } from "../../auth/authSlice";
import AOS from "aos";
import "aos/dist/aos.css";

export default function LearningInstruction() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // Replace 'userRoles' with the actual roles of the logged-in user from your application
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError, navigate]);

  useEffect(() => {
    AOS.init();
  }, []);

  const [learn, setLearn] = useState([]);

  useEffect(() => {
    getLearns();
    let path = `/learn-task/${user.lessons[0].uuid}`;
    navigate(path);
  }, []);

  const getLearns = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/learn`);
      if (Array.isArray(response.data)) {
        setLearn(response.data);
      } else {
        setLearn([]);
      }
    } catch (error) {
      console.error("Error fetching learns:", error);
    }
  };

  return (
    <>
      <div className="min-h-screen">
        <Navbar />
      </div>
    </>
  );
}
