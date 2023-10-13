import { useState, useEffect } from "react";
import Sidebar from "../../components/SidebarLearning";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import ListShop from "./shop/listShop";
import axios from "axios";

export default function Shop() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);
  const [shops, setShops] = useState([]);

  useEffect(() => {
    getShops();
  }, []);

  const getShops = async () => {
    const response = await axios.get(`http://localhost:5000/shop`);
    setShops(response.data);
  };

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError, navigate]);

  const addItem = async () => {
    let path = "/admin/dashboard/shop/add";
    navigate(path);
  };

  return (
    <div className="flex flex-col">
      <Sidebar />
      <div className=" text-start p-2 mt-7 ml-[275px]">
        <div className="flex flex-col gap-2">
          <span className="flex flex-row gap-2 items-center text-4xl font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-10 h-10">
              <path d="M5.223 2.25c-.497 0-.974.198-1.325.55l-1.3 1.298A3.75 3.75 0 007.5 9.75c.627.47 1.406.75 2.25.75.844 0 1.624-.28 2.25-.75.626.47 1.406.75 2.25.75.844 0 1.623-.28 2.25-.75a3.75 3.75 0 004.902-5.652l-1.3-1.299a1.875 1.875 0 00-1.325-.549H5.223z" />
              <path
                fill-rule="evenodd"
                d="M3 20.25v-8.755c1.42.674 3.08.673 4.5 0A5.234 5.234 0 009.75 12c.804 0 1.568-.182 2.25-.506a5.234 5.234 0 002.25.506c.804 0 1.567-.182 2.25-.506 1.42.674 3.08.675 4.5.001v8.755h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3zm3-6a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v3a.75.75 0 01-.75.75h-3a.75.75 0 01-.75-.75v-3zm8.25-.75a.75.75 0 00-.75.75v5.25c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-5.25a.75.75 0 00-.75-.75h-3z"
                clip-rule="evenodd"
              />
            </svg>
            Shop
          </span>
          <span className="font-semibold text-[#777777]">Configure Shop</span>
        </div>
        <div className="flex flex-row py-10 gap-7">
          <div className="flex flex-col gap-3 text-white btn-login rounded-xl w-80 px-10 py-3">
            <span className="flex flex-row text-left items-start gap-2 font-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6">
                <path
                  fill-rule="evenodd"
                  d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
                  clip-rule="evenodd"
                />
              </svg>
              Total Items
            </span>
            <span className="flex items-center justify-center text-2xl">
              {shops.length}
            </span>
            <span className="text-sm text-center">
              Registered items at shop
            </span>
          </div>
        </div>
        {/* <button
          onClick={addItem}
          className="btn-register flex flex-row gap-2 text-white font-bold rounded-full py-3 px-5">
          Add New Item{" "}
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
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button> */}
        <ListShop />
      </div>
    </div>
  );
}
