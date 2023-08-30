import { useState, useEffect } from "react";
import Sidebar from "../../components/SidebarLearning";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import ListUsers from "./users/listUsers";
import axios from "axios";

export default function Users() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get(`http://localhost:5000/user`);
    setUsers(response.data);
  };

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError, navigate]);

  const addUser = async () => {
    let path = "/admin/dashboard/user/add";
    navigate(path);
  };

  return (
    <div className="flex flex-col">
      <Sidebar />
      <div className=" text-start p-2 mt-7 ml-[275px]">
        <div className="flex flex-col gap-2">
          <span className="flex flex-row gap-2 items-center text-4xl font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-10 h-10">
              <path
                fill-rule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                clip-rule="evenodd"
              />
            </svg>
            User
          </span>
          <span className="font-semibold text-[#777777]">Configure User</span>
        </div>
        <div className="flex flex-row py-10 gap-7">
          <div className="flex flex-col gap-3 text-white btn-login rounded-xl w-80 px-10 py-3">
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
        </div>
        <button
          onClick={addUser}
          className="btn-register flex flex-row gap-2 text-white font-bold rounded-full py-3 px-5">
          Add New User{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
        <ListUsers />
      </div>
    </div>
  );
}
