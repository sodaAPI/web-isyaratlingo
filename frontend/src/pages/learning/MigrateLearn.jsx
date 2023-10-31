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
    let path = `/learn-instruction/${user.learns[0].uuid}`;
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

  const gotoLesson = async () => {
    let path = `/learn-task/${user.lessons[0].uuid}`;
    navigate(path);
  };

  // Assuming user.learns[0].number represents the current progress level
  const minimumProgress =
    user.progresslearn.uuid === user.learns[0].uuid
      ? user.progresslearn.minimum
      : 0;

  const maximumProgress =
    user.progresslearn.uuid === user.learns[0].uuid
      ? user.progresslearn.maximum
      : 10; // Assuming the maximum level is 10 as a default value

  const postNextLearn = async () => {
    const url = `http://localhost:5000/level/nextlearn/${user.uuid}`;

    try {
      const response = await axios.post(url);
      if (response.data.message === "Next learn session retrieved.") {
        getUpdatedUserInformation(); // Fetch the updated user information
      }
    } catch (error) {
      console.error("Error getting next learn session:", error);
    }
  };

  const getUpdatedUserInformation = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/auth/me`);
      if (response.data) {
        const updatedUser = response.data;
        if (updatedUser.progresslearn) {
          navigate(`/learn-instruction/${updatedUser.progresslearn}`);
        }
      }
    } catch (error) {
      console.error("Error fetching updated user information:", error);
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
