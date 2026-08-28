import { Button, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import z from "zod";
import { UserData } from "../../../Context/UserData";
import facebook from "../../../assets/images/facebook.png";
import google from "../../../assets/images/google.png";
import SocialNetworks from "./components/SocialNetworks";
export default function Login() {
  // const { userToken, setToken } = useContext(UserData); //before setToken() func
  const { setToken } = useContext(UserData);
  // useEffect(() => {
  //   localStorage.removeItem("userToken");
  //   setToken(null);
  // }, []);

  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  // const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const schema = z.object({
    email: z.string().email(),
    password: z
      .string()
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
  });

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  async function submitForm(values) {
    setIsLoading(true);
    setErrorMsg("");

    try {
      const response = await axios.post(
        `https://route-posts.routemisr.com/users/signin`,
        values,
      );


      setToken(response.data.data.token);

      navigate("/");
    } catch (error) {
      console.log("invalid email or password");

      setErrorMsg(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#ededed]">
      {/* Left Section */}
      <div className="bg-[#0E0E10] text-white p-8 md:p-12 md:w-1/2 relative overflow-hidden rounded-br-3xl rounded-tr-3xl">
        <div className="z-10 relative">
          <h2 className="text-2xl font-bold mb-6">Your Logo</h2>
          <div className="mt-20 md:mt-32">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Sign in to</h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">
              Lorem Ipsum is simply
            </h2>
            <p className="max-w-md opacity-90">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
          </div>
        </div>
        {/* Decorative Elements */}
        <div className="absolute right-0 top-1/3 transform translate-x-1/4">
          <div className="relative w-64 h-64">
            <svg
              className="text-white/20 absolute top-10 left-10 w-16 h-16"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
            </svg>
            <svg
              className="text-white/20 absolute bottom-10 right-10 w-20 h-20"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative w-40 h-40">
                <svg
                  className="text-orange-400 w-40 h-40 transform rotate-45"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                  <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                  <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <svg
          // text-white/20
          className="text-white/20 absolute bottom-10 left-10 w-24 h-24"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        </svg>
      </div>

      {/* Right Section */}
      <div className="bg-[#ededed] p-8 md:p-12 md:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md bg-white b-[#edeed] rounded-3xl shadow-lg p-8">
          <div className="text-right mb-4 ]">
            <span className="text-gray-500 me-1">No Account?</span>
            <Link
              to="/register"
              className="text-blue text-[#F6A940] hover:text-[#FF8904] font-medium"
            >
              {/* #FF8904  #F6A940 me */}
              Register
            </Link>
          </div>
          <div className="mb-8">
            <p className="text-gray-600 mb-1">
              Welcome to{" "}
              <span className="text-blue text-[#FF8904] font-bold">LOREM</span>
            </p>
            <h1 className="text-4xl font-bold">Sign in</h1>
          </div>
          {/* Social Login Buttons */}
          {/* <div className="flex flex-col space-y-4 mb-8">
            <button className="flex items-center justify-center gap-2 h-12 border border-gray-200 rounded-md hover:bg-gray-50">
              <img src={google} alt="google" className="h-5" />
              Sign in with Google
            </button>
            <button className="flex items-center justify-center gap-2 h-12 border border-gray-200 rounded-md hover:bg-gray-50">
              <img src={facebook} alt="google" className="h-5" />
              Sign in with Facebook
            </button>
          </div> */}
          <SocialNetworks />
          <div className="flex items-center my-6">
            <div className="grow h-px bg-gray-300" />
            <span className="px-4 text-sm text-gray-500">Or</span>
            <div className="grow h-px bg-gray-300" />
          </div>

          <form onSubmit={handleSubmit(submitForm)}>
            <div className="email my-5 space-y-2">
              <Input
                {...register("email")}
                name="email"
                type="email"
                aria-label="Email"
                // className="w-full my-5 p-5"
                className="w-full h-12 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                placeholder="Email Address"
              />
              {formState.errors.email ? (
                <p className="text-red-700 text-start">
                  {formState.errors.email.message}
                </p>
              ) : (
                ""
              )}
            </div>
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
              <div className="text-right">
                <Link
                  to="/"
                  className=" text-[#F6A940] hover:text-[#FF8904] text-sm"
                >
                  Forgot Password
                </Link>
              </div>
              {formState.errors.password ? (
                <p className="text-red-700 text-start">
                  {formState.errors.password.message}
                </p>
              ) : (
                ""
              )}
            </div>

            {/* className="w-full mt-3" */}
            <Button
              type="submit"
              className="w-full h-12 bg-blue- bg-[#F6A940] hover:bg-blue over:bg-[#FF8904] hover:bg-[#FF8904] text-white font-medium rounded-md transition duration-200"
            >
              {isLoading ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
