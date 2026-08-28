import { Link, useNavigate, NavLink } from "react-router-dom";
// import Register from "./../Auth/Register/Register";
import { UserData } from "../../Context/UserData";
import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Button, Dropdown, Label } from "@heroui/react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import NotificationCard from "./../NotificationCard/NotificationCard";
import link from "../../assets/images/link.png";
import socialMMedia from "../../assets/images/social-media.png";
import copyLink from "../../assets/images/copy-link.png";
import BarSearch from "../SearchBar/BarSearch";

export default function Navbar() {
  const { data: userData } = useContext(AuthContext);

  const { userToken, setToken } = useContext(UserData);
  const navigate = useNavigate();

  function signOut() {
    localStorage.removeItem("userToken");
    setToken(null);
    navigate("/login");
  }

  function getNotification() {
    return axios.get(
      `https://route-posts.routemisr.com/notifications?unread=false&page=1&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }
  const { data: notificationsData } = useQuery({
    queryKey: "getNotification",
    queryFn: getNotification,
    select: (res) => res?.data.data.notifications,
  });

  return (
    <div>
      <div className="navbar flex  justify-between  shadow-sm px-3 lg:px-12 bg-[#ededed]   border-b border-[#c1bebe] rounded-b-xl fixed top-0 right-0 left-0 z-50">
        <div className="flex justify-between lg:w-[60%]">
          <div className="logo flex items-center gap-2">
            <div>
              <img src={copyLink} alt="social-media" className="size-10" />
              <h1 className="text-2xl font-bold hidden"> Sociam</h1>
            </div>
            <BarSearch />
          </div>

          <div className="">
            <div className="flex justify-center">
              {userToken !== "null" ? (
                <>
                  {/* navLinks section */}
                  <div className="hidden md:block bg-white mx-2  py-1.5  rounded-full">
                    <NavLink
                      to="/"
                      className="btn text=[#0E0E10] font-medium text-[15px] xl:text-[16.5px] mx-0.5 xl:mx-2 px-5  rounded-full hover:bg-[#EAEAEA] transition-all duration-300"
                    >
                      Home
                    </NavLink>
                    <NavLink
                      to={`/profile/${userData?.id}`}
                      className="btn text=[#0E0E10] font-medium text-[15px] xl:text-[16.5px] mx-0.5 xl:mx-2 px-5  rounded-full hover:bg-[#EAEAEA] transition-all duration-300"
                    >
                      Profile
                    </NavLink>
                    <NavLink
                      to="/about"
                      className="btn text=[#0E0E10] font-medium text-[15px] xl:text-[16.5px] mx-0.5 xl:mx-2 px-5 rounded-full hover:bg-[#EAEAEA] transition-all duration-300"
                    >
                      Reels
                    </NavLink>
                  </div>
                </>
              ) : (
                <Link to="login" className="btn btn-ghost text-xl">
                  {/* Social App */}
                  Sociam
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="flex">
          {userToken !== "null" ? (
            <div className="flex justify-center items-center gap-2 lg:gap-4">
              <Dropdown>
                <Button
                  aria-label="Menu"
                  variant=""
                  className="bg-white relative"
                >
                  <i class="fa-brands fa-facebook-messenger text-xl"></i>
                  <div className="size-3.25 rounded-full bg-[#F6A940] absolute top-0 -right-0.5"></div>
                </Button>
                <Dropdown.Popover
                  placement="bottom end"
                  className="w-80 sm:w-96"
                >
                  <Dropdown.Menu
                    // className="w-full max-h-96 overflow-y-auto"
                    onAction={(key) => console.log(`Selected: ${key}`)}
                  >
                    {notificationsData?.map((notification) => (
                      <Dropdown.Item
                        className=""
                        key={notification._id}
                        id={notification._id}
                      >
                        <div className="w-full">
                          <NotificationCard notification={notification} />
                        </div>
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
              <Dropdown>
                <Button
                  aria-label="Menu"
                  variant=""
                  className="bg-white relative "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5.5 text-[#0E0E10]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
                    />
                  </svg>
                  <div className="size-3.25 rounded-full bg-[#F6A940] absolute top-0 -right-0.5"></div>
                </Button>
                <Dropdown.Popover
                  placement="bottom end"
                  className="w-80 sm:w-96"
                >
                  <Dropdown.Menu
                    // className="w-full max-h-96 overflow-y-auto"
                    onAction={(key) => console.log(`Selected: ${key}`)}
                  >
                    {notificationsData?.map((notification) => (
                      <Dropdown.Item
                        className=""
                        key={notification._id}
                        id={notification._id}
                      >
                        <div className="w-full">
                          <NotificationCard notification={notification} />
                        </div>
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>

              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={userData?.photo}
                    />
                  </div>
                </div>
                <ul
                  tabIndex="-1"
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <Link to="change" className="">
                      change password
                    </Link>
                  </li>
                  <li>
                    <Link to={`/profile/${userData?.id}`}>Profile</Link>
                  </li>
                  <li>
                    <span onClick={() => signOut()} className="cursor-pointer ">
                      Sign out
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            // <div className="links flex gap-2">
            //   <Link
            //     to="register"
            //     className="btn btn-ghost text-xl bg-gray-400/50"
            //   >
            //     Register
            //   </Link>
            //   <Link
            //     to="login"
            //     className="btn btn-ghost text-xl bg-gray-400/50"
            //   >
            //     Login
            //   </Link>
            // </div>
            ""
          )}
        </div>
      </div>
    </div>
  );
}
