import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Listbox, Transition } from "@headlessui/react";
import Sidebar from "../../../components/SidebarLearning";

const rolesList = ["user", "admin"];

export default function editUser() {
  const [uid, setUID] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null); // Use null as initial state for image
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [roles, setRoles] = useState(rolesList[0]);
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [score, setScore] = useState("");
  const [point, setPoint] = useState("");
  const [progresslevel, setProgressLevel] = useState("");
  const [winstreak, setWinstreak] = useState("");
  const [guard, setGuard] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const { uuid } = useParams();
  const navigate = useNavigate();

  const formatTimestamp = (timestamp) => {
    if (!timestamp) {
      return ""; // Return an empty string for undefined or empty timestamps
    }
    try {
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        timeZone: "Asia/Jakarta",
      };
      // Use a console.log to inspect the timestamp before passing it to the Date constructor
      console.log("Input timestamp:", timestamp);

      return new Intl.DateTimeFormat("en-US", options).format(
        new Date(timestamp)
      );
    } catch (error) {
      console.error("Error formatting timestamp:", error);
      return ""; // Return an empty string for invalid timestamps
    }
  };

  const updateUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("age", age);
    formData.append("roles", roles);
    formData.append("password", password);
    formData.append("confirmpassword", confirmpassword);
    formData.append("score", score);
    formData.append("point", point);
    formData.append("progresslevel", progresslevel);
    formData.append("winstreak", winstreak);
    formData.append("guard", guard);
    formData.append("createdAt", createdAt);
    formData.append("updatedAt", updatedAt);
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.patch(`http://localhost:5000/user/${uuid}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the correct content type
        },
      });

      let path = "/admin/dashboard/user";
      navigate(path);
      window.alert("Profile Updated Successfully");
    } catch (error) {
      console.error("Error Updated Profile:", error);
      window.alert("Error Updated Profile.");
    }
  };

  useEffect(() => {
    getUserById();
  }, []);

  const getUserById = async () => {
    const response = await axios.get(`http://localhost:5000/user/${uuid}`);
    setUID(response.data.uuid);
    setName(response.data.name);
    setEmail(response.data.email);
    setAge(response.data.age);
    setRoles(response.data.roles);
    setPassword(response.data.password);
    setScore(response.data.score);
    setPoint(response.data.point);
    setProgressLevel(response.data.progresslevel);
    setWinstreak(response.data.winstreak);
    setGuard(response.data.guard);
    setCreatedAt(response.data.createdAt);
    setUpdatedAt(response.data.updatedAt);
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="flex flex-col">
      <Sidebar />
      <div className="flex flex-col items-center  justify-center min-w-max mt-7">
        <div className="py-5">
          <span className="text-xl font-bold">Edit User</span>
        </div>
        <form onSubmit={updateUser}>
          <div>
            <section className="grid grid-cols-2 gap-6">
              {/* UUID */}

              <div>
                <label className="label font-bold">UUID</label>
                <input
                  className="py-2 [width:300px] text-slate-500 font-semibold px-3 rounded-lg border bg-white border-[#B7B6B8]"
                  type="text"
                  placeholder="UUID"
                  value={uid}
                  disabled
                  onChange={(e) => setUID(e.target.value)}
                />
              </div>

              {/* Roles */}

              <div className="pt-2">
                <Listbox
                  as="div"
                  className="space-y-1"
                  value={roles}
                  onChange={setRoles}>
                  {({ open }) => (
                    <>
                      <Listbox.Label className="block font-bold text-start">
                        Roles
                      </Listbox.Label>
                      <div className="flex">
                        <span className="inline-block [width:300px]  rounded-md shadow-sm">
                          <Listbox.Button className="cursor-default h-11 relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                            <span className="block truncate text-gray-900">
                              {roles}
                            </span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              <svg
                                className="h-5 w-5 text-gray-700"
                                viewBox="0 0 20 20"
                                fill="none"
                                stroke="currentColor">
                                <path
                                  d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                          </Listbox.Button>
                        </span>

                        <Transition
                          show={open}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                          className="absolute mt-12 [width:300px] rounded-lg bg-white shadow-lg">
                          <Listbox.Options
                            static
                            className="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5">
                            {rolesList.map((rolesList) => (
                              <Listbox.Option key={rolesList} value={rolesList}>
                                {({ selected, active }) => (
                                  <div
                                    className={`${
                                      active
                                        ? "  bg-blue-600 rounded-lg text-white"
                                        : "text-gray-900"
                                    } cursor-default  select-none relative py-2 pl-8 pr-4`}>
                                    <span
                                      className={`${
                                        selected
                                          ? "font-semibold"
                                          : "font-normal"
                                      } block truncate`}>
                                      {rolesList}
                                    </span>
                                    {selected && (
                                      <span
                                        className={`${
                                          active ? " " : "text-blue-600"
                                        } absolute inset-y-0 left-0 flex items-center pl-1.5`}>
                                        <svg
                                          className="h-5 w-5"
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 20 20"
                                          fill="currentColor">
                                          <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                      </span>
                                    )}
                                  </div>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </>
                  )}
                </Listbox>
              </div>

              {/* Name */}

              <div>
                <label className="label font-bold">Name</label>
                <input
                  className="py-2 [width:300px] font-semibold px-3 rounded-lg border bg-white border-[#B7B6B8]"
                  type="name"
                  placeholder="Name"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Image */}

              <div>
                <label className="label  font-bold">Photo Profile</label>
                <input
                  className="py-2 [width:300px] font-semibold px-3 rounded-lg border bg-white border-[#B7B6B8]"
                  type="file"
                  accept="image/*" // Accept only image files
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>

              {/* Email */}

              <div>
                <label className="label  font-bold">Email</label>
                <input
                  className="py-2 [width:300px] font-semibold px-3 rounded-lg border bg-white border-[#B7B6B8]"
                  type="email"
                  placeholder="Email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Age */}

              <div>
                <label className="label font-bold">Age</label>
                <input
                  className="py-2 [width:300px] font-semibold px-3 rounded-lg border bg-white border-[#B7B6B8]"
                  type="number"
                  placeholder="Age"
                  value={age}
                  required
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>

              {/* Score */}

              <div>
                <label className="label font-bold">Score</label>
                <input
                  className="py-2 [width:300px] font-semibold px-3 rounded-lg border bg-white border-[#B7B6B8]"
                  type="number"
                  placeholder="Score"
                  value={score}
                  required
                  onChange={(e) => setScore(e.target.value)}
                />
              </div>

              {/* Point */}

              <div>
                <label className="label font-bold">Point</label>
                <input
                  className="py-2 [width:300px] font-semibold px-3 rounded-lg border bg-white border-[#B7B6B8]"
                  type="number"
                  placeholder="Point"
                  value={point}
                  required
                  onChange={(e) => setPoint(e.target.value)}
                />
              </div>

              {/* Winstreak */}

              <div>
                <label className="label font-bold">Winstreak</label>
                <input
                  className="py-2 [width:300px] font-semibold px-3 rounded-lg border bg-white border-[#B7B6B8]"
                  type="number"
                  placeholder="Winstreak"
                  value={winstreak}
                  required
                  onChange={(e) => setWinstreak(e.target.value)}
                />
              </div>

              {/* Guard */}

              <div>
                <label className="label font-bold">Guard</label>
                <input
                  className="py-2 [width:300px] font-semibold px-3 rounded-lg border bg-white border-[#B7B6B8]"
                  type="number"
                  placeholder="Guard"
                  value={guard}
                  required
                  onChange={(e) => setGuard(e.target.value)}
                />
              </div>

              {/* Password*/}

              <div>
                <label className="label font-bold ">Password</label>
                <input
                  className="py-2 [width:300px] font-semibold px-3 rounded-lg border bg-white border-[#B7B6B8]"
                  type={passwordVisible ? "text" : "password"}
                  placeholder={passwordVisible ? "Password" : "********"}
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Created At */}

              <div>
                <label className="label font-bold">Created At</label>
                <input
                  className="py-2 [width:300px] text-slate-500 font-semibold px-3 rounded-lg border bg-white border-[#B7B6B8]"
                  type="text"
                  placeholder="Created At"
                  value={formatTimestamp(createdAt)}
                  required
                  onChange={(e) => setCreatedAt(e.target.value)}
                  disabled
                />
              </div>

              {/* Confirm Password*/}

              <div>
                <label className="label font-bold ">Confirm Password</label>
                <input
                  className="py-2 [width:300px] font-semibold px-3 rounded-lg border bg-white border-[#B7B6B8]"
                  type={passwordVisible ? "text" : "password"}
                  placeholder={
                    passwordVisible ? "Confirm Password" : "********"
                  }
                  value={confirmpassword}
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              {/* Updated At */}

              <div>
                <label className="label font-bold">Updated At</label>
                <input
                  className="py-2 [width:300px] text-slate-500 font-semibold px-3 rounded-lg border bg-white border-[#B7B6B8]"
                  type="text"
                  placeholder="Updated At"
                  value={formatTimestamp(updatedAt)}
                  onChange={(e) => setUpdatedAt(e.target.value)}
                  disabled
                />
              </div>

              <div className="col-span-2">
                <label
                  htmlFor="toggle-password-visibility"
                  className="cursor-pointer text-start select-none text-gray-700">
                  <input
                    type="checkbox"
                    id="toggle-password-visibility"
                    onChange={() => setPasswordVisible(!passwordVisible)}
                    className="bg-white mr-2 mt-5"
                  />
                  <span className="pt-0.5 text-slate-400">Show password</span>
                </label>
              </div>

              {/* Button */}
              <div className="col-span-2">
                <button className="btn-register [width:300px] py-3 rounded-full font-bold normal-case text-lg text-white hover:text-green-100">
                  Update User
                </button>
              </div>
            </section>
          </div>
        </form>
      </div>
    </div>
  );
}
