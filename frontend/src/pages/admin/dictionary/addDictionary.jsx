import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/SidebarLearning";

const categoryList = ["Family", "Foods", "Sports", "Animals"];

export default function addDictionary() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [categories, setCategories] = useState(categoryList[0]);
  const navigate = useNavigate();

  const saveVocab = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/user", {
      name: name,
      image: image,
      categories: categories,
    });
    let path = "/admin/dashboard/user";
    navigate(path);
    window.alert("User Added Successfully");
  };

  return (
    <div className="flex flex-col">
      <Sidebar />
      <div className="flex flex-col items-center  justify-center min-w-max mt-7">
        <div className="py-5">
          <span className="text-xl font-bold">Add User</span>
        </div>
        <form onSubmit={saveVocab}>
          <div>
            <section className="grid grid-cols-2 gap-6">
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
                <label className="label  font-bold">Image</label>
                <input
                  className="py-2 [width:300px] font-semibold px-3 rounded-lg border bg-white border-[#B7B6B8]"
                  type="image"
                  placeholder="Image"
                  value={image}
                  required
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>

              {/* Categories */}

              <div className="pt-2">
                <Listbox
                  as="div"
                  className="space-y-1"
                  value={categories}
                  onChange={setCategories}>
                  {({ open }) => (
                    <>
                      <Listbox.Label className="block font-bold text-start">
                        Roles
                      </Listbox.Label>
                      <div className="flex">
                        <span className="inline-block [width:300px]  rounded-md shadow-sm">
                          <Listbox.Button className="cursor-default h-11 relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                            <span className="block truncate text-gray-900">
                              {categories}
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
                            {categoryList.map((categoryList) => (
                              <Listbox.Option key={categoryList} value={categoryList}>
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
                                      {categoryList}
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

              {/* Button */}
              <div className="col-span-2">
                <button className="btn-register [width:300px] py-3 rounded-full font-bold normal-case text-lg text-white hover:text-green-100">
                  Add User
                </button>
              </div>
            </section>
          </div>
        </form>
      </div>
    </div>
  );
}
