import React from "react";
import Navbar from "../components/Navbar";
import HeroImage from "../images/hero.png";
import Logo from "../images/logo-white.png";
import AboutImage from "../images/about-ilustration.png";
import BisindoImage from "../images/bisindo.png";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";

export default function () {
  const navigate = useNavigate();
  const gotoLogin = async () => {
    let path = "/login";
    navigate(path);
  };
  AOS.init();

  return (
    <>
      <head>
        <title>Isyaratlingo</title>
        <meta
          name="description"
          content="Isyaratlingo is a BISINDO sign language learning web with gamification"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/css/style.min.css" />
        <script src="/js/app.js"></script>
        <noscript>You need to enable JavaScript to run this app.</noscript>
      </head>
      <div>
        <div
          className="bg-[#205AFC] sticky top-0 z-10">
          <Navbar />
        </div>
        <div id="hero" className="min-h-screen bg-[#205AFC]">
          {/* Hero Section */}
          <section
            data-aos="fade-down"
            data-aos-offset="200"
            data-aos-delay="50"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            className="flex flex-col items-center justify-center">
            {/* Image */}
            <img
              className="mt-8 mb-5 w-4/6 animation-hovering"
              src={HeroImage}
              alt="Hero Image"
            />
            <button
              onClick={gotoLogin}
              className="flex flex-row items-center justify-center gap-2 absolute btn-getstarted px-8 py-4 rounded-full font-bold normal-case text-2xl text-white hover:text-[#daff49] mt-5">
              GET STARTED
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
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>

            {/* Description */}
            <div>
              <h1 className="text-5xl text-white font-serif">
                Communicate With <b className="text-[#daff49]">Deaf</b> And
                <br /> <b className="text-[#daff49]">Hard Of Hearing </b> People
              </h1>
              <h2 className="mr-80 ml-80 mt-5 text-center text-white text-lg font-light">
                Belajar Bahasa Isyarat Indonesia (BISINDO) memiliki manfaat
                penting, termasuk memfasilitasi komunikasi yang lebih baik
                dengan komunitas tunarungu dan meningkatkan kesadaran tentang
                inklusivitas sosial.
              </h2>
            </div>
          </section>
        </div>

        {/* About */}
        <div id="about" className="min-h-screen my-5">
          <div
            data-aos="zoom-in-left"
            data-aos-offset="200"
            data-aos-delay="50"
            data-aos-duration="750"
            data-aos-easing="ease-in-out"
            className="flex flex-row px-52 gap-20 ">
            <div className="flex flex-col gap-10 py-5">
              <h1 className="text-5xl font-bold text-[#205AFC] underline-title mx-52">
                About
              </h1>
              <h2 className=" text-justify font-medium">
                <b className="text-[#205AFC]">Isyaratlingo</b> adalah sebuah
                website pembelajaran bahasa isyarat BISINDO yang inovatif dan
                menarik, dikembangkan dengan konsep gamifikasi. Website ini
                terinspirasi oleh metode gamifikasi yang digunakan oleh{" "}
                <a
                  href="https://www.duolingo.com/"
                  className="font-bold text-[#58C706]">
                  Duolingo{" "}
                </a>
                bertujuan untuk membantu pengguna dalam mempelajari bahasa
                isyarat dengan cara yang menyenangkan dan interaktif.
                <br />
                <br />
                Dengan menggunakan metodologi gamifikasi, Isyaratlingo
                menyajikan pembelajaran bahasa isyarat sebagai sebuah permainan
                yang menantang, di mana pengguna akan meraih poin, mencapai
                level, dan mendapatkan hadiah sebagai penghargaan atas prestasi
                mereka dalam belajar bahasa isyarat. Fitur ini akan meningkatkan
                motivasi pengguna untuk aktif berpartisipasi dan berinteraksi
                dengan konten pembelajaran.
              </h2>
            </div>
            <img
              className=" w-2/5"
              src={AboutImage}
              alt="Image by vectorjuice on Freepik"
            />
          </div>

          <div
            data-aos="zoom-in"
            data-aos-offset="200"
            data-aos-delay="50"
            data-aos-duration="750"
            data-aos-easing="ease-in-out"
            className="divider mx-80 my-10"
          />

          {/* What is BISINDO */}
          <div
            data-aos="zoom-in-right"
            data-aos-offset="200"
            data-aos-delay="50"
            data-aos-duration="750"
            data-aos-easing="ease-in-out"
            className="my-10">
            <div className="flex flex-row px-52 gap-20 ">
              <img
                className="w-2/5"
                src={BisindoImage}
                alt="Image by vectorjuice on Freepik"
              />
              <div className="flex flex-col gap-10 py-5">
                <h1 className="text-5xl font-bold text-[#205AFC] underline-title mx-12">
                  What is BISINDO ?
                </h1>
                <h2 className=" text-justify font-medium">
                  <b className="text-[#205AFC]">BISINDO</b> adalah singkatan
                  dari Bahasa Isyarat Indonesia. Ini adalah bahasa isyarat yang
                  digunakan oleh komunitas tunarungu di Indonesia sebagai sarana
                  komunikasi mereka. BISINDO bukanlah bahasa verbal, melainkan
                  sebuah sistem bahasa isyarat yang menggunakan gerakan tangan,
                  ekspresi wajah, dan tubuh untuk menyampaikan makna dan
                  komunikasi.
                  <br />
                  <br />
                  Setiap gerakan tangan dan ekspresi wajah dalam BISINDO
                  memiliki arti dan makna tertentu, sehingga membentuk kalimat
                  dan komunikasi yang lengkap dan bermakna. BISINDO juga
                  memiliki struktur tata bahasa sendiri, yang berbeda dengan
                  bahasa verbal seperti bahasa Indonesia, Inggris, atau
                  bahasa-bahasa lainnya.
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* How it works */}
        {/* <div className="min-h-screen">
          <div className="bg-[#205AFC] mx-20 rounded-lg text-white">
            Hello World !
          </div>
        </div> */}

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
