import { useState, useEffect, useRef } from "react";
import Sidebar from "../../components/SidebarLearning";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../components/Pagination";
import ChartsUser from "../../components/ChartsUser";
import axios from "axios";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const getUsers = async () => {
    const response = await axios.get(`http://localhost:5000/user`);
    setUsers(response.data);
  };

  const formatTimestamp = (timestamp) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: "Asia/Jakarta",
    };
    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(timestamp)
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    const adminUsers = users.filter((user) => user.roles === "admin");
    setAdminUsers(adminUsers);
  }, [users]);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError, navigate]);

  return (
    <div className="flex flex-col">
      <Sidebar />
      <div className=" text-start p-2 mt-7 ml-[275px]">
        <div className="flex flex-col gap-2">
          <span className="text-4xl font-bold">Dashboard</span>
          <span className="font-semibold text-[#777777]">
            Welcome back, {user && user.name}{" "}
          </span>
        </div>
        <div className="flex flex-row py-10 gap-7">
          <div className="flex flex-col gap-3 text-white btn-register rounded-xl w-80 px-10 py-3">
            <span className="flex flex-row text-left items-start gap-2 font-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6">
                <path
                  fill-rule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  clip-rule="evenodd"
                />
              </svg>
              Total User
            </span>
            <span className="flex items-center justify-center text-2xl">
              {users.length}
            </span>
            <span className="text-sm text-center">Registered user</span>
          </div>
          <div className="flex flex-col gap-3 text-white  btn-login rounded-xl w-80 px-10 py-3">
            <span className="flex flex-row text-left items-start gap-2 font-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6">
                <path
                  fill-rule="evenodd"
                  d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clip-rule="evenodd"
                />
              </svg>
              Total Admin
            </span>
            <span className="flex items-center justify-center text-2xl">
              {adminUsers.length}
            </span>
            <span className="text-sm text-center">Registered admin</span>
          </div>
        </div>

        <div className="w-[650px]">
          <ChartsUser />
        </div>

        <div className="py-3">
          <span className="text-2xl font-bold">User List</span>
        </div>
        <table className="table py-2 w-1/2 bg-[#007bff] rounded-lg text-white">
          <thead className="text-white text-center">
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Roles</th>
              <th>Registered At</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {users
              .filter(
                (user) =>
                  user.id ||
                  user.name ||
                  user.email ||
                  user.roles ||
                  user.createdAt
              )
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.roles}</td>
                  <td>{formatTimestamp(user.createdAt)}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={users.length}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
