import Navbar from "../components/NavbarLogin";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const history = useNavigate();
  const navigate = useNavigate();
  const { token } = useParams();

  const Reset = async (e) => {
    e.preventDefault();
    try {
      if (password === confirmpassword) {
        await axios.patch(`http://localhost:5000/user/resetpassword/${token}`, {
          password: password,
          confirmpassword: confirmpassword,
        });
        let path = "/";
        navigate(path);
        window.alert("Password Changed Successfully");
        history.push("/resetpassword");
      } else {
        setMsg("Password do not match !");
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

  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        {msg}
        <h1
          data-aos="fade-down"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="1000"
          className="text-black font-bold text-3xl py-5">
          Reset Password
        </h1>
        <div className="pb-5">
          <a
            data-aos="zoom-in"
            data-aos-offset="50"
            data-aos-delay="50"
            data-aos-duration="1000"
            className="text-[#B5BECA] font-bold text-sm">
            Insert your new password
          </a>
        </div>
        <form
          data-aos="zoom-in"
          data-aos-offset="200"
          data-aos-delay="50"
          data-aos-duration="1000"
          onSubmit={Reset}>
          <div className="flex flex-col justify-center items-center gap-2">
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
              CONFRIM
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
