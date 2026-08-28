import { Button, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";
import facebook from "../../../assets/images/facebook.png";
import google from "../../../assets/images/google.png";
import SocialNetworks from "../Login/components/SocialNetworks";

export default function Register() {
  const navigate = useNavigate();

  const [errorMsg, seterrorMsg] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const schema = z
    .object({
      // name: z.string().regex(/^.{2,30}$/),
      name: z.string().min(2, "at least 2 char").max(30, "maximum 30 char"),
      username: z
        .string()
        .regex(
          /^[a-z0-9_]{3,30}$/,
          "username should be like this formt => abcd1234",
        ),
      email: z.string().email(),
      dateOfBirth: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/)
        .refine((date) => {
          //date => inputValue
          const userDate = new Date(date); //to string
          const todayDate = new Date();
          todayDate.setHours(0, 0, 0, 0);
          return userDate < todayDate;
        }, "Invalid date"),
      gender: z.enum(["male", "female"], "gender require"),
      password: z
        .string()
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          "invalid password",
        ),
      rePassword: z.string(),
    })
    .refine(
      (object) => {
        return object.password == object.rePassword;
      },
      { error: "pass and repass not matched", path: ["rePassword"] },
    );
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      dateOfBirth: "",
      gender: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(schema),
    mode: "onTouched",
  });
  function submitForm(values) {
    setisLoading(true);
    seterrorMsg("");

    axios
      .post(`https://route-posts.routemisr.com/users/signup`, values)
      .then((res) => {

        seterrorMsg(res.data.message);
        setisLoading(false);

        navigate("/login");
      })
      .catch((err) => {
        console.log(err?.response?.data.message);
        seterrorMsg(err?.response?.data.message);
        setisLoading(false);
      });
  }

  return (
    <div className="min-h-screen bg-[#ededed]">
      <div className="min-h-screen grid  sm:grid-cols-1 lg:grid-cols-12 ">
        <div className="bg-[#0E0E10] text-white text- col-span-6  flex flex-col items-center justify-center rounded-br-3xl rounded-tr-3xl">
          <div className="space-y-4 flex flex-col bg-gray-00">
            <h1 className="text-5xl space-y-2">
              Create Your <span className="block mt-2.5">Account</span>{" "}
            </h1>
            <p className="text-2xl">
              {" "}
              Connect, share, and{" "}
              <span className="text-[#F6A940 text-orange-400 font-semibold text-[26px]">
                see what’s happening
              </span>{" "}
              right now.
            </p>
          </div>
        </div>

        {/* ededed */}
        <div className="bg-[#ededed] col-span-6 flex flex-col  justify-center p-7 py-8 ">
          <div className=" ">
            <h2 className="text-[#0E0E10] text-center font-bold text-3xl">
              Sign Up
            </h2>
            {errorMsg == "user already exists." ? (
              <p className="bg-red-500/70 text-white rounded-xl mt-1.5 p-2 w-[80%] mx-auto">
                {errorMsg}
              </p>
            ) : (
              ""
            )}

            <div className="container w-[85%] mx-auto px-5">
              <form onSubmit={handleSubmit(submitForm)}>
                <div className="name my-5">
                  <Input
                    {...register("name")}
                    name="name"
                    type="text"
                    aria-label="name"
                    className="w-full h-12 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    // className="w-full my-3 rounded-xl p-6"
                    placeholder="Enter your name"
                  />
                  {formState.errors.name ? (
                    <p className="text-red-700 text-start">
                      {formState.errors.name.message}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="username my-5">
                  <Input
                    {...register("username")}
                    name="username"
                    type="text"
                    aria-label="username"
                    className="w-full h-12 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    // className="w-full my-3 rounded-xl p-6"
                    placeholder="Enter your username"
                  />
                  {formState.errors.username ? (
                    <p className="text-red-700 text-start">
                      {formState.errors.username.message}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="email my-5">
                  {/* <Input
                    {...register("email")}
                    name="email"
                    type="email"
                    aria-label="Email"
                    className="w-full my-3 rounded-xl p-6"
                    placeholder="ex@gmail.com"
                  /> */}
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
                <div className="password my-5">
                  <Input
                    {...register("password")}
                    name="password"
                    type="text"
                    aria-label="password"
                    className="w-full h-12 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    placeholder="Enter your password"
                  />
                  {formState.errors.password ? (
                    <p className="text-red-700 text-start">
                      {formState.errors.password.message}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="re-password my-5">
                  <Input
                    {...register("rePassword")}
                    name="rePassword"
                    type="text"
                    aria-label="rePassword"
                    className="w-full h-12 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    placeholder="re-write your password"
                  />
                  {formState.errors.rePassword ? (
                    <p className="text-red-700 text-start">
                      {formState.errors.rePassword.message}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="dateOfBirth my-5">
                  <Input
                    {...register("dateOfBirth")}
                    name="dateOfBirth"
                    type="date"
                    aria-label="dateOfBirth rounded-lg p-6"
                    className="w-full h-12 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    // className="w-full my-4 text-[#71717a] rounded-lg p-6"
                    placeholder=""
                  />
                  {formState.errors.dateOfBirth ? (
                    <p className="text-red-700 text-start">
                      {formState.errors.dateOfBirth.message}
                    </p>
                  ) : (
                    ""
                  )}
                </div>

                <div className="gender flex gap-3">
                  <div className="gender-male text-start ">
                    <input
                      {...register("gender")}
                      id="male"
                      name="gender"
                      value="male"
                      type="radio"
                      aria-label="male"
                      className=" text-[#71717a]  focus:border focus:border-blue-400 rounded-lg p-6"
                    />
                    {formState.errors.gender ? (
                      <p className="text-red-700 text-start">
                        {formState.errors.gender.message}
                      </p>
                    ) : (
                      ""
                    )}
                    <label className="ms-1" htmlFor="male">
                      Male
                    </label>
                  </div>
                  <div className="gender-female text-start">
                    <input
                      {...register("gender")}
                      id="female"
                      name="gender"
                      value="female"
                      type="radio"
                      aria-label="female"
                      className=" text-[#71717a] "
                    />
                    {formState.errors.gender ? (
                      <p className="text-red-700 text-start">
                        {formState.errors.gender.message}
                      </p>
                    ) : (
                      ""
                    )}
                    <label className="ms-1" htmlFor="female">
                      female
                    </label>
                  </div>
                </div>
                <div class="form-group mt-4 flex items-center">
                  <input type="checkbox" id="terms" name="terms" required />
                  <label for="terms" className="ms-2">
                    I agree to the <a href="#">Terms and Conditions</a>
                  </label>
                  <span class="error-message" id="termsError"></span>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 mt-3 bg-[#F6A940] hover:bg-blue over:bg-[#FF8904] hover:bg-[#FF8904] text-white font-medium rounded-md transition duration-200"

                >
                  {isLoading ? (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  ) : (
                    "Register"
                  )}
                </Button>
                <div>
                  <div className="flex items-center my-6">
                    <div className="grow h-px bg-gray-300" />
                    <span className="px-4 text-sm text-gray-500">Or</span>
                    <div className="grow h-px bg-gray-300" />
                  </div>
                  {/* Social Buttons */}
                  {/* <SocialNetworks/> */}
                  <button className="w-full  flex items-center justify-center gap-2 border py-3 rounded-md border-gray-300  mb-3 hover:bg-gray-50">
                    <img src={facebook} alt="Facebook" className="h-5" />
                    Continue with Facebook
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 border py-3 rounded-md border-gray-300  hover:bg-gray-50">
                    <img src={google} alt="Google" className="h-5" />
                    Continue with Google
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
