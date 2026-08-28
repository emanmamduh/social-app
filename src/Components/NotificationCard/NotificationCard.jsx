import React from "react";

export default function NotificationCard({ notification }) {
  return (
    <div>
      <div className=" border border-gray-200 rounded-lg shadow-lg w-full my-3">
        <div className="flex items-center p-4">
          <img
            className="object-cover w-12 h-12 rounded-lg"
            src={notification?.actor.photo}
            alt=""
          />

          <div className="ml-3 overflow-hidden">
            <p className="font-medium text-gray-900 flex items-center gap-1.5">
              {notification?.actor.name}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4 text-[#F6A940]"
              >
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>
            </p>
            <p className="max-w-xs text-sm text-gray-500 truncate">
              {/* Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet,
              laborum? */}
              {notification?.type} your post
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
