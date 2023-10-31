import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/SidebarLearning";
import RightDetail from "../../components/RightDetail";
import Pagination from "../../components/Pagination";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [scoreCurrentPage, setScoreCurrentPage] = useState(1);
  const [scoreItemsPerPage] = useState(10);

  const getUsers = async () => {
    const response = await axios.get(
      `http://localhost:5000/user/all-leaderboard`
    );
    setUsers(response.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const scoreHandlePageChange = (page) => {
    setScoreCurrentPage(page);
  };

  const scoreUsers = users
    .filter((user) => user.id || user.name || user.score)
    .sort((a, b) => b.score - a.score)
    .slice(
      (scoreCurrentPage - 1) * scoreItemsPerPage,
      scoreCurrentPage * scoreItemsPerPage
    );

  return (
    <div>
      <Sidebar />
      <div className=" flex flex-row gap-10 text-start p-2 mt-7 ml-[275px]">
        <section>
          <div className="flex flex-col text-white btn-login rounded-3xl px-7 py-4 mb-5 h-[75px] w-[750px]">
            <h1 className="flex flex-row items-center gap-2 font-bold text-3xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#FED84E"
                class="w-10 h-10">
                <path
                  fill-rule="evenodd"
                  d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm4.5 7.5a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75zm3.75-1.5a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0V12zm2.25-3a.75.75 0 01.75.75v6.75a.75.75 0 01-1.5 0V9.75A.75.75 0 0113.5 9zm3.75-1.5a.75.75 0 00-1.5 0v9a.75.75 0 001.5 0v-9z"
                  clip-rule="evenodd"
                />
              </svg>
              Leaderboard
            </h1>
          </div>

          {/* Scores Leaderboard */}

          <h1 className="flex flex-row items-center gap-2 text-2xl font-bold text-[#205AFC] w-[300px] underline-title my-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-8 h-8">
              <path
                fill-rule="evenodd"
                d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                clip-rule="evenodd"
              />
            </svg>
            Scores Leaderboard
          </h1>

          <table className="table my-2 bg-[#1CB0F6]  rounded-lg text-white">
            <thead className="text-white">
              <tr className="bg-[#1789bd] rounded-lg">
                <th>No</th>
                <th>Name</th>
                <th>Scores</th>
              </tr>
            </thead>
            <tbody>
              {scoreUsers.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.score}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            currentPage={scoreCurrentPage}
            itemsPerPage={scoreItemsPerPage}
            totalItems={users.length}
            handlePageChange={scoreHandlePageChange}
          />
        </section>
        <RightDetail />
      </div>
    </div>
  );
}
