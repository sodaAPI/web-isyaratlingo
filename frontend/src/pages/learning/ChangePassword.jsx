import React from "react";
import Sidebar from "../../components/SidebarLearning";
import RightDetail from "../../components/RightDetail";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function ChangePassword() {
  const { user } = useSelector((state) => state.auth);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { uuid } = useParams();
  const navigate = useNavigate();

  const changePasswordUser = async (e) => {
    e.preventDefault();
    await axios.patch(`http://localhost:5000/user/password/${uuid}`, {
      password: password,
      confirmpassword: confirmPassword,
    });
    let path = "/profile";
    navigate(path);
    window.alert("Profile Updated Successfully");
  };

  const getUserByUUID = async () => {
    const response = await axios.get(`http://localhost:5000/me`);
    setPassword(response.data.password);
  };

  useEffect(() => {
    getUserByUUID();
  }, []);

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
                fill="#009946"
                class="w-10 h-10">
                <path
                  fill-rule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  clip-rule="evenodd"
                />
              </svg>
              Profile
            </h1>
          </div>

          <div className="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#009946"
              class="w-[150px] h-[150px]">
              <path
                fill-rule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                clip-rule="evenodd"
              />
            </svg>
          </div>

          {/* Profile Detail */}

          <h2 className="font-bold text-2xl underline-title w-[300px] my-5">
            Change Password
          </h2>

          <form onSubmit={changePasswordUser}>
            <div className="flex flex-col gap-5 px-5 pb-10">
              {/* Password */}
              <div>
                <label className="label font-bold">New Password</label>
                <input
                  className="text-slate-500 py-2 [width:650px] font-semibold px-3 rounded-lg border bg-white border-[#B7B6B8]"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="label font-bold">Confirm New Password</label>
                <input
                  className="text-slate-500 py-2 [width:650px] font-semibold px-3 rounded-lg border bg-white border-[#B7B6B8]"
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  required
                />
              </div>
            </div>

            <button className="flex flex-row gap-2 btn-register hover:bg-green-500 px-8 py-4 rounded-3xl font-bold text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6">
                <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
              </svg>
              CONFIRM
            </button>
          </form>
        </section>
        <RightDetail />
      </div>
    </div>
  );
}
