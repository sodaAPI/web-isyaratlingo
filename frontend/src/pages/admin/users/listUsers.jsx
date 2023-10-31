import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../../../components/Pagination";

export default function listUsers() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get(`http://localhost:5000/user`);
    setUsers(response.data);
  };

  const deleteUser = async (uuid) => {
    await axios.delete(`http://localhost:5000/user/${uuid}`);
    getUsers();
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
          placeholder="Search Users..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      <div className=" overflow-x-auto">
        <table className="table w-11/12 bg-[#007bff] rounded-lg text-white">
          <thead className="text-white text-center">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Photo</th>
              <th>Age</th>
              <th>Email</th>
              <th>Roles</th>
              <th>Scores</th>
              <th>Point</th>
              <th>Progress Level</th>
              <th>Guard</th>
              <th>Created At</th>
              <th>Update At</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody className="text-center">
            {users
              .filter(
                (user) =>
                  new RegExp(searchTerm, "i").test(user.id) ||
                  new RegExp(searchTerm, "i").test(user.name) ||
                  new RegExp(searchTerm, "i").test(user.age) ||
                  new RegExp(searchTerm, "i").test(user.email) ||
                  new RegExp(searchTerm, "i").test(user.roles) ||
                  new RegExp(searchTerm, "i").test(user.score) ||
                  new RegExp(searchTerm, "i").test(user.point) ||
                  new RegExp(searchTerm, "i").test(user.progresslevel) ||
                  new RegExp(searchTerm, "i").test(user.guard) ||
                  new RegExp(searchTerm, "i").test(user.createdAt) ||
                  new RegExp(searchTerm, "i").test(user.updatedAt)
              )
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>
                    {" "}
                    {/* Display the image using the URL */}
                    <img
                      className="w-20"
                      src={`http://localhost:5000/${user.image}`}
                      alt={user.name}
                    />
                  </td>
                  <td>{user.age}</td>
                  <td>{user.email}</td>
                  <td>{user.roles}</td>
                  <td>{user.score}</td>
                  <td>{user.point}</td>
                  <td>{user.progresslevel}</td>
                  <td>{user.guard - 1}</td>
                  <td>{formatTimestamp(user.createdAt)}</td>
                  <td>{formatTimestamp(user.updatedAt)}</td>
                  <td>
                    <Link
                      to={`/admin/dashboard/user/edit/${user.uuid}`}
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
                  <td>
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you wish to delete this item?"
                          )
                        )
                          deleteUser(user.uuid);
                      }}
                      className=" flex flex-row gap-2 items-center justify-center bg-red-700 p-2 rounded-lg text-white">
                      Delete
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-6 h-6">
                        <path
                          fill-rule="evenodd"
                          d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={users.length}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}
