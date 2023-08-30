import React from "react";
import Logo from "../images/logo-white.png";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Footer() {
  AOS.init();
  return (
    <footer className="footer [row-gap:1rem] footer-center p-5 bg-[#205AFC] text-white">
      <div>
        <img className="w-60" src={Logo} />
        <p className="font-bold">Providing reliable tech since 2023</p>
        <p>Copyright © 2023 - All right reserved</p>
      </div>
    </footer>
  );
}
