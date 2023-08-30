import React from "react";
import Logo from "../images/logo-white.png";
import { Link } from "react-scroll";
import AOS from "aos";
import "aos/dist/aos.css";

export default function () {
  AOS.init();
  return (
    <div
      data-aos="zoom-in-down"
      data-aos-offset="200"
      data-aos-delay="50"
      data-aos-duration="1000"
      className="pt-2 ml-10 mr-10">
      <div className="navbar p-2 ">
        <div className="navbar-start">
          <a>
            <img className="w-52" src={Logo} alt="Logo" />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-20 text-lg text-white px-1">
            <li>
              <Link
                to="hero"
                spy={true}
                smooth={true}
                duration={500}
                offset={-100}
                className="hover:text-[#daff49]">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="about"
                spy={true}
                smooth={true}
                duration={500}
                offset={-100}
                className="hover:text-[#daff49]">
                About
              </Link>
            </li>
            {/* <li>
              <a className="hover:text-[#daff49]">How it works</a>
            </li> */}
          </ul>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                class="menus-bar w-6 h-6">
                <path
                  fill-rule="evenodd"
                  d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                  clip-rule="evenodd"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content font-semibold mt-3 z-[1] gap-2 p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <Link to="hero" spy={true} smooth={true} duration={500}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="about" spy={true} smooth={true} duration={500}>
                  About
                </Link>
              </li>
              {/* <li>
                <a>How it works</a>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
