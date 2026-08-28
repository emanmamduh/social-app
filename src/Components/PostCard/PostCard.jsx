import React, { useContext, useState } from "react";
import SingleComment from "../SingleComment/SingleComment";
import { Link } from "react-router-dom";
import CreateComment from "../CreateComment/CreateComment";
import { AuthContext } from "../../Context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import ActionMenu from "../ActionMenu/ActionMenu";
import DeleteConfirmationModal from "../ActionMenu/deleteConfirmationModal";

export default function PostCard({ post }) {
  const {
    id,
    body,
    bookmarked,
    commentsCount,
    createdAt,
    image,
    isShare,
    likes,
    likesCount,
    privacy,
    sharedPost,
    sharesCount,
    topComment,
    user,
  } = post;

  const [isLiked, setIsLiked] = useState(null);
  const { data: userData } = useContext(AuthContext);
  const query = useQueryClient();

  function LikePost() {
    return axios.put(
      `https://route-posts.routemisr.com/posts/${post.id}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }

    // function handleLike() {
    //   setTimeout(() => {
    //     setIsLiked(true);
    //     if (isError) {
    //       setIsLiked(null);
    //     }
    //   }, 800);
    // }
  const {
    data: likeData,
    isError,
    error,
    mutate: likeFn,
  } = useMutation({
    mutationFn: LikePost,
    onSuccess: () => {
      setIsLiked(true);
      query.invalidateQueries({ queryKey: ["getPost"] });
      query.invalidateQueries({ queryKey: ["getAllPosts"] });
      query.invalidateQueries({ queryKey: ["getUserNestedPosts"] });

      toast.success("liked");
    },
  });


  return (
    <div>

      <div className="bg-[#ededed] text-black  p-4 rounded shadow my-5 mb-3">

        <header className="flex items-center justify-between space-x-3 mb-3">
          <Link to={`/profile/${post.user._id}`}>
            <div className="xx flex items-center">
              <img
                src={user.photo}
                alt="User"
                className="h-10 w-10 rounded-full"
              />
              <div className="ms-1">
                <p className="font-semibold">{user.name}</p>
                <p className="text-xs text-gray-500">{createdAt}</p>
              </div>
            </div>
          </Link>
          {user._id === userData?.id && <ActionMenu postId={post.id} />}
        </header>

        <Link to={`/home/postDetails/${post.id}`}>
          {body && <p className="mb-3"> {body}</p>}
        </Link>

        {image && (
          <img
            src={image}
            alt="Beach"
            className="rounded max-h-96 w-full object-cover mb-3"
          />
        )}
        <div className="flex gap-5 text-gray-600 text-sm font-semibold">
          <button
            onClick={likeFn}
            // className={`flex items-center space-x-1 hover:text-blue-600 ${likeData?.data.data.liked && likeUserId == userData.id ? "text-blue-600" : ""}`}
            className={`flex items-center space-x-1 hover:text-blue-600 ${isLiked ? "text-blue-600" : ""}`}
          >
            <i className="fa-solid fa-thumbs-up text-lg"></i>
            <span>{likesCount} </span>
          </button>
          <button className="flex items-center space-x-1 hover:text-blue-600">
            <i className="fa-solid fa-comment text-lg"></i>
            <span>{commentsCount} </span>
          </button>
          <button className="flex items-center space-x-1 hover:text-blue-600">
            <i className="fa-solid fa-share text-lg"></i>
            <span>{sharesCount} </span>
          </button>
        </div>

        <CreateComment postId={post.id} userId={post.user._id} />
        {topComment && (
          <SingleComment
            comment={topComment}
            userId={post?.user._id}
            postId={id}
          />
        )}
      </div>
    </div>
  );
}
