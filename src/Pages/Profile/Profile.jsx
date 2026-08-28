import React, { use, useContext, useRef, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import PostCard from "../../Components/PostCard/PostCard";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CreatePost from "../../Components/CreatePost/CreatePost";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@heroui/react";
import UploadPhotoModal from "../../Components/ActionMenu/UploadPhotoModal";

export default function Profile() {
  // profile img state
  const [profileImg, setProfileImg] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const { data: userData } = useContext(AuthContext);
  const { id } = useParams();
  const profileyId = id === userData?.id; //condition () => if cin>>(id) = my Id
  const query = useQueryClient();
  let profileData = {};

  function getAnyUserProfile() {
    return axios.get(`https://route-posts.routemisr.com/users/${id}/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
  }
  const { data: anyUserData, refetch: refetchIntervaUserProfile } = useQuery({
    queryKey: ["getAnyUserProfile"],
    queryFn: getAnyUserProfile,
    select: (res) => res?.data.data.user,
  });

  if (profileyId) {
    profileData = userData;
  } else {
    profileData = anyUserData;
  }

  function getUserNestedPosts() {
    return axios.get(
      `https://route-posts.routemisr.com/users/${id || userData.id}/posts`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }

  const { data: userPosts } = useQuery({
    queryKey: ["getUserNestedPosts"],
    queryFn: getUserNestedPosts,
    select: (res) => res?.data?.data.posts,
  });

  return (
    <>
      <div className=" relative w-full mt-16 bg-white shadow-xl rounded-b-lg overflow-hidden animate-fade-in ">
        {/* Cover Image Section */}
        <div
          className="h-82 bg-cover bg-center cover-gradient-fallback"
          style={{
            backgroundImage: `url(${profileData?.photo})`,
          }}
        ></div>
        <div className="relative px-6 -mt-20">
          <img
            className="size-38 rounded-full border-4 border-white  shadow-md object-cover "
            src={profileData?.photo}
            alt="Profile Picture"
          />
          {/* btn hyzhr bs l my profile  */}
          {profileyId && (
            <Button
              onClick={() => {
                setIsClicked(true);
              }}
              variant="secondary"
            >
              Edit Photo
            </Button>
          )}
          <UploadPhotoModal
            isClicked={isClicked}
            setIsClicked={setIsClicked}
            profileImg={profileImg}
            setProfileImg={setProfileImg}
            refetchIntervaUserProfile={refetchIntervaUserProfile}
            profileyId={profileyId}
          />

          <div className="text mt-2 w-[82%] mx-auto bg-red-0 ">
            <h2 className="text-2xl font-semibold text-gray-800 capitalize">
              {profileData?.name}
            </h2>
            <p className="text-gray-600">{profileData?.username}</p>
            <p className="text-sm text-gray-500 mt-2">
              Passionate about creating intuitive and beautiful web experiences.
            </p>
          </div>
          <div className="flex justify-center mt-6 space-x-4 border-t pt-6 border-gray-100">
            <div className="text-center">
              <p className="font-bold text-lg text-gray-800">
                {profileData?.followersCount}K
              </p>
              <p className="text-gray-500 text-sm">Followers</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-lg text-gray-800">250</p>
              <p className="text-gray-500 text-sm">Following</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-lg text-gray-800">50</p>
              <p className="text-gray-500 text-sm">Projects</p>
            </div>
          </div>
          <div className="mt-8 mb-4"></div>
        </div>
      </div>
      <div className="w-[90%] xl:max-w-1/2 mx-auto">
        {profileyId && <CreatePost />}

        {userPosts?.map((post) => {
          return <PostCard key={post._id} post={post} />;
        })}
      </div>
    </>
  );
}
