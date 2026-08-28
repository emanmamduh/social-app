import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
// import SingleComment from "../../Components/SingleComment/SingleComment";
import CreateComment from "../../Components/CreateComment/CreateComment";
import { AuthContext } from "../../Context/AuthContext";
import ActionMenu from "../../Components/ActionMenu/ActionMenu";
import SingleComment from "../../Components/SingleComment/SingleComment";

export default function PostDetails() {
  const { id } = useParams();
  const { data: userData } = useContext(AuthContext);

  function getAllComments() {
    return axios.get(
      `https://route-posts.routemisr.com/posts/${id}/comments?page=1&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }

  const { data: comments } = useQuery({
    queryKey: ["getAllComments"],
    queryFn: getAllComments,
    //   refetchInterval: 3000,
    select: (res) => res?.data?.data?.comments,
  });

  // Get Post Details
  function getPostDetails() {
    return axios.get(`https://route-posts.routemisr.com/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
  }
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["getPost"],
    queryFn: getPostDetails,
    //   refetchInterval: 3000,
    select: (res) => res?.data?.data?.post,
  });

  const query = useQueryClient();

  function LikePost() {
    return axios.put(
      `https://route-posts.routemisr.com/posts/${id}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }

  const { data: likeDataDetails, mutate: likeFn } = useMutation({
    mutationFn: LikePost,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["getPost"] });
      query.invalidateQueries({ queryKey: ["getAllPosts"] });
      query.invalidateQueries({ queryKey: ["getUserNestedPosts"] });
      toast.success("liked");
    },
  });


  return (
    <div className="mb-20">
      <h1 className="text-xl text-center p-6">Post Details</h1>

      <div className="bg-gray-200 text-black max-w-1/2 mx-auto p-4 rounded shadow">
        {/* <Link to={`postDetails/${post.id}`}> */}
        <header className="flex items-center justify-between space-x-3 mb-3">
          <div className="xx flex items-center">
            <img
              src={data?.user.photo}
              alt="User"
              className="h-10 w-10 rounded-full"
            />
            <div>
              <p className="font-semibold">{data?.user.name}</p>
              <p className="text-xs text-gray-500">{data?.createdAt}</p>
            </div>
          </div>
          {data?.user._id === userData?.id && <ActionMenu postId={id} />}
        </header>
        {/* </Link> */}

        {data?.body && <p className="mb-3"> {data?.body}</p>}
        {data?.image && (
          <img
            src={data?.image}
            alt="Beach"
            className="rounded max-h-96 w-full object-cover mb-3"
          />
        )}
        <div className="flex justify-between text-gray-600 text-sm font-semibold">
          {/* <button className="flex items-center space-x-1 hover:text-blue-600"> */}
          <button
            onClick={likeFn}
            className={`flex items-center space-x-1 hover:text-blue-600 ${likeDataDetails?.data.data.liked ? "text-blue-600" : ""}`}
          >
            <i className="fas fa-thumbs-up"></i>
            <span>{data?.likesCount} Like</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-blue-600">
            <i className="fas fa-comment"></i>
            <span>{data?.commentsCount} Comment</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-blue-600">
            <i className="fas fa-share"></i>
            <span>{data?.sharesCount} Share</span>
          </button>
        </div>

        <CreateComment postId={id} />

        {comments?.map((comment) => {
          return (
            <SingleComment id={comment._id} comment={comment} postId={id} />
          );
        })}

      </div>
    </div>
  );
}
