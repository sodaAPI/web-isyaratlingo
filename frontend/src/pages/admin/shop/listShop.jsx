import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../../../components/Pagination";

export default function listShop() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    const response = await axios.get(`http://localhost:5000/shop`);
    setItems(response.data);
  };

  const deleteItem = async (uuid) => {
    await axios.delete(`http://localhost:5000/shop/${uuid}`);
    getItems();
  };

  const formatTimestamp = (timestamp) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: "Asia/Jakarta",
    };
    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(timestamp)
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col mt-7">
      <div className="flex flex-row pb-5">
        <div className="bg-[#58CC02] p-3 rounded-l-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            class="w-6 h-6">
            <path
              fill-rule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <input
          className="p-3 font-semibold px-3 rounded-r-xl round border bg-white border-[#B7B6B8]"
          type="text"
          placeholder="Search Items..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      <table className="table w-11/12 bg-[#007bff] rounded-lg text-white">
        <thead className="text-white text-center">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Desciption</th>
            <th>Created At</th>
            <th>Update At</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody className="text-center">
          {items
            .filter(
              (item) =>
                new RegExp(searchTerm, "i").test(item.id) ||
                new RegExp(searchTerm, "i").test(item.name) ||
                new RegExp(searchTerm, "i").test(item.price) ||
                item.image ||
                new RegExp(searchTerm, "i").test(item.description) ||
                new RegExp(searchTerm, "i").test(item.createdAt) ||
                new RegExp(searchTerm, "i").test(item.updatedAt)
            )
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  {/* Display the image using the URL */}
                  <img
                    className="w-20"
                    src={`http://localhost:5000/${item.image}`}
                    alt={item.name}
                  />
                </td>
                <td>{item.description}</td>
                <td>{formatTimestamp(item.createdAt)}</td>
                <td>{formatTimestamp(item.updatedAt)}</td>
                <td>
                  <Link
                    to={`/admin/dashboard/shop/edit/${item.uuid}`}
                    className="flex flex-row gap-2 items-center justify-center bg-green-500 p-2 rounded-lg text-white">
                    Edit
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="w-6 h-6">
                      <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                      <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                    </svg>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={items.length}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}
