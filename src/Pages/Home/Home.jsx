import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import FollowSuggCard from "./components/FollowSuggCard";
import { MoonLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Context/AuthContext";
import sunset from "../../assets/images/sunset.jpg";
import threeFriends from "../../assets/images/colorFriend.png";
import PostCard from "../../Components/PostCard/PostCard";
import CreatePost from "../../Components/CreatePost/CreatePost";
import { Link } from "react-router-dom";
import SideBar from "./components/SideBar";
import { Button, Card, CloseButton } from "@heroui/react";
import Story from "./components/Story";
import st from "../../assets/images/st.jpg";

export default function Home() {
  const { data: userData } = useContext(AuthContext);

  function getAllPosts(params) {
    return axios.get(`https://route-posts.routemisr.com/posts`, {
      // params: {sort : "createdAt"},
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
  }
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["getAllPosts"],
    queryFn: getAllPosts,
    // refetchInterval:3000,
    select: (res) => res?.data.data.posts,
  });

  function getFollowSugg() {
    return axios.get(
      `https://route-posts.routemisr.com/users/suggestions?limit=10`,
      {
        // params: {sort : "createdAt"},
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }
  const { data: followSug, isSuccess } = useQuery({
    queryKey: ["getFollowSugg"],
    queryFn: getFollowSugg,
    // refetchInterval:3000,
    select: (res) => res?.data.data.suggestions,
  });

    
  useEffect(() => {
    if (isSuccess) {
    }
  }, [isSuccess, followSug]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <MoonLoader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2>{error.message}</h2>
      </div>
    );
  }
  const stories = [
    { id: 1, storyImg: sunset, profileImg: st, name: "Eman Mamdouh" },
    { id: 2, storyImg: st, profileImg: sunset, name: "Eman Mamdouh" },
  ];
  return (
    <>

      <div className="relative mt-20 grid sm:grid-cols-1 lg:grid-cols-[1fr_1.7fr] xl:grid-cols-[1.2fr_2fr_1.3fr] gap-8 mx-2">
        <div className="hidden lg:block sugg my-3 ">
          {/* COMPONENT */}
          <div className="sideBar">
            <SideBar />
          </div>
        </div>
        <div className="posts">
          <CreatePost />
          {data?.map((post) => {
            return <PostCard key={post.id} post={post} />;
          })}
        </div>
        <div className="parent hidden xl:block my3  sticky self-start top-20 left-0 z-30 max-h-[calc(100vh-6rem)] overflow-y-hidden hover:overflow-y-auto transition-all duration-300 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ">
          <div className="first-child ">
            <h2 className="font-bold text-[22px] px-2 ms-2 mt-3">Stories</h2>
            {/* <div className="flex justify-between"> */}
            <div className="grid grid-cols-2 gap-2 w-full">
              {stories.map((story) => {
                return <Story key={story.id} story={story} />;
              })}
            </div>
          </div>
          <div className="second-child">
            <h2 className="font-bold text-[22px] my-3 ms-1">
              Suggested for You
            </h2>
            <div className=" bg-[#ededed] p-2 rounded-xl overflow-y-auto h-100 mb-7 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {followSug?.map((sugg) => {
                return <FollowSuggCard key={sugg._id} followSugg={sugg} />;
              })}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

