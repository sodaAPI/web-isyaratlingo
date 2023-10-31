import { useState, useEffect } from "react";
import Sidebar from "../../components/SidebarLearning";
import RightDetail from "../../components/RightDetail";
import axios from "axios";

export default function Shop() {
  const [items, setItems] = useState([]);

  const getItems = async () => {
    const response = await axios.get(`http://localhost:5000/shop`);
    setItems(response.data);
  };

  const buyItem = async (itemUuid) => {
    const confirmBuy = window.confirm(
      "Are you sure you want to buy this item?"
    );

    if (confirmBuy) {
      try {
        const response = await axios.post(
          `http://localhost:5000/shop/buy/${itemUuid}`
        );
        if (response.status === 200) {
          // Refresh the page when the item is successfully bought
          window.location.reload();
          window.alert("Item Bought Successfully");
        } else {
          window.alert("Failed to buy item.");
        }
      } catch (error) {        
        window.alert("Error: " + error.message);
      }
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div>
      <Sidebar />
      <div className=" flex flex-row gap-10 text-start p-2 mt-7 ml-[275px]">
        <section>
          <div className="flex flex-col text-white btn-login rounded-3xl px-7 py-4 mb-5 h-[75px] w-[750px]">
            <h1 className="flex flex-row items-center gap-2 font-bold text-3xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#A56644"
                class="w-10 h-10">
                <path d="M5.223 2.25c-.497 0-.974.198-1.325.55l-1.3 1.298A3.75 3.75 0 007.5 9.75c.627.47 1.406.75 2.25.75.844 0 1.624-.28 2.25-.75.626.47 1.406.75 2.25.75.844 0 1.623-.28 2.25-.75a3.75 3.75 0 004.902-5.652l-1.3-1.299a1.875 1.875 0 00-1.325-.549H5.223z" />
                <path
                  fill-rule="evenodd"
                  d="M3 20.25v-8.755c1.42.674 3.08.673 4.5 0A5.234 5.234 0 009.75 12c.804 0 1.568-.182 2.25-.506a5.234 5.234 0 002.25.506c.804 0 1.567-.182 2.25-.506 1.42.674 3.08.675 4.5.001v8.755h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3zm3-6a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v3a.75.75 0 01-.75.75h-3a.75.75 0 01-.75-.75v-3zm8.25-.75a.75.75 0 00-.75.75v5.25c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-5.25a.75.75 0 00-.75-.75h-3z"
                  clip-rule="evenodd"
                />
              </svg>
              Shop
            </h1>
          </div>
          <ul className="px-8 w-[750px] py-5 rounded-3xl bg-slate-50">
            {items.map((item, index) => (
              <li key={index}>
                <div className="flex flex-col">
                  <div className="flex flex-row gap-2 font-bold text-2xl pb-5">
                    <img
                      className="w-[100px] h-[100px]"
                      src={`http://localhost:5000/${item.image}`}
                      alt={item.name}
                    />
                    <div className="flex flex-col gap-2">
                      {item.name}
                      <div className="font-medium text-sm text-justify ">
                        {item.description}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => buyItem(item.uuid)}
                    className="flex flex-row my-5 gap-2 btn-register text-white font-semibold text-lg items-center justify-center text-center rounded-2xl h-[50px] w-[150px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="yellow"
                      class="w-6 h-6">
                      <path
                        fill-rule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clip-rule="evenodd"
                      />
                    </svg>{" "}
                    {item.price} Points
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
        <RightDetail />
      </div>
    </div>
  );
}
