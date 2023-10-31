import Navbar from "../components/NavbarLogin";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Register() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const Register = async (e) => {
    e.preventDefault();
    try {
      if (password === confirmpassword) {
        const response = await axios.post("http://localhost:5000/user", {
          name: name,
          age: age,
          email: email,
          password: password,
          confirmpassword: confirmpassword,
        });
        setMsg("Registration Successful");
        setTimeout(() => {
          navigate("/login");
        }, 1000); // Delay navigation to /login for 5 seconds
        if (response.data.success) {
          // Registration successful, show success message
        } else {
          // Registration failed, show error message
          setMsg(response.data.msg);
        }
      } else {
        setMsg("Passwords do not match!");
      }
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  useEffect(() => {
    AOS.init();
  }, []);

  const gotoLogin = async () => {
    let path = "/login";
    navigate(path);
  };
  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        {/* Home Button */}
        <div className="flex items-center mx-10 mt-5">
          <a
            data-tip="Home"
            href="/home"
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
        {msg && ( // Check if msg is not empty before rendering the message
          <div className="toast toast-end">
            <div className="alert alert-info">
              <span>{msg}</span>
            </div>
          </div>
        )}

        <h1
          data-aos="fade-down"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="1000"
          className="text-black font-bold text-3xl py-10">
          Create your account
        </h1>
        <form
          data-aos="zoom-in"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="1000"
          onSubmit={Register}>
          <div className="flex flex-col justify-center items-center gap-2">
            {/* Name */}
            <div className="flex flex-row justify-right items-center gap-3">
              <input
                id="name"
                value={name}
                className="py-2 [width:400px] font-semibold px-3 rounded-lg border bg-white border-[#B7B6B8]"
                placeholder="Name"
                type="text"
                onChange={(event) => setName(event.target.value)}
                required
                autoFocus
              />
            </div>

            {/* Age */}
            <div className="flex flex-row justify-right items-center gap-3">
              <input
                id="age"
                value={age}
                className="py-2 [width:400px] font-semibold px-3 rounded-lg border bg-white border-[#B7B6B8]"
                placeholder="Age"
                type="number"
                onChange={(event) => setAge(event.target.value)}
                required
                autoFocus
              />
            </div>

            {/* Email */}
            <div className="flex flex-row justify-right items-center gap-3">
              <input
                id="email"
                value={email}
                className="py-2 [width:400px] font-semibold px-3 rounded-lg border bg-white border-[#B7B6B8]"
                placeholder="Email"
                type="email"
                onChange={(event) => setEmail(event.target.value)}
                required
                autoFocus
              />
            </div>

            {/* Password */}
            <div className="flex flex-row justify-right items-center gap-3">
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                className="py-2 [width:400px] font-semibold px-3 rounded-lg border bg-white border-[#B7B6B8]"
                onChange={(event) => setPassword(event.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            {/* Confirm Passowrd */}
            <div className="flex flex-row justify-right items-center gap-3">
              <input
                id="confirmpassword"
                type="password"
                placeholder="Confirm Password"
                value={confirmpassword}
                className="py-2 [width:400px] font-semibold px-3 rounded-lg border bg-white border-[#B7B6B8]"
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
          </div>
          <div className="mt-10">
            <button className="btn-register [width:400px] py-3 rounded-full font-bold normal-case text-lg text-white hover:text-green-100">
              CREATE ACCOUNT
            </button>
          </div>
        </form>

        {/* Buttons */}
        <div
          data-aos="zoom-in"
          data-aos-offset="150"
          data-aos-delay="50"
          data-aos-duration="1000"
          className="pb-10">
          <div className="flex divider justify-center items-center [padding-left:575px] [padding-right:575px] text-[#B7B6B8] font-semibold">
            OR
          </div>
          <button
            onClick={gotoLogin}
            className="btn-login [width:400px] py-3 rounded-full font-bold normal-case text-lg text-white hover:text-blue-100">
            LOGIN
          </button>
        </div>
        <a
          data-aos="zoom-in"
          data-aos-offset="50"
          data-aos-delay="50"
          data-aos-duration="1000"
          className="text-[#B5BECA] text-sm">
          By registering to <b>Isyaratlingo</b>, you agree to our{" "}
          <b>Terms and Privacy Policy</b>.
        </a>
      </div>
    </>
  );
}
