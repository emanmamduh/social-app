import { Button, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import z from "zod";
import { UserData } from "../../../Context/UserData";
import Swal from "sweetalert2";
import SocialNetworks from "../Login/components/SocialNetworks";

export default function ChangePassword() {
  const { setToken } = useContext(UserData);
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  //e111@gmail.com
  // Aaaa@123456

  function showSuccessMsg() {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "password changed successfully",
      showConfirmButton: false,
      timer: 1400,
    });
    setTimeout(() => {
      navigate("/");
    }, 1500);
  }
  const schema = z
    .object({
      password: z
        .string()
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          "enter your current password",
        ),
      newPassword: z
        .string()
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          `Password must be at least 8 characters long and include an uppercase letter, lowercase letter, number, and special character.`,
        ),
    })
    .refine(
      (object) => {
        return object.newPassword !== object.password;
      },
      {
        error: "New password must be different from current password",
        path: ["newPassword"],
      },
    );

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      password: "",
      newPassword: "",
    },
    resolver: zodResolver(schema),
  });
  function goBack() {
    navigate("/");
  }

  async function submitForm(values) {
    setIsLoading(true);

    try {
      const response = await axios.patch(
        `https://route-posts.routemisr.com/users/change-password`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );

      setToken(response?.data?.data?.token);
      showSuccessMsg();
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center bg-[#ededed] min-h-screen">

      {/* Right Section */}
      <div className=" p-8 md:p-12 md:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-lg bg-white b-[#edeed] rounded-3xl shadow-lg p-11 py-13">
          <div className="flex items-center gap-3 mb-7">
            <div className="size-12 rounded-full flex justify-center items-center text-black border border-gray-300 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            </div>
            <div className="">
              <h1 className="text-[22px] font-semibold">Change Password</h1>
              <p className="text-gray-600 text-[14px] tracking-wide">
                Update password for enhanced account
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(submitForm)}>
            <div className="password my-5 space-y-2">
              <Input
                {...register("password")}
                name="password"
                type="text"
                aria-label="password"
                // className="w-full my-5"
                className="w-full h-12 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                placeholder="Password"
              />
              {formState.errors.password ? (
                <p className="text-red-700 text-start">
                  {formState.errors.password.message}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="newPassword my-5 space-y-2">
              <Input
                {...register("newPassword")}
                name="newPassword"
                type="text"
                aria-label="newPassword"
                className="w-full h-12 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                placeholder=" New Password"
              />
              {formState.errors.newPassword ? (
                <p className="text-red-700 text-start">
                  {formState.errors.newPassword.message}
                </p>
              ) : (
                ""
              )}
            </div>

            <div className="btns flex gap-3">
              <Button
                onClick={goBack}
                type="submit"
                className="w-full h-12  bg-white hover:bg-black hover:text-white text-black border border-[#d1cece] font-medium rounded-md transition duration-200"
              >
                Discard
              </Button>
              <Button
                type="submit"
                className="w-full h-12 bg-blue- bg-[#F6A940]  hover:bg-[#FF8904] text-white font-medium rounded-md transition duration-200"
              >
                {isLoading ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  "Apply Changes"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
