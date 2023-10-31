import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function RightDetail() {
  const { user } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const response = await axios.get(
      `http://localhost:5000/user/all-leaderboard`
    );
    setUsers(response.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const top5Users = users
    .filter((user) => user.id || user.name || user.score)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  return (
    <section className="flex flex-col gap-10">
      {/* User Detail */}
      <div className="flex flex-col gap-2 text-lg font-semibold w-[375px] outline outline-[1.5] rounded-xl outline-slate-300 p-3">
        <a className="flex flex-row items-center gap-2">
          <img
            src={`http://localhost:5000/${user && user.image}`}
            className=" rounded-full w-[64px] h-[64px]"
          />

          <a>{user && user.name}</a>
        </a>
        <a className="flex flex-row items-center text-slate-500 gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="yellow"
            class="w-8 h-8">
            <path
              fill-rule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
              clip-rule="evenodd"
            />
          </svg>
          {user && user.point}
          <a>Points</a>
        </a>

        <a className="flex flex-row items-center text-slate-500 gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#1CB0F6"
            class="w-8 h-8">
            <path
              fill-rule="evenodd"
              d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
              clip-rule="evenodd"
            />
          </svg>
          {user && user.guard - 1}
          <a>Guards</a>
        </a>

        {/* <a className="flex flex-row items-center text-slate-500 gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="red"
            class="w-8 h-8">
            <path
              fill-rule="evenodd"
              d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z"
              clip-rule="evenodd"
            />
          </svg>
          {user && user.winstreak}
          <a>Winstreak</a>
        </a> */}
      </div>

      {/* Leaderboard */}
      <div className="flex flex-col gap-2  w-[375px] outline outline-[1.5] rounded-xl outline-slate-300 p-3">
        <a className="flex flex-row text-lg font-semibold items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#FED84E"
            class="w-8 h-8">
            <path
              fill-rule="evenodd"
              d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm4.5 7.5a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75zm3.75-1.5a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0V12zm2.25-3a.75.75 0 01.75.75v6.75a.75.75 0 01-1.5 0V9.75A.75.75 0 0113.5 9zm3.75-1.5a.75.75 0 00-1.5 0v9a.75.75 0 001.5 0v-9z"
              clip-rule="evenodd"
            />
          </svg>

          <a className="font-bold">Top 5 Leaderboard</a>
        </a>
        <a className="text-md font-medium text-slate-500">
          Tingkatkan performa pembelajaran Anda, Raih kemenangan berturut-turut
          untuk mencapai Leaderboard!
        </a>
        <table className="table py-2 bg-[#1CB0F6]  rounded-lg text-white">
          <thead className="text-white">
            <tr className="bg-[#58CC02] rounded-lg">
              <th>No</th>
              <th>Name</th>
              <th>Scores</th>
            </tr>
          </thead>
          <tbody>
            {top5Users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
