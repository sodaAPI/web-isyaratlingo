import Navbar from "../../components/NavbarLogin";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import ImageSample from "../../images/sample-instruction.png";
import AOS from "aos";
import "aos/dist/aos.css";

export default function LearningInstruction() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        {/* Home Button */}
        <div className="flex items-center mx-10 mt-5">
          <a
            data-tip="Back"
            href="/learning"
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

        <div
          data-aos="fade-down"
          data-aos-offset="200"
          data-aos-delay="125"
          data-aos-duration="1000"
          className="flex flex-col items-center gap-2">
          <div className="flex flex-row font-semibold items-center gap-2 mb-5">
            <p>1</p>
            <progress
              className="progress progress-primary w-[500px] h-4"
              value={1}
              max="10"></progress>
            <p>10</p>
          </div>
          <div className="text-black">
            <h1 className=" font-bold text-3xl">Pembelajaran</h1>
            <h2 className="font-semibold text-xl">Perkenalan</h2>
          </div>
          <img
            data-aos="fade-down"
            data-aos-duration="500"
            src={ImageSample}
            className="w-[500px] h-[250px] rounded-2xl shadow-lg"
          />
          <p className=" text-justify w-[500px] py-5">
            Berikut ini adalah penjelasan dalam bahasa isyarat bisindo jika
            salah.
          </p>
          <div className="flex justify-end w-[500px]">
            <a href="/learn-task">
              <button className="flex justify-center items-center btn-register w-[100px] h-[50px] rounded-3xl text-white text-xl font-bold">
                Next
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
