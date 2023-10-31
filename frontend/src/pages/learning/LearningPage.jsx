import Navbar from "../../components/NavbarLogin";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { getMe } from "../../auth/authSlice";
import AOS from "aos";
import "aos/dist/aos.css";

export default function LearningPage() {
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

  const [lesson, setLesson] = useState([]);

  useEffect(() => {
    getLessons();
  }, []);

  const getLessons = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/lesson`);
      if (Array.isArray(response.data)) {
        setLesson(response.data);
      } else {
        setLesson([]);
      }
    } catch (error) {
      console.error("Error fetching lessons:", error);
    }
  };

  const postNextLesson = async () => {
    const url = `http://localhost:5000/level/nextlesson/${user.uuid}`;

    try {
      const response = await axios.post(url);
      if (response.data.message === "Next lesson session retrieved.") {
        if (parseInt(user.lessons[0].number) === maximumProgress) {
          let path = `/learning`;
          navigate(path);
        } else {
          let path = `/migrate-lesson`;
          navigate(path);
        }
      }
    } catch (error) {
      console.error("Error getting next lesson session:", error);
    }
  };

  const validateAnswer = async (selectedAnswer) => {
    // Assuming the user has a current lesson object available
    const userGuards = user.guard;

    if (selectedAnswer === user.lessons[0].right_answer || userGuards > 1) {
      const userPoints = parseInt(user.point, 10);
      const userScores = parseInt(user.score, 10);

      try {
        // Update the user's points and scores
        const updatedUser = await axios.patch(
          `http://localhost:5000/user/${user.uuid}`,
          {
            point: userPoints + 50,
            score: userScores + 50,
          }
        );

        if (userGuards > 0) {
          // If a guard was used, decrement the number of guards
          await axios.patch(`http://localhost:5000/user/${user.uuid}`, {
            guard: userGuards - 1,
          });
        }

        postNextLesson(); // Proceed to the next lesson

        if (updatedUser.data.message === "User updated successfully") {
          postNextLesson(); // Proceed to the next lesson
        } else {
          console.error("Error updating user's points and scores");
        }
      } catch (error) {
        console.error("Error updating user's points and scores:", error);
      }
    } else {
      postNextLesson(); // Proceed to the next lesson
    }
  };

  const getSmallestLessonNumber = () => {
    const smallestNumber = Math.min(
      ...user.lessons.map((learn) => parseInt(learn.number, 10))
    );
    return smallestNumber;
  };

  const getLargestLessonNumber = () => {
    const largestNumber = Math.max(
      ...user.lessons.map((learn) => parseInt(learn.number, 10))
    );
    return largestNumber;
  };

  const minimumProgress =
    user.progresslearn.uuid === user.learns[0].uuid
      ? getSmallestLessonNumber()
      : 0;

  const maximumProgress =
    user.progresslearn.uuid === user.learns[0].uuid
      ? getLargestLessonNumber()
      : 10;

  const gotoLearn = async () => {
    let path = `/learn-instruction/${user.learns[0].uuid}`;
    navigate(path);
  };

  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        {/* Home Button */}
        <div className="flex items-center mx-10 mt-5">
          <button
            data-tip="Back"
            onClick={gotoLearn}
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
          </button>
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
              value={user.lessons[0].number}
              max={maximumProgress}
            />
            <p>{maximumProgress}</p>
          </div>
          <div className="text-black">
            <h1 className=" font-bold text-3xl">Tugas</h1>
            <h2 className="font-semibold text-xl">{user.lessons[0].name}</h2>
          </div>
          <img
            data-aos="fade-down"
            data-aos-duration="500"
            src={`http://localhost:5000/${user.lessons[0].image}`}
            className="w-[250px] rounded-2xl shadow-lg"
          />
          <p className=" text-justify w-[500px] py-5">
            {user.lessons[0].description}
          </p>
          <div className="flex flex-row gap-3 justify-center w-[500px]">
            <button
              className="flex justify-center items-center btn-login px-6 py-3 rounded-3xl text-white text-xl font-bold"
              onClick={() => validateAnswer(user.lessons[0].question_1)}>
              {user.lessons[0].question_1}
            </button>
            <button
              className="flex justify-center items-center btn-login px-6 py-3 rounded-3xl text-white text-xl font-bold"
              onClick={() => validateAnswer(user.lessons[0].question_2)}>
              {user.lessons[0].question_2}
            </button>
            <button
              className="flex justify-center items-center btn-login px-6 py-3 rounded-3xl text-white text-xl font-bold"
              onClick={() => validateAnswer(user.lessons[0].question_3)}>
              {user.lessons[0].question_3}
            </button>
            <button
              className="flex justify-center items-center btn-login px-6 py-3 rounded-3xl text-white text-xl font-bold"
              onClick={() => validateAnswer(user.lessons[0].question_4)}>
              {user.lessons[0].question_4}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
