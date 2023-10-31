import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/SidebarLearning";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RightDetail from "../../components/RightDetail";

export default function LearningHome() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [level, setLevel] = useState([]);

  useEffect(() => {
    getLevels();
  }, []);

  const getLevels = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/level`);
      // Check if the retrieved data is an array before setting the state
      if (Array.isArray(response.data)) {
        setLevel(response.data);
      } else {
        setLevel([]);
      }
    } catch (error) {
      console.error("Error fetching levels:", error);
      // Handle errors: Show a message or retry logic
    }
  };

  const [clicked, setClicked] = useState(false);

  const handleLevelClick = (lvl) => {
    if (lvl.level !== user.levels[0].level) {
      // Add logic for unclickable levels (if needed)
      return;
    }

    setClicked(true);
    // Perform any other actions as needed when a level is clicked
    navigate(`/learn-instruction/${user.learns[0].uuid}`);
  };

  return (
    <div>
      <Sidebar />
      <div className=" flex flex-row gap-10 text-start p-2 mt-7 ml-[275px]">
        <section>
          <div className="flex flex-col text-white btn-login rounded-3xl px-7 py-4 mb-5 h-[110px] w-[750px]">
            <h1 className="flex flex-row items-center gap-2 font-bold text-3xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="yellow"
                class="w-6 h-6">
                <path
                  fill-rule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clip-rule="evenodd"
                />
              </svg>
              Level {user && user.levels[0].level}
            </h1>
            <h2 className="font-bold text-2xl">
              {user && user.levels[0].name}
            </h2>
          </div>

          {/* Levels */}
          <div className="flex flex-col gap-[100px] items-center justify-center py-5">
            {level
              .filter((lvl) => lvl.level >= user.levels[0].level)
              .sort((a, b) => a.level - b.level)
              .map((lvl) => (
                <div key={lvl.id} onClick={() => handleLevelClick(lvl)}>
                  <div
                    data-tip={`Level ${lvl.level} : ${lvl.name}`}
                    className={`tooltip tooltip-left flex items-center justify-center rounded-full btn-level w-[70px] h-[65px] ${
                      lvl.level === user.levels[0].level ? "" : "btn-unlevel"
                    }`}>
                    {lvl.level === user.levels[0].level ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="white"
                        className="w-9 h-9">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="#AFAFAF"
                        className="w-9 h-9">
                        <path
                          fillRule="evenodd"
                          d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                          clipRule="evenodd"></path>
                      </svg>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </section>

        <RightDetail />
      </div>
    </div>
  );
}
