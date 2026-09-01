import React from "react";
import avatar1 from "../../../assets/images/avatar1.jpg";
import avatar2 from "../../../assets/images/avatar2.jpg";
import hh from "../../../assets/images/hh.jpg";
import bassem from "../../../assets/images/bassem.jpg";
import saad from "../../../assets/images/saad.jpg";
import khaled from "../../../assets/images/khaled.jpg";
export default function FriendCard() {
  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="img flex flex-col items-center gap-1.5  ">
        <div className="overflow-hidden  rounded-2xl ">
          <img
            h-100
            src={avatar1}
            alt="profile-pic"
            className="object-cover object-center h-31"
          />
        </div>
        <span className="font-semibold text-sm">Oliver Vance </span>
      </div>

      <div className="img flex flex-col items-center gap-1.5 self-start ">
        <div className="overflow-hidden rounded-2xl">
          <img
            src={avatar2}
            alt="profile-pic"
            className="object-cover object-center h-31"
          />
        </div>
        <span className="font-semibold text-sm">Oliver Vance </span>
      </div>
      <div className="img flex flex-col items-center gap-1.5 self-start ">
        <div className="overflow-hidden rounded-2xl">
          <img
            src={hh}
            alt="profile-pic"
            className="object-cover object-center h-31"
          />
        </div>
        <span className="font-semibold text-sm">Oliver Vance </span>
      </div>
      <div className="img flex flex-col items-center gap-1.5 self-start ">
        <div className="overflow-hidden rounded-2xl">
          <img
            src={bassem}
            alt="profile-pic"
            className="object-cover object-center h-31"
          />
        </div>
        <span className="font-semibold text-sm">Oliver Vance </span>
      </div>
      <div className="img flex flex-col items-center gap-1.5 self-start ">
        <div className="overflow-hidden rounded-2xl">
          <img
            src={saad}
            alt="profile-pic"
            className="object-cover object-center h-31"
          />
        </div>
        <span className="font-semibold text-sm">Oliver Vance </span>
      </div>
      <div className="img flex flex-col items-center gap-1.5 self-start ">
        <div className="overflow-hidden rounded-2xl">
          <img
            src={khaled}
            alt="profile-pic"
            className="object-cover object-center h-31"
          />
        </div>
        <span className="font-semibold text-sm">Oliver Vance </span>
      </div>
    </div>
  );
}
