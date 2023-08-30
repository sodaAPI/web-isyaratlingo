import React from "react";
import Logo from "../images/logo-blu.png";

export default function () {
  return (
    <div className="pt-2 ml-10 mr-10">
      <div className="navbar rounded-xl p-2">
        <div className="navbar-start">
          <a href="/home">
            <img className="w-52" src={Logo} alt="Logo" />
          </a>
        </div>
      </div>
    </div>
  );
}
