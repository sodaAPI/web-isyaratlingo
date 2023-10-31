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

  const getSmallestLearnNumber = () => {
    const smallestNumber = Math.min(
      ...user.learns.map((learn) => parseInt(learn.number, 10))
    );
    return smallestNumber;
  };

  const getLargestLearnNumber = () => {
    const largestNumber = Math.max(
      ...user.learns.map((learn) => parseInt(learn.number, 10))
    );
    return largestNumber;
  };

  const minimumProgress =
    user.progresslearn.uuid === user.learns[0].uuid
      ? getSmallestLearnNumber()
      : 0;

  const maximumProgress =
    user.progresslearn.uuid === user.learns[0].uuid
      ? getLargestLearnNumber()
      : 10;

  const postNextLearn = async () => {
    const url = `http://localhost:5000/level/nextlearn/${user.uuid}`;

    try {
      const response = await axios.post(url);
      if (response.data.message === "Next learn session retrieved.") {
        let path = `/migrate-learn`;
        navigate(path);
      } else if (
        response.data.message ===
        "No more sessions found for the current level."
      ) {
        // Navigate to the lesson page
        gotoLesson();
      }
    } catch (error) {
      console.error("Error getting next learn session:", error);
    }
  };

  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        {/* Home Button */}
        <div className="flex items-center mx-10 mt-5">
          <a
            data-tip="Back"
            href="/learning"
            className="flex flex-row items-center pointer-events-none group tooltip tooltip-right">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="#B7B6B8"
              className="w-12 h-12 border-[3px] border-[#B7B6B8] rounded-full mr-2 hover:border-[#205AFC] pointer-events-auto group-hover:stroke-[#205AFC]">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </a>
        </div>

        <div
          data-aos="fade-down"
          data-aos-offset="200"
          data-aos-delay="125"
          data-aos-duration="1000"
          className="flex flex-col items-center gap-2">
          <div className="flex flex-row font-semibold items-center gap-2 mb-5">
            <p>{minimumProgress}</p>
            <progress
              className="progress progress-primary w-[500px] h-4"
              value={user.learns[0].number}
              max={maximumProgress}
            />
            <p>{maximumProgress}</p>
          </div>
          <div className="text-black">
            <h1 className=" font-bold text-3xl">Pembelajaran</h1>
            <h2 className="font-semibold text-xl">{user.learns[0].name}</h2>
          </div>
          <img
            data-aos="fade-down"
            data-aos-duration="500"
            src={`http://localhost:5000/${user.learns[0].image}`}
            className="w-[250px] rounded-2xl shadow-lg"
          />
          <p className=" text-justify w-[500px] py-5">
            {user.learns[0].description}
          </p>
          <div className="flex justify-end w-[500px]">
            <button
              onClick={
                parseInt(user.learns[0].number) === maximumProgress
                  ? gotoLesson
                  : postNextLearn
              }
              className="flex justify-center items-center btn-register w-[100px] h-[50px] rounded-3xl text-white text-xl font-bold">
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
