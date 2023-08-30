import Navbar from "../components/NavbarLogin";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const history = useNavigate();

  useEffect(() => {
    AOS.init();
  }, []);

  const Forgot = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/user/forgotpassword", {
        email: email,
      });
      setIsError(false);
      setMsg(""); // Clear the error message on successful submission
      let path = "/";
      navigate(path);
      window.alert("Please check your email to change your password.");
    } catch (error) {
      setIsError(true);
      if (error.response) {
        setMsg(error.response.data.msg); // Set the error message
      }
    }
  };
  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        {/* Home Button */}
        <div className="flex items-center mx-10 mt-5">
          <a
            data-tip="Login"
            href="/login"
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
        {isError ? (
          <div className="toast toast-end">
            <div className="alert alert-info">
              <span>{msg}</span>
            </div>
          </div>
        ) : (
          <></>
        )}
        <h1
          data-aos="fade-down"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="1000"
          className="text-black font-bold text-3xl py-10">
          Reset Password
        </h1>
        <div
          data-aos="zoom-in"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="1000"
          className="pb-5 [padding-left:500px] [padding-right:500px]">
          <span className="text-[#939da9] font-semibold text-sm">
            Forgot your password? No problem. Just let us know your email
            address and we will email you a password reset link that will allow
            you to choose a new one.
          </span>
        </div>
        <form
          data-aos="zoom-in"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="1000"
          onSubmit={Forgot}>
          <div className="flex flex-col justify-center items-center pr-10 gap-2">
            {/* Email */}
            <div className="flex flex-row justify-right items-center gap-3">
              <label>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#B7B6B8"
                  class="w-6 h-6">
                  <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                  <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                </svg>
              </label>
              <input
                id="email"
                value={email}
                className="py-2 [width:400px] font-semibold px-3 rounded-lg border bg-white border-[#B7B6B8]"
                placeholder="Email"
                type="text"
                onChange={(event) => setEmail(event.target.value)}
                required
                autoFocus
              />
            </div>
          </div>

          <div className="mt-10">
            <button className="btn-register [width:400px] py-3 rounded-full font-bold normal-case text-lg text-white hover:text-green-100">
              CONFIRM
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
