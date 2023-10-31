import React from "react";
import Sidebar from "../../components/SidebarLearning";
import RightDetail from "../../components/RightDetail";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Profile() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

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

  const gotoEditProfile = async () => {
    let path = `/profile/edit/${user && user.uuid}`;
    navigate(path);
  };

  const gotoChangePassword = async () => {
    let path = `/profile/change-password/${user && user.uuid}`;
    navigate(path);
  };

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
            <img
              src={`http://localhost:5000/${user && user.image}`}
              className=" rounded-full w-[200px] h-[200px]"
            />
          </div>

          {/* Profile Detail */}

          <h2 className="font-bold text-2xl underline-title w-[300px] my-5">
            Profile Detail
          </h2>

          <div className="flex flex-col gap-5 px-5 pb-10">
            {/* Name */}
            <div>
              <label className="label font-bold">Name</label>
              <input
                className="text-slate-500 py-2 [width:650px] font-semibold px-3 rounded-lg border bg-white border-[#B7B6B8]"
                type="text"
                placeholder="Name"
                value={user && user.name}
                disabled
              />
            </div>

            {/* Email */}
            <div>
              <label className="label font-bold">Email</label>
              <input
                className="text-slate-500 py-2 [width:650px] font-semibold px-3 rounded-lg border bg-white border-[#B7B6B8]"
                type="text"
                placeholder="Email"
                value={user && user.email}
                disabled
              />
            </div>

            {/* Age */}
            <div>
              <label className="label font-bold">Age</label>
              <input
                className="text-slate-500 py-2 [width:650px] font-semibold px-3 rounded-lg border bg-white border-[#B7B6B8]"
                type="text"
                placeholder="Age"
                value={user && user.age}
                disabled
              />
            </div>

            {/* Password */}
            <div>
              <label className="label font-bold">Password</label>
              <input
                className="text-slate-500 py-2 [width:650px] font-semibold px-3 rounded-lg border bg-white border-[#B7B6B8]"
                type="text"
                placeholder="Password"
                value="*****"
                disabled
              />
            </div>

            <div className="flex flex-row items-center gap-5 w-650">
              {/* Created At */}
              <div>
                <label className="label font-bold">Created At</label>
                <input
                  className="text-slate-500 py-2 w-[315px] font-semibold px-3 rounded-lg border bg-white border-[#B7B6B8]"
                  type="text"
                  placeholder="Created At"
                  value={user && formatTimestamp(user.createdAt)}
                  disabled
                />
              </div>

              {/* Updated At */}
              <div>
                <label className="label font-bold">Updated At</label>
                <input
                  className="text-slate-500 py-2 w-[315px] font-semibold px-3 rounded-lg border bg-white border-[#B7B6B8]"
                  type="text"
                  placeholder="Updated At"
                  value={user && formatTimestamp(user.updatedAt)}
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-5 mb-10">
            <button
              onClick={gotoEditProfile}
              className="flex flex-row gap-2 btn-login hover:bg-blue-500 px-8 py-4 rounded-3xl font-bold text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6">
                <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
              </svg>
              Edit Profile
            </button>
            <button
              onClick={gotoChangePassword}
              className="flex flex-row gap-2 btn-register hover:bg-green-500 px-8 py-4 rounded-3xl font-bold text-white">
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
                  d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
              Change Password
            </button>
          </div>
        </section>
        <RightDetail />
      </div>
    </div>
  );
}
