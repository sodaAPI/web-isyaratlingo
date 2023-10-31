import React, { useState, useEffect } from "react";
import Logo from "../images/logo-blu.png";
import { useDispatch, useSelector } from "react-redux";
import { getMe, LogOut, reset } from "../auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function NavbarLearning() {
  const sidebarItems = [
    {
      Icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#FFC800"
          class="w-8 h-8">
          <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
          <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
        </svg>
      ),
      Title: "LEARN",
      href: "/learning", // Add the href attribute for the first item
    },
    {
      Icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#1CB0F6"
          class="w-8 h-8">
          <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
        </svg>
      ),
      Title: "DICTIONARY",
      href: "/dictionary", // Add the href attribute for the first item
    },
    {
      Icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#FED84E"
          class="w-8 h-8">
          <path
            fill-rule="evenodd"
            d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm4.5 7.5a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75zm3.75-1.5a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0V12zm2.25-3a.75.75 0 01.75.75v6.75a.75.75 0 01-1.5 0V9.75A.75.75 0 0113.5 9zm3.75-1.5a.75.75 0 00-1.5 0v9a.75.75 0 001.5 0v-9z"
            clip-rule="evenodd"
          />
        </svg>
      ),
      Title: "LEADERBOARD",
      href: "/leaderboard", // Add the href attribute for the first item
    },
    {
      Icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#A56644"
          class="w-8 h-8">
          <path d="M5.223 2.25c-.497 0-.974.198-1.325.55l-1.3 1.298A3.75 3.75 0 007.5 9.75c.627.47 1.406.75 2.25.75.844 0 1.624-.28 2.25-.75.626.47 1.406.75 2.25.75.844 0 1.623-.28 2.25-.75a3.75 3.75 0 004.902-5.652l-1.3-1.299a1.875 1.875 0 00-1.325-.549H5.223z" />
          <path
            fill-rule="evenodd"
            d="M3 20.25v-8.755c1.42.674 3.08.673 4.5 0A5.234 5.234 0 009.75 12c.804 0 1.568-.182 2.25-.506a5.234 5.234 0 002.25.506c.804 0 1.567-.182 2.25-.506 1.42.674 3.08.675 4.5.001v8.755h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3zm3-6a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v3a.75.75 0 01-.75.75h-3a.75.75 0 01-.75-.75v-3zm8.25-.75a.75.75 0 00-.75.75v5.25c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-5.25a.75.75 0 00-.75-.75h-3z"
            clip-rule="evenodd"
          />
        </svg>
      ),
      Title: "SHOP",
      href: "/shop", // Add the href attribute for the first item
    },
    {
      Icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#009946"
          class="w-8 h-8">
          <path
            fill-rule="evenodd"
            d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            clip-rule="evenodd"
          />
        </svg>
      ),
      Title: "PROFILE",
      href: "/profile", // Add the href attribute for the first item
    },
  ];

  const adminSidebar = [
    {
      Icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#CE82FF"
          class="w-8 h-8">
          <path
            fill-rule="evenodd"
            d="M2.25 6a3 3 0 013-3h13.5a3 3 0 013 3v12a3 3 0 01-3 3H5.25a3 3 0 01-3-3V6zm3.97.97a.75.75 0 011.06 0l2.25 2.25a.75.75 0 010 1.06l-2.25 2.25a.75.75 0 01-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 010-1.06zm4.28 4.28a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
            clip-rule="evenodd"
          />
        </svg>
      ),
      Title: "ADMIN",
    },
  ];

  const adminContent = [
    {
      Icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6">
          <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
          <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
        </svg>
      ),
      Title: "HOME",
      href: "/admin/dashboard", // Add the href attribute for the first item
    },
    {
      Icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6">
          <path
            fill-rule="evenodd"
            d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
            clip-rule="evenodd"
          />
        </svg>
      ),
      Title: "USER",
      href: "/admin/dashboard/user", // Add the href attribute for the first item
    },
    {
      Icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6">
          <path
            fill-rule="evenodd"
            d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
            clip-rule="evenodd"
          />
        </svg>
      ),
      Title: "SHOP",
      href: "/admin/dashboard/shop", // Add the href attribute for the first item
    },
    {
      Icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6">
          <path
            fill-rule="evenodd"
            d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
            clip-rule="evenodd"
          />
        </svg>
      ),
      Title: "DICTIONARY",
      href: "/admin/dashboard/dictionary", // Add the href attribute for the first item
    },
  ];

  const logoutButton = [
    {
      Icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#FF2B2B"
          class="w-8 h-8">
          <path
            fill-rule="evenodd"
            d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z"
            clip-rule="evenodd"
          />
        </svg>
      ),
      Title: "LOGOUT",
    },
  ];

  const [selectedItem, setSelectedItem] = useState(""); // Initialize the state with an empty string
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // Replace 'userRoles' with the actual roles of the logged-in user from your application
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    // When the component mounts or the URL changes, update the selectedItem state
    setSelectedItem(window.location.pathname);
  }, []);

  const handleItemClick = (href) => {
    setSelectedItem(href);
  };

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError, navigate]);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      {/* Bottom Nav
      <div className="lg:hidden">
        <div className="btm-nav">
          <ul className="flex flex-row gap-5 md:gap-12 bg-slate-50 mb-5">
            {sidebarItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  data-tip={item.Title}
                  className={`flex items-center tooltip-top px-4 py-2 rounded-lg group ${
                    selectedItem === item.href ||
                    (selectedItem === "/admin/dashboard" &&
                      item.href === "/admin/dashboard")
                      ? "border-2 bg-[#dfeeff] border-[#84D8FF] text-[#268efe]"
                      : "text-[#777777] hover:bg-[#e5f7ff]"
                  }`}
                  onClick={() => handleItemClick(item.href)}>
                  {item.Icon}
                </a>
              </li>
            ))}

            {logoutButton.map((item, index) => (
              <li key={index}>
                <button
                  className="flex items-center px-4 py-2 rounded-lg group text-[#777777] hover:bg-[#e5f7ff]"
                  onClick={logout}>
                  {item.Icon}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div> */}

      {/* Sidebar */}
      <div className="">
        <aside
          id="default-sidebar"
          class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full lg:translate-x-0"
          aria-label="Sidebar">
          <div class="h-full px-3 py-4 overflow-y-auto bg-[#F3F0FB] border-2 border-r-slate-300">
            <a class="flex items-center pl-4 py-4 mb-5">
              <img src={Logo} class="h-10 mr-3" alt="Isyaratlingo Logo" />
            </a>
            <ul className="space-y-3 pl-2 font-bold">
              {sidebarItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className={`flex items-center px-4 py-2 rounded-lg group ${
                      selectedItem === item.href ||
                      (selectedItem === "/admin/dashboard" &&
                        item.href === "/admin/dashboard")
                        ? "border-2 bg-[#dfeeff] border-[#84D8FF] text-[#268efe]"
                        : "text-[#777777] hover:bg-[#e5f7ff]"
                    }`}
                    onClick={() => handleItemClick(item.href)}>
                    {item.Icon}
                    <span className="ml-3">{item.Title}</span>
                  </a>
                </li>
              ))}

              {user && user.roles === "admin" && (
                <ul className="space-y-3 font-bold">
                  {adminSidebar.map((item, index) => (
                    <li key={index}>
                      <button
                        href={item.href}
                        className={`flex px-4 py-2 items-center w-full text-base text-[#777777] transition duration-75 rounded-lg group hover:bg-gray-100 ${
                          isDropdownOpen
                            ? "dark:hover:text-white dark:hover:bg-[#268efe]"
                            : "dark:text-[#777777] dark:group-hover:text-white"
                        }`}
                        onClick={toggleDropdown}>
                        {item.Icon}
                        <span className="flex-1 ml-3 text-left whitespace-nowrap">
                          {item.Title}
                        </span>
                        <svg
                          className={`w-4 h-4 ml-2 ${
                            isDropdownOpen ? "rotate-180" : ""
                          } transition-transform`}
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 8 4">
                          <path
                            d="M1 1l2 2 2-2"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </li>
                  ))}

                  <ul
                    className={`${
                      isDropdownOpen
                        ? "block bg-[#f7f7fb]  rounded-lg"
                        : "hidden"
                    } py-2 space-y-2`}>
                    {adminContent.map((item, index) => (
                      <li key={index}>
                        <a
                          href={item.href}
                          className={`flex items-center px-4 py-2 rounded-lg group ${
                            selectedItem === item.href ||
                            (selectedItem === "/admin/dashboard" &&
                              item.href === "/admin/dashboard")
                              ? "border-2 bg-[#dfeeff] border-[#84D8FF] text-[#268efe]"
                              : "text-[#777777] hover:bg-[#e5f7ff]"
                          }`}
                          onClick={() => handleItemClick(item.href)}>
                          {item.Icon}
                          <span className="ml-3">{item.Title}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </ul>
              )}

              {logoutButton.map((item, index) => (
                <li key={index}>
                  <button
                    className="flex items-center px-4 py-2 rounded-lg group text-[#777777] hover:bg-[#e5f7ff]"
                    onClick={logout}>
                    {item.Icon}
                    <span className="ml-3">{item.Title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
