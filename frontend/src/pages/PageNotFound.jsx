import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../images/logo-white.png";
import AOS from "aos";
import "aos/dist/aos.css";

export default function PageNotFound() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <section className="min-h-screen bg-[#205AFC]">
      <div className="flex flex-col gap-10 min-h-screen justify-center text-center items-center">
        <img
          data-aos="fade-down"
          data-aos-duration="750"
          className="w-48"
          alt="logo"
          src={Logo}
        />
        <h1 className="text-white font-bold text-lg" data-aos="fade" data-aos-duration="1000">
          404 | Not Found
        </h1>
        {/* eslint-disable */}
        <Link data-aos="fade-up" data-aos-duration="750" to="/">
          <div className="btn-register mt-5 m-4 p-3 text-white font-bold hover:text-green-100 rounded-full text-center text-lg">
            <a>Back to home</a>
          </div>
        </Link>
      </div>
    </section>
  );
}
