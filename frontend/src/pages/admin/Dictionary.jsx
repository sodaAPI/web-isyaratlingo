import { useState, useEffect } from "react";
import Sidebar from "../../components/SidebarLearning";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ListDictionary from "./dictionary/listDictionary";

export default function Shop() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);
  const [vocabs, setVocabs] = useState([]);

  useEffect(() => {
    getShops();
  }, []);

  const getShops = async () => {
    const response = await axios.get(`http://localhost:5000/dictionary`);
    setVocabs(response.data);
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
    let path = "/admin/dashboard/dictionary/add";
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
              <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
            </svg>
            Dictionary
          </span>
          <span className="font-semibold text-[#777777]">
            Configure Dictionary
          </span>
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
                  d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                  clip-rule="evenodd"
                />
              </svg>
              Total Vocabs
            </span>
            <span className="flex items-center justify-center text-2xl">
              {vocabs.length}
            </span>
            <span className="text-sm text-center">
              Registered vocabs at dictionary
            </span>
          </div>
        </div>
        <button
          onClick={addItem}
          className="btn-register flex flex-row gap-2 text-white font-bold rounded-full py-3 px-5">
          Add New Vocab{" "}
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
        </button>
        <ListDictionary />
      </div>
    </div>
  );
}
