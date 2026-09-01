import React from "react";
import FriendCard from "./FriendCard";

export default function FriendsPreView() {
  return (
    <div>
      <div className="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg mt-5 ms-5">
        <div className="px-4 py-5 sm:px-6">
          <header className="">
            <div className="flex justify-between items-center">
              <h2>Friends</h2>
              <p className=" text-[#F6A940] hover:text-[#FF8904] text-sm">
                {" "}
                See all friends
              </p>
            </div>
          <p className="my-1 text-gray-500 hover:text-gray-900 transition-all duration-300 text-sm ">
            50 friends
          </p>
          </header>
        <FriendCard />
        </div>
      </div>
    </div>
  );
}
